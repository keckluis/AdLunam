namespace AdLunam {
    import fudge = FudgeCore;
  
    export class Alien extends Character {

      public constructor() {
        super("Alien");

        for (let sprite of Alien.sprites) {
            this.nodeSprites(sprite);
        }

        this.hitbox = this.createHitbox("AlienHitbox", 0.05, new fudge.Vector3(0.1, 0.1, 1));
        this.appendChild(this.hitbox);

        this.speedMax = new fudge.Vector2(0.1, 0);
        this.act(DIRECTION.RIGHT);
      }

      public static generateSprites(_txtImage: fudge.TextureImage): void {
        Alien.sprites = [];
        let sprite: Sprite = new Sprite("AlienSprite");
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 74, 8, 10), 4, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
        Alien.sprites.push(sprite);
      }
  
      public show(): void {
        for (let child of this.getChildren())
          child.activate(child.name == "AlienSprite");
      }
  
      public act(_direction: DIRECTION): void {
        let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
        this.speed.x = this.speedMax.x * direction;

        if (!gameOver)
          this.show();
      }

      public updateAdditions(): void {
        if (this.cmpTransform.local.translation.x > 0.4)
          this.act(DIRECTION.LEFT);
        else if (this.cmpTransform.local.translation.x < -0.4)
          this.act(DIRECTION.RIGHT);
      }
    }
  }