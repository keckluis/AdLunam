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
    let txtImage: fudge.TextureImage;  
    let cmpCamera: fudge.ComponentCamera;
  
    function main(): void {
      let canvas: HTMLCanvasElement = document.querySelector("canvas");
      let img: HTMLImageElement = document.querySelector("img");
      txtImage = new fudge.TextureImage();
      txtImage.image = img;
      Astronaut.generateSprites(txtImage);
      Alien.generateSprites(txtImage);
      Platform.generateSprites(txtImage);
      Item.generateSprites(txtImage);
      Bullet.generateSprites(txtImage);
  
      fudge.RenderManager.initialize(true, false);
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
  
      document.addEventListener("keydown", handleKeyboard);
      document.addEventListener("keyup", handleKeyboard);
  
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
      fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 10);
  
      function update(_event: fudge.Eventƒ): void {

        processInput();

        for (let platform of level.getChildren()) {
          if ((<Platform>platform).item)
            (<Platform>platform).item.cmpTransform.local.rotateY(5);
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

      } else if (keysPressed[fudge.KEYBOARD_CODE.F] && astronaut.item == ITEM.JETPACK && !astronaut.jetpackUsed) {
          astronaut.isOnFloor = true;
          astronaut.jetpackUsed = true;
          astronaut.act(ACTION.JUMP);
          astronaut.isOnFloor = false;
      }

      if (keysPressed[fudge.KEYBOARD_CODE.A]) {
        if (keysPressed[fudge.KEYBOARD_CODE.W]) {
          astronaut.act(ACTION.JUMP, DIRECTION.LEFT);
          astronaut.isOnFloor = false;
          return;
        }
        if (astronaut.isOnFloor)
          astronaut.act(ACTION.WALK, DIRECTION.LEFT);
        return;
      }

      if (keysPressed[fudge.KEYBOARD_CODE.D]) {
        if (keysPressed[fudge.KEYBOARD_CODE.W]) {
          astronaut.act(ACTION.JUMP, DIRECTION.RIGHT);
          astronaut.isOnFloor = false;
          return;
        }
        if (astronaut.isOnFloor)
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