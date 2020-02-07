"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Level extends fudge.Node {
        constructor() {
            super("Level");
            let platform;
            platform = new AdLunam.Platform(0, 0);
            this.appendChild(platform);
            platform = new AdLunam.Platform(40, 2, AdLunam.ITEM.GUN);
            this.appendChild(platform);
            platform = new AdLunam.Platform(80, 10, null, true);
            this.appendChild(platform);
            platform = new AdLunam.Platform(120, 10, AdLunam.ITEM.SHIELD);
            this.appendChild(platform);
            platform = new AdLunam.Platform(160, 0, null, true);
            this.appendChild(platform);
            platform = new AdLunam.Platform(200, 10, AdLunam.ITEM.JETPACK);
            this.appendChild(platform);
            platform = new AdLunam.Platform(240, 20, null, true);
            this.appendChild(platform);
        }
    }
    AdLunam.Level = Level;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Level.js.map