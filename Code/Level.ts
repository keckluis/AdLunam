namespace AdLunam {
    import fudge = FudgeCore;
  
    export class Level extends fudge.Node {

        private lastAstronautPos: number = 0;
        private lastPlatformPos: number = 0;
        private lastHeight: number = 50;

        public constructor() {
            super("Level");

            let platform: Platform;

            platform = new Platform(0, 50, ITEM.GUN);
            this.appendChild(platform);

            platform = new Platform(40, 50, null, true);
            this.appendChild(platform);

            platform = new Platform(80, 50);
            this.appendChild(platform);

            this.lastPlatformPos = 80;

            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
        }

        private update = (_event: fudge.Eventƒ): void => {
            
            if (this.lastAstronautPos < astronaut.cmpTransform.local.translation.x - 2) {
                
                let x: number = randomX();
                let y: number = randomY();
                let item: ITEM = randomItem();
                let alien: boolean = false;
               
                if (y - this.lastHeight > 40 || x + (y - this.lastHeight) > 70) 
                    (<Platform>level.getChildren()[level.getChildren().length - 1]).addItem(ITEM.JETPACK);
                
                if (x == 50 && y - this.lastHeight == 100)
                    y = 90;
                
                if (item == ITEM.NONE) {
                    item = null;
                    alien = alien = randomAlien();
                }
                
                this.appendChild(new Platform(this.lastPlatformPos + x, y, item, alien));

                this.lastHeight = y;
                this.lastPlatformPos += x;
                this.lastAstronautPos = astronaut.cmpTransform.local.translation.x;
            }

            //clean up for performance
            for (let platform of level.getChildren()) {
                if (platform.cmpTransform.local.translation.x < astronaut.cmpTransform.local.translation.x - 15) 
                    level.removeChild(platform);
            }
        }
    }

    function randomX(): number {
        return Math.floor(Math.random() * 26) + 25;
    }

    function randomY(): number {
        return Math.floor(Math.random() * 101) ;
    }

    function randomItem(): ITEM {
        let result: number = Math.floor(Math.random() * 12);
        let item: ITEM;

        if (result < 2) {
            switch (result) {
                case 0:
                    item = ITEM.SHIELD;
                    break;
                case 1:
                    item = ITEM.GUN;
                    break;
            }
        }
        else
            item = ITEM.NONE;

        return item;
    }

    function randomAlien(): boolean {

        let result: number = Math.floor(Math.random() * 2);

        if (result == 0)
            return true;
        else
            return false;
    }
}