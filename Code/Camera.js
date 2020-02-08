"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Camera extends fudge.Node {
        constructor() {
            super("Camera");
            this.update = (_event) => {
                let x = AdLunam.astronaut.cmpTransform.local.translation.x;
                let y = AdLunam.astronaut.cmpTransform.local.translation.y;
                let z = this.cmpTransform.local.translation.z;
                if (y < 0)
                    y = 0;
                this.cmpTransform.local.translation = new fudge.Vector3(x, y, z);
            };
            this.addComponent(new fudge.ComponentTransform());
            let cmpCamera = new fudge.ComponentCamera();
            this.addComponent(cmpCamera);
            this.cmpCamera.backgroundColor = fudge.Color.CSS("black");
            this.cmpCamera.pivot.translateZ(10);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        get cmpCamera() {
            return this.getComponent(fudge.ComponentCamera);
        }
    }
    AdLunam.Camera = Camera;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Camera.js.map