"use strict";
var AdLunam;
(function (AdLunam) {
    var ƒ = FudgeCore;
    class Floor extends ƒ.Node {
        constructor() {
            super("Floor");
            let nodeSprite = new AdLunam.NodeSprite("FloorSprite", Floor.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new ƒ.ComponentTransform());
            let cmpMesh = new ƒ.ComponentMesh(Floor.mesh);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
            this.show();
        }
        static generateSprites(_txtImage) {
            Floor.sprites = [];
            let sprite = new AdLunam.Sprite("FloorSprite");
            sprite.generateByGrid(_txtImage, AdLunam.fudge.Rectangle.GET(0, 156, 72, 61), 1, AdLunam.fudge.Vector2.ZERO(), 72, AdLunam.fudge.ORIGIN2D.TOPCENTER);
            Floor.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "FloorSprite");
        }
        getRectWorld() {
            let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topleft = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomright = new ƒ.Vector3(0.5, -0.5, 0);
            //let pivot: ƒ.Matrix4x4 = this.getComponent(ƒ.ComponentMesh).pivot;
            let mtxResult = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Floor.mesh = new ƒ.MeshSprite();
    Floor.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    AdLunam.Floor = Floor;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Floor.js.map