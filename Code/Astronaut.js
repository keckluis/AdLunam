"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Astronaut extends AdLunam.Character {
        constructor() {
            super("Astronaut");
            this.item = AdLunam.ITEM.NONE;
            this.direction = AdLunam.DIRECTION.RIGHT;
            this.isOnFloor = false;
            this.jetpackUsed = false;
            for (let sprite of Astronaut.sprites)
                this.nodeSprites(sprite);
            this.hitbox = this.createHitbox("AstronautHitbox", 0.55, new fudge.Vector3(0.35, 0.55, 1));
            this.appendChild(this.hitbox);
            this.speedMax = new fudge.Vector2(2, 4);
            this.show(AdLunam.ACTION.IDLE, this.item);
        }
        static generateSprites(_txtImage) {
            Astronaut.sprites = [];
            //WALKING DEFAULT
            let sprite = new AdLunam.Sprite(AdLunam.ACTION.WALK + "." + AdLunam.ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 0, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //IDLE DEFAULT
            sprite = new AdLunam.Sprite(AdLunam.ACTION.IDLE + "." + AdLunam.ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP DEFAULT
            sprite = new AdLunam.Sprite(AdLunam.ACTION.JUMP + "." + AdLunam.ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING GUN
            sprite = new AdLunam.Sprite(AdLunam.ACTION.WALK + "." + AdLunam.ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 18, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //IDLE GUN
            sprite = new AdLunam.Sprite(AdLunam.ACTION.IDLE + "." + AdLunam.ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP GUN
            sprite = new AdLunam.Sprite(AdLunam.ACTION.JUMP + "." + AdLunam.ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING SHIELD
            sprite = new AdLunam.Sprite(AdLunam.ACTION.WALK + "." + AdLunam.ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 36, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //IDLE SHIELD
            sprite = new AdLunam.Sprite(AdLunam.ACTION.IDLE + "." + AdLunam.ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP SHIELD
            sprite = new AdLunam.Sprite(AdLunam.ACTION.JUMP + "." + AdLunam.ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING JETPACK
            sprite = new AdLunam.Sprite(AdLunam.ACTION.WALK + "." + AdLunam.ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 54, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //IDLE JETPACK
            sprite = new AdLunam.Sprite(AdLunam.ACTION.IDLE + "." + AdLunam.ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 54, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP JETPACK
            sprite = new AdLunam.Sprite(AdLunam.ACTION.JUMP + "." + AdLunam.ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 54, 18, 20), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP JETPACK BOOST
            sprite = new AdLunam.Sprite(AdLunam.ACTION.JUMP + "." + AdLunam.ITEM.JETPACK + "BOOST");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(88, 74, 20, 22), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
        }
        show(_action, _item) {
            for (let child of this.getChildren()) {
                if (this.jetpackUsed)
                    child.activate(child.name == "Jump.JETPACKBOOST");
                else if (_action == AdLunam.ACTION.WALK && this.jetpackUsed)
                    child.activate(child.name == "Jump.JETPACKBOOST");
                else if (_action == AdLunam.ACTION.WALK && !this.isOnFloor)
                    child.activate(child.name == "Jump" + "." + _item);
                else
                    child.activate(child.name == _action + "." + _item);
            }
        }
        act(_action, _direction, _noJumpSound) {
            let direction = (_direction == AdLunam.DIRECTION.RIGHT ? 1 : -1);
            switch (_action) {
                case AdLunam.ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case AdLunam.ACTION.WALK:
                    AdLunam.astronaut.direction = _direction;
                    this.speed.x = this.speedMax.x;
                    if (!this.jetpackUsed && !AdLunam.gameOver)
                        this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                    break;
                case AdLunam.ACTION.JUMP:
                    if (this.isOnFloor) {
                        this.isOnFloor = false;
                        if (!_noJumpSound)
                            AdLunam.Sound.play("jump");
                        this.speed.y = 6;
                        if (_direction != null && !AdLunam.gameOver) {
                            this.speed.x = this.speedMax.x;
                            this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                        }
                    }
                    break;
            }
            if (!AdLunam.gameOver)
                this.show(_action, this.item);
        }
        updateAdditions() {
            if (this.speed.y == 0)
                this.isOnFloor = true;
            else
                this.isOnFloor = false;
            if (this.isOnFloor && this.jetpackUsed) {
                this.item = AdLunam.ITEM.NONE;
                this.jetpackUsed = false;
            }
            this.hitbox.checkCollision();
            if (this.cmpTransform.local.translation.y < -10) {
                this.gravity = fudge.Vector2.Y(0);
                AdLunam.gameOver = true;
            }
        }
    }
    AdLunam.Astronaut = Astronaut;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Astronaut.js.map