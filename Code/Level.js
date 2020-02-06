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
            platform = new AdLunam.Platform(40, 0, null, true);
            this.appendChild(platform);
            platform = new AdLunam.Platform(80, 0, null, true);
            this.appendChild(platform);
            platform = new AdLunam.Platform(120, 0, null, true);
            this.appendChild(platform);
            // platform = new Platform(160, 0, null, true);   
            // this.appendChild(platform);
            // platform = new Platform(200, 0, null, true);   
            // this.appendChild(platform);
        }
    }
    AdLunam.Level = Level;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Level.js.map