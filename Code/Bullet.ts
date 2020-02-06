namespace AdLunam {
    import fudge = FudgeCore;

    export class Bullet extends fudge.Node {

        private static sprites: Sprite[];

        public constructor() {
            super("Bullet");
            let nodeSprite: NodeSprite = new NodeSprite("BulletSprite", Bullet.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            this.show();
            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
        }

        public static generateSprites(_txtImage: fudge.TextureImage): void {
            Bullet.sprites = [];
            let sprite: Sprite = new Sprite("BulletSprite");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(53, 79, 3, 1), 1, fudge.Vector2.ZERO(), 35, fudge.ORIGIN2D.CENTER);
            Bullet.sprites.push(sprite);
        }

        public show(): void {
            for (let child of this.getChildren()) {
                child.activate(child.name == "BulletSprite");
            }
        }

        private update = (_event: fudge.Eventƒ): void => {
            this.cmpTransform.local.translateX(0.5);
        }
    }
}