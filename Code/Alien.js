"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Alien extends AdLunam.Character {
        constructor() {
            super("Alien");
            for (let sprite of Alien.sprites) {
                this.nodeSprites(sprite);
            }
            this.hitbox = this.createHitbox("AlienHitbox", 0.05, new fudge.Vector3(0.1, 0.1, 1));
            this.appendChild(this.hitbox);
            this.speedMax = new fudge.Vector2(0.1, 0);
            this.act(AdLunam.DIRECTION.RIGHT);
        }
        static generateSprites(_txtImage) {
            Alien.sprites = [];
            let sprite = new AdLunam.Sprite("Alien");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 74, 8, 10), 4, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
            Alien.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "Alien");
        }
        act(_direction) {
            let direction = (_direction == AdLunam.DIRECTION.RIGHT ? 1 : -1);
            this.speed.x = this.speedMax.x * direction;
            if (!AdLunam.gameOver)
                this.show();
        }
        updateAdditions() {
            if (this.cmpTransform.local.translation.x > 0.4)
                this.act(AdLunam.DIRECTION.LEFT);
            else if (this.cmpTransform.local.translation.x < -0.4)
                this.act(AdLunam.DIRECTION.RIGHT);
        }
    }
    AdLunam.Alien = Alien;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Alien.js.map