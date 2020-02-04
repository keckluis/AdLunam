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
      private static speedMax: number = 0.3; // units per second
      // private action: ACTION_ALIEN;
      // private time: fudge.Time = new fudge.Time();
      public speed: number = 0;
  
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
        
        this.act(ACTION_ALIEN.WALK, DIRECTION_ALIEN.RIGHT);
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
      }
  
      public static generateSprites(_txtImage: fudge.TextureImage): void {
        Alien.sprites = [];
        let sprite: Sprite = new Sprite(ACTION_ALIEN.WALK);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 73, 8, 10), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Alien.sprites.push(sprite);
  
        sprite = new Sprite(ACTION_ALIEN.IDLE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(16, 0, 8, 10), 3, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Alien.sprites.push(sprite);

        sprite = new Sprite(ACTION_ALIEN.DEAD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(40, 0, 8, 10), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Alien.sprites.push(sprite);
      }
  
      public show(_action: ACTION_ALIEN): void {
        for (let child of this.getChildren())
          child.activate(child.name == _action);
        // this.action = _action;
      }
  
      public act(_action: ACTION_ALIEN, _direction?: DIRECTION_ALIEN): void {
        let direction: number = (_direction == DIRECTION_ALIEN.RIGHT ? 1 : -1);
        switch (_action) {
          case ACTION_ALIEN.IDLE:
            this.speed = 0;
            break;
          case ACTION_ALIEN.WALK:
            this.speed = Alien.speedMax * direction;
            this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
            break;
          case ACTION_ALIEN.DEAD:
              
              break;
        }
        this.show(_action);
      }
  
      private update = (_event: fudge.Eventƒ): void => {

        if (this.cmpTransform.local.translation.x > 0.5)
          this.act(ACTION_ALIEN.WALK, DIRECTION_ALIEN.LEFT);
        else if (this.cmpTransform.local.translation.x < -0.5)
          this.act(ACTION_ALIEN.WALK, DIRECTION_ALIEN.RIGHT);

        let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
        this.cmpTransform.local.translateX(this.speed * timeFrame);
        this.broadcastEvent(new CustomEvent("showNext"));
      }
    }
  }