namespace AdLunam {
    export import fudge = FudgeCore;
  
    window.addEventListener("load", test);
  
    interface KeyPressed {
      [code: string]: boolean;
    }
    let keysPressed: KeyPressed = {};
  
    export let game: fudge.Node;
    export let level: fudge.Node;
    let astronaut: Astronaut;
    let alien: Alien;
    let txtAstronaut: fudge.TextureImage;  
    let cmpCamera: fudge.ComponentCamera;
  
    function test(): void {
      let canvas: HTMLCanvasElement = document.querySelector("canvas");
      let img: HTMLImageElement = document.querySelector("img");
      txtAstronaut = new fudge.TextureImage();
      txtAstronaut.image = img;
      Astronaut.generateSprites(txtAstronaut);
      Alien.generateSprites(txtAstronaut);
  
      fudge.RenderManager.initialize(true, false);
      game = new fudge.Node("Game");
      astronaut = new Astronaut("Astronaut");
      alien = new Alien("Alien");
      level = createLevel();
      game.appendChild(level);
      game.appendChild(astronaut);
      game.appendChild(alien);
  
      cmpCamera = new fudge.ComponentCamera();
      cmpCamera.pivot.translateZ(5);
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
        
        cmpCamera.pivot.translation = new fudge.Vector3(astronaut.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
        viewport.draw();
      }
    }
  
    function handleKeyboard(_event: KeyboardEvent): void {
      keysPressed[_event.code] = (_event.type == "keydown");
    }
  
    function processInput(): void {
      if (keysPressed[fudge.KEYBOARD_CODE.A]) {
        astronaut.act(ACTION.WALK, DIRECTION.LEFT);
        return;
      }

      if (keysPressed[fudge.KEYBOARD_CODE.D]) {
        astronaut.act(ACTION.WALK, DIRECTION.RIGHT);
        return;
      }
      
      if (keysPressed[fudge.KEYBOARD_CODE.W] && astronaut.isOnFloor) {
        astronaut.act(ACTION.JUMP);
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
  
      astronaut.act(ACTION.IDLE);
    }

    function createLevel(): fudge.Node {
      let level: fudge.Node = new fudge.Node("Level");
      let floor: Floor = new Floor();
      floor.cmpTransform.local.scaleY(0.2);
      level.appendChild(floor);
  
      floor = new Floor();
      floor.cmpTransform.local.scaleY(0.2);
      floor.cmpTransform.local.scaleX(2);
      floor.cmpTransform.local.translateY(0.2);
      floor.cmpTransform.local.translateX(3);
      level.appendChild(floor);
  
      return level;
    }
  }