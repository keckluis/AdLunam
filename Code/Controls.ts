namespace AdLunam {

    interface KeyPressed {
        [code: string]: boolean;
      }

    let keysPressed: KeyPressed = {};

    function handleKeyboard(_event: KeyboardEvent): void {
        keysPressed[_event.code] = (_event.type == "keydown");
    }

    export async function start(): Promise<void> {
        fudge.Debug.log("Wait for enter");
        await waitForKeyPress(fudge.KEYBOARD_CODE.ENTER);
        fudge.Debug.log("Enter pressed");
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
    
    export function processInput(): void {

      //drop item
      if (keysPressed[fudge.KEYBOARD_CODE.Q]) {
        astronaut.item = ITEM.NONE;
        return;
      }

      //use item (gun & jetpack)
      if (keysPressed[fudge.KEYBOARD_CODE.F] && astronaut.item == ITEM.GUN) {

        let bullet: Bullet = new Bullet();
        bullets.appendChild(bullet);
        bullet.cmpTransform.local.translation = astronaut.cmpTransform.local.translation;
        bullet.cmpTransform.local.translateX(0.3);
        bullet.cmpTransform.local.translateY(0.22);
        astronaut.item = ITEM.NONE;

      } else if (keysPressed[fudge.KEYBOARD_CODE.F] && astronaut.item == ITEM.JETPACK && !astronaut.jetpackUsed && !astronaut.isOnFloor) {
          astronaut.isOnFloor = true;
          astronaut.jetpackUsed = true;
          astronaut.act(ACTION.JUMP);
          astronaut.isOnFloor = false;
          return;
      }
      
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