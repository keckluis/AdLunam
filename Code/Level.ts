namespace AdLunam {
    import fudge = FudgeCore;
  
    export class Level extends fudge.Node {

        public constructor() {

            super("Level");

            let platform: Platform;

            platform = new Platform(0, 0);
            this.appendChild(platform);

            platform = new Platform(40, 10, ITEM.JETPACK);  
            this.appendChild(platform);
      
            platform = new Platform(100, 0);
            this.appendChild(platform);

            platform = new Platform(150, -20);   
            this.appendChild(platform);

            platform = new Platform(190, -10);   
            this.appendChild(platform);

            platform = new Platform(220, 0);   
            this.appendChild(platform);
        }
    }
}