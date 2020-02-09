namespace AdLunam {

    import fudge = FudgeCore;

    export class Camera extends fudge.Node {

        public constructor() {
            super("Camera");

            this.addComponent(new fudge.ComponentTransform());
            let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
            this.addComponent(cmpCamera);
            this.cmpCamera.backgroundColor = fudge.Color.CSS("red");
            this.cmpCamera.pivot.translateZ(10);

            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
        }  

        public get cmpCamera(): fudge.ComponentCamera {
            return this.getComponent(fudge.ComponentCamera);
        }

        private update = (_event: fudge.Eventƒ): void => {
            
            let x: number = 0;
            if (astronaut.cmpTransform.local.translation.x > this.cmpTransform.local.translation.x)
                x = astronaut.cmpTransform.local.translation.x;
            else
                x = this.cmpTransform.local.translation.x;
            let y: number = astronaut.cmpTransform.local.translation.y;
            let z: number = this.cmpTransform.local.translation.z;

            if (y < 0)
                y = 0;
            if (y > 2)
                y = 2;

            this.cmpTransform.local.translation = new fudge.Vector3(x, y, z);
        }
    }
}