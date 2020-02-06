namespace AdLunam {
    import fudge = FudgeCore;
  
    export class Level extends fudge.Node {

        public constructor() {

            super("Level");

            let platform: Platform;

            platform = new Platform(0, 0);
            this.appendChild(platform);

            platform = new Platform(40, 0, null, true);  
            this.appendChild(platform);
      
            platform = new Platform(80, 0, null, true);
            this.appendChild(platform);

            platform = new Platform(120, 0, null, true);   
            this.appendChild(platform);

            // platform = new Platform(160, 0, null, true);   
            // this.appendChild(platform);

            // platform = new Platform(200, 0, null, true);   
            // this.appendChild(platform);
        }
    }
}