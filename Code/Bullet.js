"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Bullet extends AdLunam.HitboxObject {
        constructor() {
            super("Bullet");
            this.hit = false;
            this.lifetime = 0;
            this.update = (_event) => {
                if (!this.hit && this.lifetime < 100) {
                    let direction = (this.direction == AdLunam.DIRECTION.RIGHT ? 1 : -1);
                    this.cmpTransform.local.translateX(0.2 * direction);
                    if (this.hitbox.checkCollision(true))
                        this.hit = true;
                    this.checkCollision();
                    this.lifetime += 1;
                }
            };
            let nodeSprite = new AdLunam.NodeSprite("Bullet", Bullet.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            this.show();
            this.hitbox = this.createHitbox("BulletHitbox", 0.15, new fudge.Vector3(0.25, 0.35, 1));
            this.appendChild(this.hitbox);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
            this.direction = AdLunam.astronaut.direction;
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "Bullet");
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