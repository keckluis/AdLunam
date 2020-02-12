"use strict";
var AdLunam;
(function (AdLunam) {
    AdLunam.fudge = FudgeCore;
    window.addEventListener("load", main);
    AdLunam.score = 0;
    AdLunam.gameOver = false;
    function main() {
        const canvas = document.querySelector("canvas");
        AdLunam.args = new URLSearchParams(location.search);
        spriteSetup();
        AdLunam.Sound.init();
        AdLunam.fudge.RenderManager.initialize(true, true);
        AdLunam.game = new AdLunam.fudge.Node("Game");
        AdLunam.bulletContainer = new AdLunam.fudge.Node("BulletContainer");
        AdLunam.astronaut = new AdLunam.Astronaut();
        AdLunam.level = new AdLunam.Level();
        AdLunam.game.appendChild(AdLunam.bulletContainer);
        AdLunam.game.appendChild(AdLunam.astronaut);
        AdLunam.game.appendChild(AdLunam.level);
        AdLunam.game.appendChild(new AdLunam.BackgroundHandler());
        AdLunam.camera = new AdLunam.Camera();
        AdLunam.game.appendChild(AdLunam.camera);
        let viewport = new AdLunam.fudge.Viewport();
        viewport.initialize("Viewport", AdLunam.game, AdLunam.camera.cmpCamera, canvas);
        viewport.draw();
        AdLunam.fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        AdLunam.fudge.Loop.start(AdLunam.fudge.LOOP_MODE.TIME_GAME, 20);
        AdLunam.start();
        function update(_event) {
            if (AdLunam.gameOver)
                AdLunam.end();
            else
                AdLunam.processInput();
            handleScore();
            handleBullets();
            if (AdLunam.Sound.muted)
                document.getElementById("Sound").innerHTML = "SOUND: OFF";
            else
                document.getElementById("Sound").innerHTML = "SOUND: ON";
            if (AdLunam.soundMuteCounter > 0)
                AdLunam.soundMuteCounter++;
            if (AdLunam.soundMuteCounter > 5)
                AdLunam.soundMuteCounter = 0;
            viewport.draw();
        }
        function spriteSetup() {
            let txtImage;
            let txtPlatform;
            let txtBackground;
            let images = document.querySelectorAll("img");
            txtImage = new AdLunam.fudge.TextureImage();
            txtImage.image = images[0];
            AdLunam.generateSprites(txtImage);
            txtPlatform = new AdLunam.fudge.TextureImage();
            txtPlatform.image = images[1];
            AdLunam.Platform.generateSprites(txtPlatform);
            txtBackground = new AdLunam.fudge.TextureImage();
            txtBackground.image = images[2];
            AdLunam.Background.generateSprites(txtBackground);
        }
        function handleScore() {
            if (Math.round(AdLunam.astronaut.cmpTransform.local.translation.x) > AdLunam.score)
                AdLunam.score = Math.round(AdLunam.astronaut.cmpTransform.local.translation.x);
            let scoreString = AdLunam.score.toString();
            if (AdLunam.score < 10)
                scoreString = "00" + scoreString;
            else if (AdLunam.score < 100)
                scoreString = "0" + scoreString;
            else if (AdLunam.score > 999)
                scoreString = "999";
            document.getElementById("Score").innerHTML = scoreString;
        }
        function handleBullets() {
            //remove bullets from game
            for (let bullet of AdLunam.bulletContainer.getChildren()) {
                if (bullet.hit || bullet.lifetime > 99) {
                    AdLunam.fudge.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, bullet.update);
                    AdLunam.bulletContainer.removeChild(bullet);
                }
            }
        }
    }
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Main.js.map