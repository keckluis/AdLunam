namespace AdLunam {
    import fudge = FudgeCore;
  
    export enum DIRECTION_ALIEN {
      LEFT, RIGHT
    }
  
    export class Alien extends fudge.Node {
      private static sprites: Sprite[];
      private static speedMax: fudge.Vector2 = new fudge.Vector2(0.1, 5); // units per second
      private static gravity: fudge.Vector2 = fudge.Vector2.Y(-3);
      public speed: fudge.Vector3 = fudge.Vector3.ZERO();
      public hitbox: Hitbox;

      public constructor() {
        super("Alien");
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
        this.hitbox = this.createHitbox();
        this.appendChild(this.hitbox);
      
        this.act(DIRECTION_ALIEN.RIGHT);
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
      }
  
      public static generateSprites(_txtImage: fudge.TextureImage): void {
        Alien.sprites = [];
        let sprite: Sprite = new Sprite("AlienSprite");
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 72, 8, 10), 4, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
        Alien.sprites.push(sprite);
      }

      public createHitbox(): Hitbox {

        let hitbox: Hitbox = new Hitbox("AlienHitbox");
        hitbox.cmpTransform.local.translateY(0.35);
        hitbox.cmpTransform.local.scaleX(0.25);
        hitbox.cmpTransform.local.scaleY(0.35);
        this.hitbox = hitbox;
        return hitbox;
      }
  
      public show(): void {
        for (let child of this.getChildren())
          child.activate(child.name == "AlienSprite");
      }
  
      public act(_direction: DIRECTION_ALIEN): void {
        let direction: number = (_direction == DIRECTION_ALIEN.RIGHT ? 1 : -1);
        this.speed.x = Alien.speedMax.x * direction;
        this.show();
      }
  
      private update = (_event: fudge.Eventƒ): void => {

        this.broadcastEvent(new CustomEvent("showNext"));

        let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
        this.speed.y += Alien.gravity.y * timeFrame;
        let distance: fudge.Vector3 = fudge.Vector3.SCALE(this.speed, timeFrame);
        this.cmpTransform.local.translate(distance);

        this.checkCollision();

        if (this.cmpTransform.local.translation.x > 0.4)
          this.act(DIRECTION_ALIEN.LEFT);
        else if (this.cmpTransform.local.translation.x < -0.4)
          this.act(DIRECTION_ALIEN.RIGHT);
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