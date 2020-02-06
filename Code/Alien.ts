namespace AdLunam {
    import fudge = FudgeCore;
  
    export enum ACTION_ALIEN {
      IDLE = "Idle",
      WALK = "Walk",
      DEAD = "Dead"
    }
    export enum DIRECTION_ALIEN {
      LEFT, RIGHT
    }
  
    export class Alien extends fudge.Node {
      private static sprites: Sprite[];
      private static speedMax: fudge.Vector2 = new fudge.Vector2(0.1, 5); // units per second
      private static gravity: fudge.Vector2 = fudge.Vector2.Y(-3);
      public speed: fudge.Vector3 = fudge.Vector3.ZERO();
  
      constructor(_name: string = "Alien") {
        super(_name);
        this.addComponent(new fudge.ComponentTransform());
  
        for (let sprite of Alien.sprites) {
          let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
          nodeSprite.activate(false);
  
          nodeSprite.addEventListener(
            "showNext",
            (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
            true
          );
  
          this.appendChild(nodeSprite);
        }
        
        this.act(ACTION_ALIEN.WALK, DIRECTION_ALIEN.LEFT);
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
      }
  
      public static generateSprites(_txtImage: fudge.TextureImage): void {
        Alien.sprites = [];
        let sprite: Sprite = new Sprite(ACTION_ALIEN.WALK);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 72, 8, 10), 2, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
        Alien.sprites.push(sprite);
  
        sprite = new Sprite(ACTION_ALIEN.IDLE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(16, 72, 8, 10), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
        Alien.sprites.push(sprite);

        sprite = new Sprite(ACTION_ALIEN.DEAD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(40, 72, 8, 10), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
        Alien.sprites.push(sprite);
      }
  
      public show(_action: ACTION_ALIEN): void {
        for (let child of this.getChildren())
          child.activate(child.name == _action);
      }
  
      public act(_action: ACTION_ALIEN, _direction?: DIRECTION_ALIEN): void {
        let direction: number = (_direction == DIRECTION_ALIEN.RIGHT ? 1 : -1);
        switch (_action) {
          case ACTION_ALIEN.IDLE:
            this.speed.x = 0;
            break;
          case ACTION_ALIEN.WALK:
            this.speed.x = Alien.speedMax.x * direction;
            break;
          case ACTION_ALIEN.DEAD:
              break;
        }
        this.show(_action);
      }
  
      private update = (_event: fudge.Eventƒ): void => {

        this.broadcastEvent(new CustomEvent("showNext"));

        let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
        this.speed.y += Alien.gravity.y * timeFrame;
        let distance: fudge.Vector3 = fudge.Vector3.SCALE(this.speed, timeFrame);
        
        this.cmpTransform.local.translate(distance);

        this.checkCollision();

        if (this.cmpTransform.local.translation.x > 0.4)
          this.act(ACTION_ALIEN.WALK, DIRECTION_ALIEN.LEFT);
        else if (this.cmpTransform.local.translation.x < -0.4)
          this.act(ACTION_ALIEN.WALK, DIRECTION_ALIEN.RIGHT);
      }
    
      private checkCollision(): void {
        for (let platform of level.getChildren()) {
          let rect: fudge.Rectangle = (<Platform>platform).getRectWorld();
          let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
          if (hit) {
            let translation: fudge.Vector3 = this.cmpTransform.local.translation;
            translation.y = rect.y;
            this.cmpTransform.local.translation = translation;
            this.speed.y = 0;
          } 
        }
      }
    }
  }