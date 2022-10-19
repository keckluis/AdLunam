namespace AdLunam {
    export import fudge = FudgeCore;
  
    window.addEventListener("load", main);

    export let camera: Camera;
    export let game: fudge.Node;
    export let bulletContainer: fudge.Node;
    export let level: fudge.Node;
    export let astronaut: Astronaut;
    export let args: URLSearchParams;
    export let score: number = 0;
    export let gameOver: boolean = false;
     
  
    function main(): void {
      const canvas: HTMLCanvasElement = document.querySelector("canvas");
      args = new URLSearchParams(location.search);
      
      spriteSetup();
      Sound.init();

      document.addEventListener("keydown", handleSound);
      document.addEventListener("keyup", handleSound);
  
      fudge.RenderManager.initialize(true, true);
      game = new fudge.Node("Game");
      bulletContainer = new fudge.Node("BulletContainer");
      astronaut = new Astronaut();
      level = new Level();
      game.appendChild(bulletContainer);
      game.appendChild(astronaut);
      game.appendChild(level);
      
      game.appendChild(new BackgroundHandler());

      camera = new Camera();
      game.appendChild(camera);
  
      let viewport: fudge.Viewport = new fudge.Viewport();
      viewport.initialize("Viewport", game, camera.cmpCamera, canvas);
      viewport.draw();
  
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
      fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 30);

      start();

      function update(_event: fudge.Eventƒ): void {
        if (gameOver)
          end();
        else
          processInput();

        handleScore();

        handleBullets();

        if (Sound.muted)
          document.getElementById("Sound").innerHTML = "SOUND: OFF";
        else
          document.getElementById("Sound").innerHTML = "SOUND: ON";

        if (soundMuteCounter > 0) 
          soundMuteCounter++;
        if (soundMuteCounter > 5)
          soundMuteCounter = 0;
        
        viewport.draw();
      }

      function spriteSetup(): void {
        let txtImage: fudge.TextureImage; 
        let txtPlatform: fudge.TextureImage;  
        let txtBackground: fudge.TextureImage;

        let images: any = document.querySelectorAll("img");
        txtImage = new fudge.TextureImage();
        txtImage.image = images[0];
        generateSprites(txtImage);
        
        txtPlatform = new fudge.TextureImage();
        txtPlatform.image = images[1];
        Platform.generateSprites(txtPlatform);

        txtBackground = new fudge.TextureImage();
        txtBackground.image = images[2];
        Background.generateSprites(txtBackground);
      }

      function handleScore(): void {
        if (Math.round(astronaut.cmpTransform.local.translation.x) > score)
          score = Math.round(astronaut.cmpTransform.local.translation.x);
        
        let scoreString: string = score.toString();
        if (score < 10)
          scoreString = "00" + scoreString;
        else if (score < 100)
          scoreString = "0" + scoreString;
        else if (score > 999)
          scoreString = "999";
        
        document.getElementById("Score").innerHTML = scoreString;
      }

      function handleBullets(): void {
        //remove bullets from game
        for (let bullet of bulletContainer.getChildren()) {
          if ((<Bullet>bullet).hit || (<Bullet>bullet).lifetime > 99) {
            fudge.Loop.removeEventListener(fudge.EVENT.LOOP_FRAME, (<Bullet>bullet).update);
            bulletContainer.removeChild(bullet);  
          }
        }
      }
    }  
}