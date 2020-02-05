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
            super(type);
            this.type = type;
            this.addComponent(new fudge.ComponentTransform());
            for (let sprite of Item.sprites) {
                let nodeSprite = new AdLunam.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
        }
        static generateSprites(_txtImage) {
            Item.sprites = [];
            let sprite = new AdLunam.Sprite(ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 83, 8, 9), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);
            sprite = new AdLunam.Sprite(ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(8, 83, 8, 9), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);
            sprite = new AdLunam.Sprite(ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(16, 83, 8, 9), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == this.type);
        }
    }
    AdLunam.Item = Item;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Item.js.map