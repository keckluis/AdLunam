namespace AdLunam {

    interface KeyPressed {
      [code: string]: boolean;
    }

    let keysPressed: KeyPressed = {};
    let gameOverSoundPlayed: boolean = false;
    let gameStarted: boolean = false;
    
    let itemDropCounter: number = 0;
    export let soundMuteCounter: number = 0;

    function handleKeyboard(_event: KeyboardEvent): void {
      keysPressed[_event.code] = (_event.type == "keydown");
    }

    export async function start(): Promise<void> {
      await waitForKeyPress(fudge.KEYBOARD_CODE.ENTER);
      if (!Sound.muted)
        Sound.playMusic();
      gameStarted = true;
      document.addEventListener("keydown", handleKeyboard);
      document.addEventListener("keyup", handleKeyboard);
      let domMenu: HTMLElement = document.querySelector("div#Menu");
      domMenu.style.visibility = "hidden";
    }

    export function end(): void {
      let domOver: HTMLElement = document.querySelector("div#Over");
      domOver.style.visibility = "visible";
      window.removeEventListener("keydown", handleKeyboard);
      window.removeEventListener("keyup", handleKeyboard);
      Sound.pauseMusic();
      if (!gameOverSoundPlayed)
        Sound.play("game_over");
      gameOverSoundPlayed = true;
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

    export function handleSound(_event: KeyboardEvent): void {
      if (_event.type == "keydown" && _event.keyCode == 77 && soundMuteCounter == 0) {
        if (Sound.muted) {
          Sound.muted = false;

          if (Sound.musicStarted)
            Sound.continueMusic();
          else if (gameStarted)
            Sound.playMusic();
        }
        else {
          Sound.muted = true;
          Sound.pauseMusic();
        }
        soundMuteCounter = 1;
      }
    }
    
    export function processInput(): void {
      //mute sound
      if (keysPressed[fudge.KEYBOARD_CODE.M] && soundMuteCounter == 0) {
        if (Sound.muted) {
          Sound.muted = false;
          Sound.continueMusic();
        }
        else {
          Sound.muted = true;
          Sound.pauseMusic();
        }
        soundMuteCounter = 1;
        return;
      }

      //drop item
      if (keysPressed[fudge.KEYBOARD_CODE.Q] && itemDropCounter == 0 && astronaut.isOnFloor) {
        itemDropCounter = 1;
        astronaut.item = ITEM.NONE;
        Sound.play("item_drop");
      }

      //use item
      if (keysPressed[fudge.KEYBOARD_CODE.F]) {
        if (astronaut.item == ITEM.GUN) {
          let bullet: Bullet = new Bullet();
          bulletContainer.appendChild(bullet);
          bullet.cmpTransform.local.translation = astronaut.cmpTransform.local.translation;
          if (astronaut.direction == DIRECTION.RIGHT)
            bullet.cmpTransform.local.translateX(0.3);
          else 
            bullet.cmpTransform.local.translateX(-0.3);
          bullet.cmpTransform.local.translateY(0.22);
          astronaut.item = ITEM.NONE;
          Sound.play("gun");
        }
        
        if (astronaut.item == ITEM.JETPACK && !astronaut.jetpackUsed && !astronaut.isOnFloor) {
          astronaut.isOnFloor = true;
          astronaut.jetpackUsed = true;
          astronaut.act(ACTION.JUMP, null, true);
          astronaut.isOnFloor = false;
          astronaut.item = ITEM.NONE;
          Sound.play("jetpack");
        }
        return;
      }

      if (itemDropCounter > 0)
        itemDropCounter++;

      if (itemDropCounter > 5)
        itemDropCounter = 0;
      
      //movement
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

      if (astronaut.isOnFloor)
        astronaut.act(ACTION.IDLE);
      }
}