namespace AdLunam {
    import fudge = FudgeCore;

    export class BackgroundHandler extends fudge.Node {

        private backgrounds: Background[];
        private leftBackground: number = 0;
        private lastAstroPos: number = 0;

        public constructor() {
            super("BackgroundHandler");

            this.backgrounds = [];
            this.backgrounds[0] = new Background();
            this.backgrounds[1] = new Background();
            this.backgrounds[2] = new Background();

            this.backgrounds[0].show(BACKGROUND.ONE);
            this.backgrounds[1].show(BACKGROUND.TWO);
            this.backgrounds[2].show(BACKGROUND.THREE);

            for (let bg of this.backgrounds)     
                this.appendChild(bg);
            
            this.backgrounds[1].cmpTransform.local.translateX(20);
            this.backgrounds[2].cmpTransform.local.translateX(40);

            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
        }

        private update = (_event: fudge.Eventƒ): void => {
            if (this.lastAstroPos + 20 < astronaut.cmpTransform.local.translation.x) {
                this.backgrounds[this.leftBackground].cmpTransform.local.translateX(60);
                this.leftBackground += 1;
                if (this.leftBackground == 3)
                    this.leftBackground = 0;
                this.lastAstroPos += 20;
            }
        }
    }
}