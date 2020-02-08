"use strict";
var AdLunam;
(function (AdLunam) {
    AdLunam.fudge = FudgeCore;
    window.addEventListener("load", main);
    let keysPressed = {};
    AdLunam.gameOver = false;
    let txtImage;
    let cmpCamera;
    function main() {
        const canvas = document.querySelector("canvas");
        AdLunam.args = new URLSearchParams(location.search);
        let img = document.querySelector("img");
        txtImage = new AdLunam.fudge.TextureImage();
        txtImage.image = img;
        AdLunam.Astronaut.generateSprites(txtImage);
        AdLunam.Alien.generateSprites(txtImage);
        AdLunam.Platform.generateSprites(txtImage);
        AdLunam.Item.generateSprites(txtImage);
        AdLunam.Bullet.generateSprites(txtImage);
        AdLunam.fudge.RenderManager.initialize(true, true);
        AdLunam.game = new AdLunam.fudge.Node("Game");
        AdLunam.astronaut = new AdLunam.Astronaut();
        AdLunam.level = new AdLunam.Level();
        AdLunam.game.appendChild(AdLunam.level);
        AdLunam.game.appendChild(AdLunam.astronaut);
        cmpCamera = new AdLunam.fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.lookAt(AdLunam.fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = AdLunam.fudge.Color.CSS("black");
        let viewport = new AdLunam.fudge.Viewport();
        viewport.initialize("Viewport", AdLunam.game, cmpCamera, canvas);
        viewport.draw();
        AdLunam.fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        AdLunam.fudge.Loop.start(AdLunam.fudge.LOOP_MODE.TIME_GAME, 20);
        start();
        async function start() {
            AdLunam.fudge.Debug.log("Wait for enter");
            await waitForKeyPress(AdLunam.fudge.KEYBOARD_CODE.ENTER);
            AdLunam.fudge.Debug.log("Enter pressed");
            document.addEventListener("keydown", handleKeyboard);
            document.addEventListener("keyup", handleKeyboard);
            let domMenu = document.querySelector("div#Menu");
            domMenu.style.visibility = "hidden";
        }
        function end() {
            let domOver = document.querySelector("div#Over");
            domOver.style.visibility = "visible";
            window.removeEventListener("keydown", handleKeyboard);
            window.removeEventListener("keyup", handleKeyboard);
        }
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
        function update(_event) {
            if (AdLunam.gameOver)
                end();
            else
                processInput();
            for (let platform of AdLunam.level.getChildren()) {
                if (platform.item)
                    platform.item.cmpTransform.local.rotateY(5);
            }
            for (let gameChild of AdLunam.game.getChildren()) {
                if (gameChild.name == "Bullet")
                    if (gameChild.hit || gameChild.lifetime > 99)
                        AdLunam.game.removeChild(gameChild);
            }
            cmpCamera.pivot.translation = new AdLunam.fudge.Vector3(AdLunam.astronaut.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
            viewport.draw();
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.F] && AdLunam.astronaut.item == AdLunam.ITEM.GUN) {
            let bullet = new AdLunam.Bullet();
            AdLunam.game.appendChild(bullet);
            bullet.cmpTransform.local.translation = AdLunam.astronaut.cmpTransform.local.translation;
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
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Main.js.map