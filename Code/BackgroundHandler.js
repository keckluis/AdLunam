"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class BackgroundHandler extends fudge.Node {
        constructor() {
            super("BackgroundHandler");
            this.leftBackground = 0;
            this.lastAstroPos = 0;
            this.update = (_event) => {
                if (this.lastAstroPos + 20 < AdLunam.astronaut.cmpTransform.local.translation.x) {
                    this.backgrounds[this.leftBackground].cmpTransform.local.translateX(60);
                    this.leftBackground += 1;
                    if (this.leftBackground == 3)
                        this.leftBackground = 0;
                    this.lastAstroPos += 20;
                }
            };
            this.backgrounds = [];
            this.backgrounds[0] = new AdLunam.Background();
            this.backgrounds[1] = new AdLunam.Background();
            this.backgrounds[2] = new AdLunam.Background();
            this.backgrounds[0].show(AdLunam.BACKGROUND.ONE);
            this.backgrounds[1].show(AdLunam.BACKGROUND.TWO);
            this.backgrounds[2].show(AdLunam.BACKGROUND.THREE);
            for (let bg of this.backgrounds)
                this.appendChild(bg);
            this.backgrounds[1].cmpTransform.local.translateX(20);
            this.backgrounds[2].cmpTransform.local.translateX(40);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
    }
    AdLunam.BackgroundHandler = BackgroundHandler;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=BackgroundHandler.js.map