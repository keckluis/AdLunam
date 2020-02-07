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
    class Astronaut extends fudge.Node {
        constructor() {
            super("Astronaut");
            this.speed = fudge.Vector3.ZERO();
            this.item = AdLunam.ITEM.NONE;
            this.direction = DIRECTION.RIGHT;
            this.isOnFloor = false;
            this.jetpackUsed = false;
            this.update = (_event) => {
                if (!AdLunam.gameOver)
                    this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                this.speed.y += Astronaut.gravity.y * timeFrame;
                let distance = fudge.Vector3.SCALE(this.speed, timeFrame);
                if (!AdLunam.gameOver)
                    this.cmpTransform.local.translate(distance);
                this.checkCollision();
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
                    Astronaut.gravity = fudge.Vector2.Y(0);
                    AdLunam.gameOver = true;
                }
            };
            this.addComponent(new fudge.ComponentTransform());
            for (let sprite of Astronaut.sprites) {
                let nodeSprite = new AdLunam.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            this.show(ACTION.IDLE, this.item);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Astronaut.sprites = [];
            //WALKING DEFAULT
            let sprite = new AdLunam.Sprite(ACTION.WALK + "." + AdLunam.ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 0, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //IDLE DEFAULT
            sprite = new AdLunam.Sprite(ACTION.IDLE + "." + AdLunam.ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP DEFAULT
            sprite = new AdLunam.Sprite(ACTION.JUMP + "." + AdLunam.ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING GUN
            sprite = new AdLunam.Sprite(ACTION.WALK + "." + AdLunam.ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 18, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //IDLE GUN
            sprite = new AdLunam.Sprite(ACTION.IDLE + "." + AdLunam.ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP GUN
            sprite = new AdLunam.Sprite(ACTION.JUMP + "." + AdLunam.ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING SHIELD
            sprite = new AdLunam.Sprite(ACTION.WALK + "." + AdLunam.ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 36, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //IDLE SHIELD
            sprite = new AdLunam.Sprite(ACTION.IDLE + "." + AdLunam.ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP SHIELD
            sprite = new AdLunam.Sprite(ACTION.JUMP + "." + AdLunam.ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING JETPACK
            sprite = new AdLunam.Sprite(ACTION.WALK + "." + AdLunam.ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 54, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //IDLE JETPACK
            sprite = new AdLunam.Sprite(ACTION.IDLE + "." + AdLunam.ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 54, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP JETPACK
            sprite = new AdLunam.Sprite(ACTION.JUMP + "." + AdLunam.ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 54, 18, 20), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP JETPACK BOOST
            sprite = new AdLunam.Sprite(ACTION.JUMP + "." + AdLunam.ITEM.JETPACK + "BOOST");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(88, 74, 20, 22), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
        }
        createHitbox() {
            let hitbox = new AdLunam.Hitbox("PlayerHitbox");
            hitbox.cmpTransform.local.translateY(0.55);
            hitbox.cmpTransform.local.scaleX(0.35);
            hitbox.cmpTransform.local.scaleY(0.55);
            this.hitbox = hitbox;
            return hitbox;
        }
        show(_action, _item) {
            for (let child of this.getChildren()) {
                if (this.jetpackUsed)
                    child.activate(child.name == _action + "." + _item + "BOOST");
                else if (_action == ACTION.WALK && this.jetpackUsed)
                    child.activate(child.name == "Jump.JETPACKBOOST");
                else if (_action == ACTION.WALK && !this.isOnFloor)
                    child.activate(child.name == "Jump" + "." + _item);
                else
                    child.activate(child.name == _action + "." + _item);
            }
        }
        act(_action, _direction) {
            let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    AdLunam.astronaut.direction = _direction;
                    this.speed.x = Astronaut.speedMax.x;
                    if (!this.jetpackUsed && !AdLunam.gameOver)
                        this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                    break;
                case ACTION.JUMP:
                    if (this.isOnFloor) {
                        this.isOnFloor = false;
                        this.speed.y = 5;
                        if (_direction != null && !AdLunam.gameOver) {
                            this.speed.x = Astronaut.speedMax.x;
                            this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                        }
                    }
                    break;
            }
            if (!AdLunam.gameOver)
                this.show(_action, this.item);
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
    Astronaut.speedMax = new fudge.Vector2(2, 2); // units per second
    Astronaut.gravity = fudge.Vector2.Y(-7);
    AdLunam.Astronaut = Astronaut;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Astronaut.js.map