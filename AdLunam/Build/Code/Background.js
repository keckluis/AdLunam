"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    let BACKGROUND;
    (function (BACKGROUND) {
        BACKGROUND["ONE"] = "1";
        BACKGROUND["TWO"] = "2";
        BACKGROUND["THREE"] = "3";
    })(BACKGROUND = AdLunam.BACKGROUND || (AdLunam.BACKGROUND = {}));
    class Background extends fudge.Node {
        constructor() {
            super("Background");
            this.addComponent(new fudge.ComponentTransform());
            for (let sprite of Background.sprites)
                this.nodeSprites(sprite);
            this.cmpTransform.local.translateZ(-5);
            this.cmpTransform.local.translateY(1);
        }
        static generateSprites(_txtImage) {
            Background.sprites = [];
            let sprite = new AdLunam.Sprite(BACKGROUND.ONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 1920, 1080), 1, fudge.Vector2.ZERO(), 95, fudge.ORIGIN2D.CENTER);
            Background.sprites.push(sprite);
            sprite = new AdLunam.Sprite(BACKGROUND.TWO);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(1920, 0, 1920, 1080), 1, fudge.Vector2.ZERO(), 95, fudge.ORIGIN2D.CENTER);
            Background.sprites.push(sprite);
            sprite = new AdLunam.Sprite(BACKGROUND.THREE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(3840, 0, 1920, 1080), 1, fudge.Vector2.ZERO(), 95, fudge.ORIGIN2D.CENTER);
            Background.sprites.push(sprite);
        }
        show(_bg) {
            for (let bg of this.getChildren())
                bg.activate(bg.name == _bg);
        }
        nodeSprites(_sprite) {
            let nodeSprite = new AdLunam.NodeSprite(_sprite.name, _sprite);
            nodeSprite.activate(false);
            nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
            this.appendChild(nodeSprite);
        }
    }
    AdLunam.Background = Background;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Background.js.map