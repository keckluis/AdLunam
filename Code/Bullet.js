"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Bullet extends fudge.Node {
        constructor() {
            super("Bullet");
            this.update = (_event) => {
                this.cmpTransform.local.translateX(0.5);
            };
            let nodeSprite = new AdLunam.NodeSprite("BulletSprite", Bullet.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            this.show();
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Bullet.sprites = [];
            let sprite = new AdLunam.Sprite("BulletSprite");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(53, 79, 3, 1), 1, fudge.Vector2.ZERO(), 35, fudge.ORIGIN2D.CENTER);
            Bullet.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren()) {
                child.activate(child.name == "BulletSprite");
            }
        }
    }
    AdLunam.Bullet = Bullet;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Bullet.js.map