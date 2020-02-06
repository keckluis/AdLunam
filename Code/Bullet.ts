namespace AdLunam {
    import fudge = FudgeCore;

    export class Bullet extends fudge.Node {

        private static sprites: Sprite[];
        public hitbox: Hitbox;
        public direction: DIRECTION;
        public hit: boolean = false;

        public constructor() {
            super("Bullet");
            let nodeSprite: NodeSprite = new NodeSprite("BulletSprite", Bullet.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            this.show();
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
            this.direction = astronaut.direction;
        }

        public static generateSprites(_txtImage: fudge.TextureImage): void {
            Bullet.sprites = [];
            let sprite: Sprite = new Sprite("BulletSprite");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(24, 84, 3, 1), 1, fudge.Vector2.ZERO(), 35, fudge.ORIGIN2D.CENTER);
            Bullet.sprites.push(sprite);
        }

        public createHitbox(): Hitbox {
            let hitbox: Hitbox = new Hitbox("BulletHitbox");
            hitbox.cmpTransform.local.translateY(0.1);
            hitbox.cmpTransform.local.scaleX(0.2);
            hitbox.cmpTransform.local.scaleY(0.4);
            this.hitbox = hitbox;
            return hitbox;
        }

        public show(): void {
            for (let child of this.getChildren()) 
                child.activate(child.name == "BulletSprite");
        }

        private checkCollision(): void {
            for (let platform of level.getChildren()) {
                let rect: fudge.Rectangle = (<Platform>platform).getRectWorld();
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    this.hit = true;
                } 
            }
        }

        private update = (_event: fudge.Eventƒ): void => {   
            let direction: number = (this.direction == DIRECTION.RIGHT ? 1 : -1);
            this.cmpTransform.local.translateX(0.5 * direction);
            if (this.hitbox.checkCollision(true))
                this.hit = true;
            this.checkCollision();
        }
    }
}