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
    class Item extends AdLunam.HitboxObject {
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
            this.hitbox = this.createHitbox("ItemHitbox", 0.25, new fudge.Vector3(0.15, 0.25, 1));
            this.appendChild(this.hitbox);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == this.type);
        }
    }
    AdLunam.Item = Item;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Item.js.map