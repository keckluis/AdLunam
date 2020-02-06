"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Bullet extends fudge.Node {
        constructor() {
            super("Bullet");
            this.hit = false;
            this.update = (_event) => {
                let direction = (this.direction == AdLunam.DIRECTION.RIGHT ? 1 : -1);
                this.cmpTransform.local.translateX(0.5 * direction);
                if (this.hitbox.checkCollision(true))
                    this.hit = true;
                this.checkCollision();
            };
            let nodeSprite = new AdLunam.NodeSprite("BulletSprite", Bullet.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            this.show();
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
            this.direction = AdLunam.astronaut.direction;
        }
        static generateSprites(_txtImage) {
            Bullet.sprites = [];
            let sprite = new AdLunam.Sprite("BulletSprite");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(24, 84, 3, 1), 1, fudge.Vector2.ZERO(), 35, fudge.ORIGIN2D.CENTER);
            Bullet.sprites.push(sprite);
        }
        createHitbox() {
            let hitbox = new AdLunam.Hitbox("BulletHitbox");
            hitbox.cmpTransform.local.translateY(0.1);
            hitbox.cmpTransform.local.scaleX(0.2);
            hitbox.cmpTransform.local.scaleY(0.4);
            this.hitbox = hitbox;
            return hitbox;
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "BulletSprite");
        }
        checkCollision() {
            for (let platform of AdLunam.level.getChildren()) {
                let rect = platform.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    this.hit = true;
                }
            }
        }
    }
    AdLunam.Bullet = Bullet;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Bullet.js.map