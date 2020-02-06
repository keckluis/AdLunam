"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Level extends fudge.Node {
        constructor() {
            super("Level");
            let platform;
            platform = new AdLunam.Platform(0, 0, null, true);
            this.appendChild(platform);
            platform = new AdLunam.Platform(40, 10, AdLunam.ITEM.GUN, true);
            this.appendChild(platform);
            platform = new AdLunam.Platform(100, 0, AdLunam.ITEM.JETPACK);
            this.appendChild(platform);
            platform = new AdLunam.Platform(150, -20, AdLunam.ITEM.SHIELD);
            this.appendChild(platform);
            platform = new AdLunam.Platform(190, -10);
            this.appendChild(platform);
            platform = new AdLunam.Platform(220, 0);
            this.appendChild(platform);
        }
    }
    AdLunam.Level = Level;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Level.js.map