"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    let DIRECTION_ALIEN;
    (function (DIRECTION_ALIEN) {
        DIRECTION_ALIEN[DIRECTION_ALIEN["LEFT"] = 0] = "LEFT";
        DIRECTION_ALIEN[DIRECTION_ALIEN["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION_ALIEN = AdLunam.DIRECTION_ALIEN || (AdLunam.DIRECTION_ALIEN = {}));
    class Alien extends fudge.Node {
        constructor() {
            super("Alien");
            this.speed = fudge.Vector3.ZERO();
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                this.speed.y += Alien.gravity.y * timeFrame;
                let distance = fudge.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
                if (this.cmpTransform.local.translation.x > 0.4)
                    this.act(DIRECTION_ALIEN.LEFT);
                else if (this.cmpTransform.local.translation.x < -0.4)
                    this.act(DIRECTION_ALIEN.RIGHT);
            };
            this.addComponent(new fudge.ComponentTransform());
            for (let sprite of Alien.sprites) {
                let nodeSprite = new AdLunam.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            this.act(DIRECTION_ALIEN.RIGHT);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Alien.sprites = [];
            let sprite = new AdLunam.Sprite("AlienSprite");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 72, 8, 10), 4, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
            Alien.sprites.push(sprite);
        }
        createHitbox() {
            let hitbox = new AdLunam.Hitbox("AlienHitbox");
            hitbox.cmpTransform.local.translateY(0.35);
            hitbox.cmpTransform.local.scaleX(0.25);
            hitbox.cmpTransform.local.scaleY(0.35);
            this.hitbox = hitbox;
            return hitbox;
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "AlienSprite");
        }
        act(_direction) {
            let direction = (_direction == DIRECTION_ALIEN.RIGHT ? 1 : -1);
            this.speed.x = Alien.speedMax.x * direction;
            this.show();
        }
        checkCollision() {
            for (let platform of AdLunam.level.getChildren()) {
                let rect = platform.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }
    }
    Alien.speedMax = new fudge.Vector2(0.1, 5); // units per second
    Alien.gravity = fudge.Vector2.Y(-3);
    AdLunam.Alien = Alien;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Alien.js.map