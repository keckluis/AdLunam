namespace AdLunam {
    export import fudge = FudgeCore;
  
    window.addEventListener("load", main);
  
    interface KeyPressed {
      [code: string]: boolean;
    }
    let keysPressed: KeyPressed = {};
  
    export let game: fudge.Node;
    export let level: fudge.Node;
    export let astronaut: Astronaut;
    export let args: URLSearchParams;
    export let gameOver: boolean = false;
    let txtImage: fudge.TextureImage;  
    let cmpCamera: fudge.ComponentCamera;
  
    function main(): void {
      const canvas: HTMLCanvasElement = document.querySelector("canvas");
      args = new URLSearchParams(location.search);
      let img: HTMLImageElement = document.querySelector("img");
      txtImage = new fudge.TextureImage();
      txtImage.image = img;
      Astronaut.generateSprites(txtImage);
      Alien.generateSprites(txtImage);
      Platform.generateSprites(txtImage);
      Item.generateSprites(txtImage);
      Bullet.generateSprites(txtImage);
  
      fudge.RenderManager.initialize(true, true);
      game = new fudge.Node("Game");
      astronaut = new Astronaut();
      level = new Level();
      game.appendChild(level);
      game.appendChild(astronaut);
  
      cmpCamera = new fudge.ComponentCamera();
      cmpCamera.pivot.translateZ(10);
      cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
      cmpCamera.backgroundColor = fudge.Color.CSS("black");
  
      let viewport: fudge.Viewport = new fudge.Viewport();
      viewport.initialize("Viewport", game, cmpCamera, canvas);
      viewport.draw();
  
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
      fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 20);

      start();

      async function start(): Promise<void> {
        fudge.Debug.log("Wait for enter");
        await waitForKeyPress(fudge.KEYBOARD_CODE.ENTER);
        fudge.Debug.log("Enter pressed");
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        let domMenu: HTMLElement = document.querySelector("div#Menu");
        domMenu.style.visibility = "hidden";
      }

      function end(): void {
        let domOver: HTMLElement = document.querySelector("div#Over");
        domOver.style.visibility = "visible";
        window.removeEventListener("keydown", handleKeyboard);
        window.removeEventListener("keyup", handleKeyboard);
      }

      async function waitForKeyPress(_code: fudge.KEYBOARD_CODE): Promise<void> {
        return new Promise(_resolve => {
          window.addEventListener("keydown", hndKeyDown);
          function hndKeyDown(_event: KeyboardEvent): void {
            if (_event.code == _code) {
              window.removeEventListener("keydown", hndKeyDown);
              _resolve();
            }
          }
        });
      }

      function update(_event: fudge.Eventƒ): void {

        if (gameOver)
          end();
        else
          processInput();

        for (let platform of level.getChildren()) {
          if ((<Platform>platform).item)
            (<Platform>platform).item.cmpTransform.local.rotateY(5);
        }

        for (let gameChild of game.getChildren()) {
          if (gameChild.name == "Bullet")
            if ((<Bullet>gameChild).hit || (<Bullet>gameChild).lifetime > 99)
              game.removeChild(gameChild);  
        }
        
        cmpCamera.pivot.translation = new fudge.Vector3(astronaut.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);

        viewport.draw();
      }
    }
  
    function handleKeyboard(_event: KeyboardEvent): void {
      keysPressed[_event.code] = (_event.type == "keydown");
    }
  
    function processInput(): void {

      if (keysPressed[fudge.KEYBOARD_CODE.F] && astronaut.item == ITEM.GUN) {

        let bullet: Bullet = new Bullet();
        game.appendChild(bullet);
        bullet.cmpTransform.local.translation = astronaut.cmpTransform.local.translation;
        bullet.cmpTransform.local.translateY(0.22);
        astronaut.item = ITEM.NONE;

      } else if (keysPressed[fudge.KEYBOARD_CODE.F] && astronaut.item == ITEM.JETPACK && !astronaut.jetpackUsed && !astronaut.isOnFloor) {
          astronaut.isOnFloor = true;
          astronaut.jetpackUsed = true;
          astronaut.act(ACTION.JUMP);
          astronaut.isOnFloor = false;
          return;
      }

      if (keysPressed[fudge.KEYBOARD_CODE.A] && keysPressed[fudge.KEYBOARD_CODE.W]) {   
        astronaut.act(ACTION.JUMP);
        if (!astronaut.jetpackUsed)
          astronaut.act(ACTION.WALK, DIRECTION.LEFT);
        return;
      }

      if (keysPressed[fudge.KEYBOARD_CODE.D] && keysPressed[fudge.KEYBOARD_CODE.W]) {   
        astronaut.act(ACTION.JUMP);
        if (!astronaut.jetpackUsed)
          astronaut.act(ACTION.WALK, DIRECTION.RIGHT);
        return;
      }

      if (keysPressed[fudge.KEYBOARD_CODE.A]) {   
        if (!astronaut.jetpackUsed)
          astronaut.act(ACTION.WALK, DIRECTION.LEFT);
        return;
      }

      if (keysPressed[fudge.KEYBOARD_CODE.D]) {
        if (!astronaut.jetpackUsed)
          astronaut.act(ACTION.WALK, DIRECTION.RIGHT);
        return;
      }

      if (keysPressed[fudge.KEYBOARD_CODE.W]) {
        astronaut.act(ACTION.JUMP);
        astronaut.isOnFloor = false;
        return;
      }
      
      //ITEMS
      if (keysPressed[fudge.KEYBOARD_CODE.ONE]) {
        astronaut.item = ITEM.NONE;
        return;
      }
      if (keysPressed[fudge.KEYBOARD_CODE.TWO]) {
        astronaut.item = ITEM.GUN;
        return;
      }
      if (keysPressed[fudge.KEYBOARD_CODE.THREE]) {
        astronaut.item = ITEM.SHIELD;
        return;
      }
      if (keysPressed[fudge.KEYBOARD_CODE.FOUR]) {
        astronaut.item = ITEM.JETPACK;
        return;
      } 

      if (astronaut.isOnFloor)
        astronaut.act(ACTION.IDLE);
    }
  }