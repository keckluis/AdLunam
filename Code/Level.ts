namespace AdLunam {
    import fudge = FudgeCore;
  
    export class Level extends fudge.Node {

        public constructor() {

            super("Level");

            let platform: Platform;

            platform = new Platform(0, 0);
            this.appendChild(platform);

            platform = new Platform(40, 2, ITEM.GUN);  
            this.appendChild(platform);
      
            platform = new Platform(80, 10, null, true);
            this.appendChild(platform);

            platform = new Platform(120, 10, ITEM.SHIELD);   
            this.appendChild(platform);

            platform = new Platform(160, 0, null, true);   
            this.appendChild(platform);

            platform = new Platform(200, 10, ITEM.JETPACK);   
            this.appendChild(platform);

            platform = new Platform(240, 20, null, true);   
            this.appendChild(platform);
        }
    }
}