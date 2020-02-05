"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Platform extends fudge.Node {
        //private static material: fudge.Material = new fudge.Material("Platform", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("red", 0.5)));
        constructor(posX, posY) {
            super("Platform");
            let nodeSprite = new AdLunam.NodeSprite("PlatformSprite", Platform.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            //this.addComponent(new fudge.ComponentMaterial(Platform.material));
            let cmpMesh = new fudge.ComponentMesh(Platform.mesh);
            cmpMesh.pivot = Platform.pivot;
            this.addComponent(cmpMesh);
            this.show();
            this.cmpTransform.local.scaleX(2);
            this.cmpTransform.local.scaleY(2);
            this.cmpTransform.local.translateX(posX * 0.1);
            if (posY > 22)
                posY = 22;
            if (posY < -30)
                posY = -30;
            this.cmpTransform.local.translateY(posY * 0.1);
        }
        static generateSprites(_txtImage) {
            Platform.sprites = [];
            let sprite = new AdLunam.Sprite("PlatformSprite");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 144, 72, 216), 1, fudge.Vector2.ZERO(), 72, fudge.ORIGIN2D.TOPCENTER);
            Platform.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren()) {
                child.activate(child.name == "PlatformSprite");
            }
        }
        getRectWorld() {
            let rect = fudge.Rectangle.GET(0, 0, 100, 100);
            let topleft = new fudge.Vector3(-0.5, 0.5, 0);
            let bottomright = new fudge.Vector3(0.5, -0.5, 0);
            let mtxResult = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Platform.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Platform.mesh = new fudge.MeshSprite();
    Platform.pivot = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));
    AdLunam.Platform = Platform;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Platform.js.map