"use strict";
var AdLunam;
(function (AdLunam) {
    let keysPressed = {};
    AdLunam.blockItemDrop = false;
    AdLunam.itemDropCounter = 0;
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    async function start() {
        AdLunam.fudge.Debug.log("Wait for enter");
        await waitForKeyPress(AdLunam.fudge.KEYBOARD_CODE.ENTER);
        AdLunam.fudge.Debug.log("Enter pressed");
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        let domMenu = document.querySelector("div#Menu");
        domMenu.style.visibility = "hidden";
    }
    AdLunam.start = start;
    function end() {
        let domOver = document.querySelector("div#Over");
        domOver.style.visibility = "visible";
        window.removeEventListener("keydown", handleKeyboard);
        window.removeEventListener("keyup", handleKeyboard);
    }
    AdLunam.end = end;
    async function waitForKeyPress(_code) {
        return new Promise(_resolve => {
            window.addEventListener("keydown", hndKeyDown);
            function hndKeyDown(_event) {
                if (_event.code == _code) {
                    window.removeEventListener("keydown", hndKeyDown);
                    _resolve();
                }
            }
        });
    }
    function processInput() {
        //drop item
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.Q] && !AdLunam.blockItemDrop) {
            AdLunam.astronaut.item = AdLunam.ITEM.NONE;
            AdLunam.blockItemDrop = true;
            return;
        }
        //use item (gun & jetpack)
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.F] && AdLunam.astronaut.item == AdLunam.ITEM.GUN) {
            let bullet = new AdLunam.Bullet();
            AdLunam.bullets.appendChild(bullet);
            bullet.cmpTransform.local.translation = AdLunam.astronaut.cmpTransform.local.translation;
            bullet.cmpTransform.local.translateX(0.3);
            bullet.cmpTransform.local.translateY(0.22);
            AdLunam.astronaut.item = AdLunam.ITEM.NONE;
        }
        else if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.F] && AdLunam.astronaut.item == AdLunam.ITEM.JETPACK && !AdLunam.astronaut.jetpackUsed && !AdLunam.astronaut.isOnFloor) {
            AdLunam.astronaut.isOnFloor = true;
            AdLunam.astronaut.jetpackUsed = true;
            AdLunam.astronaut.act(AdLunam.ACTION.JUMP);
            AdLunam.astronaut.isOnFloor = false;
            return;
        }
        //movement
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.A] && keysPressed[AdLunam.fudge.KEYBOARD_CODE.W]) {
            AdLunam.astronaut.act(AdLunam.ACTION.JUMP);
            if (!AdLunam.astronaut.jetpackUsed)
                AdLunam.astronaut.act(AdLunam.ACTION.WALK, AdLunam.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.D] && keysPressed[AdLunam.fudge.KEYBOARD_CODE.W]) {
            AdLunam.astronaut.act(AdLunam.ACTION.JUMP);
            if (!AdLunam.astronaut.jetpackUsed)
                AdLunam.astronaut.act(AdLunam.ACTION.WALK, AdLunam.DIRECTION.RIGHT);
            return;
        }
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.A]) {
            if (!AdLunam.astronaut.jetpackUsed)
                AdLunam.astronaut.act(AdLunam.ACTION.WALK, AdLunam.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.D]) {
            if (!AdLunam.astronaut.jetpackUsed)
                AdLunam.astronaut.act(AdLunam.ACTION.WALK, AdLunam.DIRECTION.RIGHT);
            return;
        }
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.W]) {
            AdLunam.astronaut.act(AdLunam.ACTION.JUMP);
            AdLunam.astronaut.isOnFloor = false;
            return;
        }
        if (AdLunam.astronaut.isOnFloor)
            AdLunam.astronaut.act(AdLunam.ACTION.IDLE);
    }
    AdLunam.processInput = processInput;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Controls.js.map