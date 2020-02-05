"use strict";
var AdLunam;
(function (AdLunam) {
    AdLunam.fudge = FudgeCore;
    window.addEventListener("load", test);
    let keysPressed = {};
    let astronaut;
    let alien;
    let txtImage;
    let cmpCamera;
    function test() {
        let canvas = document.querySelector("canvas");
        let img = document.querySelector("img");
        txtImage = new AdLunam.fudge.TextureImage();
        txtImage.image = img;
        AdLunam.Astronaut.generateSprites(txtImage);
        AdLunam.Alien.generateSprites(txtImage);
        AdLunam.Floor.generateSprites(txtImage);
        AdLunam.fudge.RenderManager.initialize(true, false);
        AdLunam.game = new AdLunam.fudge.Node("Game");
        astronaut = new AdLunam.Astronaut("Astronaut");
        alien = new AdLunam.Alien("Alien");
        AdLunam.level = createLevel();
        AdLunam.game.appendChild(AdLunam.level);
        AdLunam.game.appendChild(astronaut);
        AdLunam.game.appendChild(alien);
        cmpCamera = new AdLunam.fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.lookAt(AdLunam.fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = AdLunam.fudge.Color.CSS("black");
        let viewport = new AdLunam.fudge.Viewport();
        viewport.initialize("Viewport", AdLunam.game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        AdLunam.fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        AdLunam.fudge.Loop.start(AdLunam.fudge.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            cmpCamera.pivot.translation = new AdLunam.fudge.Vector3(astronaut.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
            viewport.draw();
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.A]) {
            if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.W]) {
                astronaut.act(AdLunam.ACTION.JUMP, AdLunam.DIRECTION.LEFT);
                astronaut.isOnFloor = false;
                return;
            }
            if (astronaut.isOnFloor)
                astronaut.act(AdLunam.ACTION.WALK, AdLunam.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.D]) {
            if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.W]) {
                astronaut.act(AdLunam.ACTION.JUMP, AdLunam.DIRECTION.RIGHT);
                astronaut.isOnFloor = false;
                return;
            }
            if (astronaut.isOnFloor)
                astronaut.act(AdLunam.ACTION.WALK, AdLunam.DIRECTION.RIGHT);
            return;
        }
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.W]) {
            astronaut.act(AdLunam.ACTION.JUMP);
            astronaut.isOnFloor = false;
            return;
        }
        //ITEMS
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.ONE]) {
            astronaut.item = AdLunam.ITEM.NONE;
            return;
        }
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.TWO]) {
            astronaut.item = AdLunam.ITEM.GUN;
            return;
        }
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.THREE]) {
            astronaut.item = AdLunam.ITEM.SHIELD;
            return;
        }
        if (keysPressed[AdLunam.fudge.KEYBOARD_CODE.FOUR]) {
            astronaut.item = AdLunam.ITEM.JETPACK;
            return;
        }
        if (astronaut.isOnFloor)
            astronaut.act(AdLunam.ACTION.IDLE);
    }
    function createLevel() {
        let level = new AdLunam.fudge.Node("Level");
        let floor = new AdLunam.Floor();
        floor.cmpTransform.local.scaleY(0.5);
        level.appendChild(floor);
        floor = new AdLunam.Floor();
        floor.cmpTransform.local.scaleY(1);
        floor.cmpTransform.local.scaleX(2);
        floor.cmpTransform.local.translateY(0);
        floor.cmpTransform.local.translateX(3);
        level.appendChild(floor);
        floor = new AdLunam.Floor();
        floor.cmpTransform.local.scaleY(1);
        floor.cmpTransform.local.scaleX(2);
        floor.cmpTransform.local.translateX(6);
        level.appendChild(floor);
        return level;
    }
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Main.js.map