"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Level extends fudge.Node {
        constructor() {
            super("Level");
            let platform;
            platform = new AdLunam.Platform(0, 50);
            this.appendChild(platform);
            platform = new AdLunam.Platform(40, 50, AdLunam.ITEM.GUN);
            this.appendChild(platform);
            platform = new AdLunam.Platform(80, 60, null, true);
            this.appendChild(platform);
            platform = new AdLunam.Platform(120, 40, AdLunam.ITEM.SHIELD);
            this.appendChild(platform);
            platform = new AdLunam.Platform(160, 70, null, true);
            this.appendChild(platform);
            platform = new AdLunam.Platform(200, 40, AdLunam.ITEM.JETPACK);
            this.appendChild(platform);
            platform = new AdLunam.Platform(240, 80, null, true);
            this.appendChild(platform);
        }
    }
    AdLunam.Level = Level;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Level.js.map