namespace AdLunam {
    export import fudge = FudgeCore;
  
    window.addEventListener("load", main);

    export let camera: Camera;
    export let game: fudge.Node;
    export let bullets: fudge.Node;
    export let level: fudge.Node;
    export let astronaut: Astronaut;
    export let args: URLSearchParams;
    export let score: number = 0;
    export let gameOver: boolean = false;
    let txtImage: fudge.TextureImage; 
    let txtPlatform: fudge.TextureImage;  
    let txtBackground: fudge.TextureImage; 
  
    function main(): void {
      const canvas: HTMLCanvasElement = document.querySelector("canvas");
      args = new URLSearchParams(location.search);
      
      spriteSetup();
  
      fudge.RenderManager.initialize(true, true);
      game = new fudge.Node("Game");
      bullets = new fudge.Node("Bullets");
      astronaut = new Astronaut();
      level = new Level();
      game.appendChild(bullets);
      game.appendChild(astronaut);
      game.appendChild(level);
      
      game.appendChild(new BackgroundHandler());
      
      camera = new Camera();
      game.appendChild(camera);
  
      let viewport: fudge.Viewport = new fudge.Viewport();
      viewport.initialize("Viewport", game, camera.cmpCamera, canvas);
      viewport.draw();
  
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
      fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 20);

      start();

      function update(_event: fudge.Eventƒ): void {

        if (gameOver)
          end();
        else
          processInput();

        if (Math.round(astronaut.cmpTransform.local.translation.x) > score)
          score = Math.round(astronaut.cmpTransform.local.translation.x);

        //remove bullets from game
        for (let bullet of bullets.getChildren()) {
            if ((<Bullet>bullet).hit || (<Bullet>bullet).lifetime > 99) {
              bullets.removeChild(bullet);  
              console.log(bullets);
            }
        }

        if (blockItemDrop) {
          itemDropCounter += 1;

          if (itemDropCounter > 20)
            blockItemDrop = false;
        }
        
        viewport.draw();
      }

      function spriteSetup(): void {
        let images: any = document.querySelectorAll("img");
        txtImage = new fudge.TextureImage();
        txtImage.image = images[0];
        Astronaut.generateSprites(txtImage);
        Alien.generateSprites(txtImage);
        Item.generateSprites(txtImage);
        Bullet.generateSprites(txtImage);

        txtPlatform = new fudge.TextureImage();
        txtPlatform.image = images[1];
        Platform.generateSprites(txtPlatform);

        txtBackground = new fudge.TextureImage();
        txtBackground.image = images[2];
        Background.generateSprites(txtBackground);
      }
    }  
}