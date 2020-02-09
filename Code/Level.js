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
                    let alien = false;
                    if (y - this.lastHeight > 40 || x + (y - this.lastHeight) > 70)
                        AdLunam.level.getChildren()[AdLunam.level.getChildren().length - 1].addItem(AdLunam.ITEM.JETPACK);
                    if (x == 50 && y - this.lastHeight == 100)
                        y = 90;
                    if (item == AdLunam.ITEM.NONE) {
                        item = null;
                        alien = alien = randomAlien();
                    }
                    this.appendChild(new AdLunam.Platform(this.lastPlatformPos + x, y, item, alien));
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
            platform = new AdLunam.Platform(0, 50, AdLunam.ITEM.JETPACK);
            this.appendChild(platform);
            platform = new AdLunam.Platform(40, 100);
            this.appendChild(platform);
            platform = new AdLunam.Platform(80, 50);
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
        let result = Math.floor(Math.random() * 12);
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
    function randomAlien() {
        let result = Math.floor(Math.random() * 4);
        if (result == 0)
            return true;
        else
            return false;
    }
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Level.js.map