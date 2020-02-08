namespace AdLunam {

    import fudge = FudgeCore;

    export class Camera extends fudge.Node {

        public constructor() {
            super("Camera");

            this.addComponent(new fudge.ComponentTransform());
            let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
            this.addComponent(cmpCamera);
            this.cmpCamera.backgroundColor = fudge.Color.CSS("black");
            this.cmpCamera.pivot.translateZ(10);

            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
        }  

        public get cmpCamera(): fudge.ComponentCamera {
            return this.getComponent(fudge.ComponentCamera);
        }

        private update = (_event: fudge.Eventƒ): void => {
            
            let x: number = astronaut.cmpTransform.local.translation.x;
            let y: number = astronaut.cmpTransform.local.translation.y;
            let z: number = this.cmpTransform.local.translation.z;

            if (y < 0)
                y = 0;

            this.cmpTransform.local.translation = new fudge.Vector3(x, y, z);
        }
    }
}