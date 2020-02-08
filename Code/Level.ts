namespace AdLunam {
    import fudge = FudgeCore;
  
    export class Level extends fudge.Node {

        public constructor() {

            super("Level");

            let platform: Platform;

            platform = new Platform(0, 50);
            this.appendChild(platform);

            platform = new Platform(40, 50, ITEM.GUN);  
            this.appendChild(platform);
      
            platform = new Platform(80, 60, null, true);
            this.appendChild(platform);

            platform = new Platform(120, 40, ITEM.SHIELD);   
            this.appendChild(platform);

            platform = new Platform(160, 70, null, true);   
            this.appendChild(platform);

            platform = new Platform(200, 40, ITEM.JETPACK);   
            this.appendChild(platform);

            platform = new Platform(240, 80, null, true);   
            this.appendChild(platform);
        }
    }
}