namespace AdLunam {
    import fudge = FudgeCore;

    export class HitboxObject extends fudge.Node {
        public static sprites: Sprite[];
        public hitbox: Hitbox;

        public constructor(_name: string) {
            super(_name);
        }

        public createHitbox(_name: string, _yTranslation: number, _scale: fudge.Vector3): Hitbox {
            let hitbox: Hitbox = new Hitbox(_name);
            hitbox.cmpTransform.local.translateY(_yTranslation);
            hitbox.cmpTransform.local.scale(_scale);
            return hitbox;
        }
    }
}