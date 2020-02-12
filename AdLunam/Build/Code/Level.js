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
            this.platformCount = 0;
            this.update = (_event) => {
                if (this.lastAstronautPos < AdLunam.astronaut.cmpTransform.local.translation.x - 3 && this.platformCount < 10) {
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
                    this.lastAstronautPos += 3;
                }
                this.platformCount = 0;
                //clean up for performance && platform count
                for (let platform of AdLunam.level.getChildren()) {
                    this.platformCount += 1;
                    if (platform.cmpTransform.local.translation.x < AdLunam.astronaut.cmpTransform.local.translation.x - 8) {
                        for (let child of platform.getChildren()) {
                            if (child.name == "Item")
                                fudge.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, child.update);
                            if (child.name == "Alien") {
                                fudge.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, child.update);
                            }
                        }
                        AdLunam.level.removeChild(platform);
                    }
                }
            };
            let platform;
            platform = new AdLunam.Platform(0, 50);
            this.appendChild(platform);
            platform = new AdLunam.Platform(40, 50);
            this.appendChild(platform);
            platform = new AdLunam.Platform(80, 50);
            this.appendChild(platform);
            this.lastPlatformPos = 80;
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
        let result = Math.floor(Math.random() * 2);
        if (result == 0)
            return true;
        else
            return false;
    }
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Level.js.map