"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Platform extends fudge.Node {
        constructor(_posX, _posY, _item, _alien) {
            super("Platform");
            let nodeSprite = new AdLunam.NodeSprite("PlatformSprite", Platform.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            let cmpMesh = new fudge.ComponentMesh(Platform.mesh);
            cmpMesh.pivot = Platform.pivot;
            this.addComponent(cmpMesh);
            this.show();
            this.cmpTransform.local.scaleX(2);
            this.cmpTransform.local.scaleY(2);
            this.cmpTransform.local.translateX(_posX * 0.1);
            this.cmpTransform.local.translateY((_posY - 50) * 0.05);
            if (_item) {
                let item = new AdLunam.Item(_item);
                this.item = item;
                this.appendChild(this.item);
            }
            if (_alien) {
                let alien = new AdLunam.Alien();
                this.alien = alien;
                this.appendChild(this.alien);
                this.alien.cmpTransform.local.translateX((randomAlienStartPos() - 4) * 0.1);
            }
        }
        static generateSprites(_txtImage) {
            Platform.sprites = [];
            let sprite = new AdLunam.Sprite("PlatformSprite");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 72, 216), 1, fudge.Vector2.ZERO(), 72, fudge.ORIGIN2D.TOPCENTER);
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
        addItem(_item) {
            for (let child of this.getChildren()) {
                if (child.name == "Item" || child.name == "Alien")
                    this.removeChild(child);
            }
            let item = new AdLunam.Item(_item);
            this.item = item;
            this.appendChild(this.item);
        }
    }
    Platform.mesh = new fudge.MeshSprite();
    Platform.pivot = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));
    AdLunam.Platform = Platform;
    function randomAlienStartPos() {
        return Math.floor(Math.random() * 9);
    }
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Platform.js.map