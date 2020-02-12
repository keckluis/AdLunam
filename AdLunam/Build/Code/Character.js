"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
    })(ACTION = AdLunam.ACTION || (AdLunam.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["RIGHT"] = 0] = "RIGHT";
        DIRECTION[DIRECTION["LEFT"] = 1] = "LEFT";
    })(DIRECTION = AdLunam.DIRECTION || (AdLunam.DIRECTION = {}));
    class Character extends AdLunam.HitboxObject {
        constructor(_name) {
            super(_name);
            this.speed = fudge.Vector3.ZERO();
            this.gravity = fudge.Vector2.Y(-7);
            this.update = (_event) => {
                if (!AdLunam.gameOver)
                    this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                this.speed.y += this.gravity.y * timeFrame;
                let distance = fudge.Vector3.SCALE(this.speed, timeFrame);
                if (!AdLunam.gameOver)
                    this.cmpTransform.local.translate(distance);
                this.checkCollision();
                this.updateAdditions();
            };
            this.addComponent(new fudge.ComponentTransform());
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        nodeSprites(_sprite) {
            let nodeSprite = new AdLunam.NodeSprite(_sprite.name, _sprite);
            nodeSprite.activate(false);
            nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
            this.appendChild(nodeSprite);
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
        updateAdditions() {
            return;
        }
    }
    AdLunam.Character = Character;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Character.js.map