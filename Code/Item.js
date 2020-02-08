"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    let ITEM;
    (function (ITEM) {
        ITEM["NONE"] = "NONE";
        ITEM["GUN"] = "GUN";
        ITEM["SHIELD"] = "SHIELD";
        ITEM["JETPACK"] = "JETPACK";
    })(ITEM = AdLunam.ITEM || (AdLunam.ITEM = {}));
    class Item extends fudge.Node {
        constructor(type) {
            super("Item");
            this.update = (_event) => {
                this.cmpTransform.local.rotateY(5);
            };
            this.type = type;
            this.addComponent(new fudge.ComponentTransform());
            for (let sprite of Item.sprites) {
                let nodeSprite = new AdLunam.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Item.sprites = [];
            let sprite = new AdLunam.Sprite(ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 86, 6, 9), 1, fudge.Vector2.ZERO(), 40, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);
            sprite = new AdLunam.Sprite(ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(8, 86, 6, 9), 1, fudge.Vector2.ZERO(), 40, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);
            sprite = new AdLunam.Sprite(ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(16, 86, 6, 9), 1, fudge.Vector2.ZERO(), 40, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == this.type);
        }
        createHitbox() {
            let hitbox = new AdLunam.Hitbox("ItemHitbox");
            hitbox.cmpTransform.local.translateY(0.25);
            hitbox.cmpTransform.local.scaleX(0.15);
            hitbox.cmpTransform.local.scaleY(0.25);
            this.hitbox = hitbox;
            return hitbox;
        }
    }
    AdLunam.Item = Item;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Item.js.map