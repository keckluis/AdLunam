"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    let ACTION_ALIEN;
    (function (ACTION_ALIEN) {
        ACTION_ALIEN["IDLE"] = "Idle";
        ACTION_ALIEN["WALK"] = "Walk";
        ACTION_ALIEN["DEAD"] = "Dead";
    })(ACTION_ALIEN = AdLunam.ACTION_ALIEN || (AdLunam.ACTION_ALIEN = {}));
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
                console.log(this.hitbox.cmpTransform.local.translation.x);
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                this.speed.y += Alien.gravity.y * timeFrame;
                let distance = fudge.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
                if (this.cmpTransform.local.translation.x > 0.4)
                    this.act(ACTION_ALIEN.WALK, DIRECTION_ALIEN.LEFT);
                else if (this.cmpTransform.local.translation.x < -0.4)
                    this.act(ACTION_ALIEN.WALK, DIRECTION_ALIEN.RIGHT);
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
            this.act(ACTION_ALIEN.WALK, DIRECTION_ALIEN.LEFT);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Alien.sprites = [];
            let sprite = new AdLunam.Sprite(ACTION_ALIEN.WALK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 72, 8, 10), 2, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
            Alien.sprites.push(sprite);
            sprite = new AdLunam.Sprite(ACTION_ALIEN.IDLE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(16, 72, 8, 10), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
            Alien.sprites.push(sprite);
            sprite = new AdLunam.Sprite(ACTION_ALIEN.DEAD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(40, 72, 8, 10), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
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
        show(_action) {
            for (let child of this.getChildren())
                child.activate(child.name == _action);
        }
        act(_action, _direction) {
            let direction = (_direction == DIRECTION_ALIEN.RIGHT ? 1 : -1);
            switch (_action) {
                case ACTION_ALIEN.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION_ALIEN.WALK:
                    this.speed.x = Alien.speedMax.x * direction;
                    break;
                case ACTION_ALIEN.DEAD:
                    break;
            }
            this.show(_action);
            AdLunam.game.appendChild(this.hitbox);
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