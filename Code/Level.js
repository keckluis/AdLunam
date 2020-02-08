"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Level extends fudge.Node {
        constructor() {
            super("Level");
            this.lastAstronautPos = 0;
            this.lastPlatformPos = 0;
            this.lastHeight = 50;
            this.update = (_event) => {
                if (this.lastAstronautPos < AdLunam.astronaut.cmpTransform.local.translation.x - 2) {
                    let x = randomX();
                    let y = randomY();
                    let item = randomItem();
                    if (y - this.lastHeight > 40 || x + y - this.lastHeight > 59)
                        AdLunam.level.getChildren()[AdLunam.level.getChildren().length - 1].addItem(AdLunam.ITEM.JETPACK);
                    if (x == 50 && y - this.lastHeight == 100)
                        y = 90;
                    this.appendChild(new AdLunam.Platform(this.lastPlatformPos + x, y, item));
                    this.lastHeight = y;
                    this.lastPlatformPos += x;
                    this.lastAstronautPos = AdLunam.astronaut.cmpTransform.local.translation.x;
                }
                //clean up for performance
                for (let platform of AdLunam.level.getChildren()) {
                    if (platform.cmpTransform.local.translation.x < AdLunam.astronaut.cmpTransform.local.translation.x - 15)
                        AdLunam.level.removeChild(platform);
                }
            };
            let platform;
            platform = new AdLunam.Platform(0, 0, AdLunam.ITEM.JETPACK);
            this.appendChild(platform);
            platform = new AdLunam.Platform(50, 90);
            this.appendChild(platform);
            platform = new AdLunam.Platform(75, 50);
            this.appendChild(platform);
            this.lastPlatformPos = 75;
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
    }
    AdLunam.Level = Level;
    function randomX() {
        return Math.floor(Math.random() * 26) + 25;
    }
    function randomY() {
        return Math.floor(Math.random() * 101);
    }
    function randomItem() {
        let result = Math.floor(Math.random() * 8);
        let item;
        if (result < 2) {
            switch (result) {
                case 0:
                    item = AdLunam.ITEM.SHIELD;
                    break;
                case 1:
                    item = AdLunam.ITEM.GUN;
                    break;
            }
        }
        else
            item = AdLunam.ITEM.NONE;
        return item;
    }
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Level.js.map