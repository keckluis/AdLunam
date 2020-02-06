namespace AdLunam {
    import fudge = FudgeCore;
  
    export enum ACTION {
      IDLE = "Idle",
      WALK = "Walk",
      JUMP = "Jump"
    }
    export enum DIRECTION {
      RIGHT, LEFT
    }
  
    export class Astronaut extends fudge.Node {
      private static sprites: Sprite[];
      private static speedMax: fudge.Vector2 = new fudge.Vector2(2, 2); // units per second
      private static gravity: fudge.Vector2 = fudge.Vector2.Y(-3);
      public speed: fudge.Vector3 = fudge.Vector3.ZERO();
      public item: ITEM = ITEM.NONE;
      public isOnFloor: boolean = false;
      public hitbox: Hitbox;
  
      constructor() {
        super("Astronaut");
        this.addComponent(new fudge.ComponentTransform());
  
        for (let sprite of Astronaut.sprites) {
          let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
          nodeSprite.activate(false);
  
          nodeSprite.addEventListener(
            "showNext",
            (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
            true
          );
          this.appendChild(nodeSprite);
        }
        this.show(ACTION.IDLE, this.item);

        this.hitbox = this.createHitbox();
        game.appendChild(this.hitbox);

        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
      }
  
      public static generateSprites(_txtImage: fudge.TextureImage): void {
        Astronaut.sprites = [];

        //WALKING DEFAULT
        let sprite: Sprite = new Sprite(ACTION.WALK + "." + ITEM.NONE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 0, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
        
        //IDLE DEFAULT
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.NONE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //JUMP DEFAULT
        sprite = new Sprite(ACTION.JUMP + "." + ITEM.NONE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //WALKING GUN
        sprite = new Sprite(ACTION.WALK + "." + ITEM.GUN);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 18, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
        
        //IDLE GUN
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.GUN);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //JUMP GUN
        sprite = new Sprite(ACTION.JUMP + "." + ITEM.GUN);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //WALKING SHIELD
        sprite = new Sprite(ACTION.WALK + "." + ITEM.SHIELD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 36, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
        
        //WALKING SHIELD
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.SHIELD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //JUMP SHIELD
        sprite = new Sprite(ACTION.JUMP + "." + ITEM.SHIELD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //WALKING JETPACK
        sprite = new Sprite(ACTION.WALK + "." + ITEM.JETPACK);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 54, 17, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
        
        //WALKING JETPACK
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.JETPACK);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 54, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //JUMP JETPACK
        sprite = new Sprite(ACTION.JUMP + "." + ITEM.JETPACK);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 54, 18, 23), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
      }
  
      public show(_action: ACTION, _item: ITEM): void {
        for (let child of this.getChildren())
          child.activate(child.name == _action + "." + _item);
      }
  
      public act(_action: ACTION, _direction?: DIRECTION): void {
        let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
        switch (_action) {
          case ACTION.IDLE:
            this.speed.x = 0;
            break;
          case ACTION.WALK:
            this.speed.x = Astronaut.speedMax.x;
            this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
            break;
          case ACTION.JUMP:
              if (this.isOnFloor) {
                this.speed.y = 3;
                if (_direction != null) {
                  this.speed.x = Astronaut.speedMax.x;
                  this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                }
              }
              break;
        }
        this.show(_action, this.item);
      }

      public createHitbox(): Hitbox {

        let hitbox: Hitbox = new Hitbox("PlayerHitbox");
        hitbox.cmpTransform.local.scaleX(0.35);
        hitbox.cmpTransform.local.scaleY(0.55);
        this.hitbox = hitbox;
        return hitbox;
      }
  
      private update = (_event: fudge.Eventƒ): void => {

        this.broadcastEvent(new CustomEvent("showNext"));

        let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
        this.speed.y += Astronaut.gravity.y * timeFrame;
        let distance: fudge.Vector3 = fudge.Vector3.SCALE(this.speed, timeFrame);
        
        this.cmpTransform.local.translate(distance);

        this.checkCollision();

        if (this.speed.y == 0)
          this.isOnFloor = true;
        else
          this.isOnFloor = false;
        
        this.hitbox.cmpTransform.local.translation = this.cmpTransform.local.translation;
        this.hitbox.cmpTransform.local.translateY(0.55);
        this.hitbox.checkCollision();
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