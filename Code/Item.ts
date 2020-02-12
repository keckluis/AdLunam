namespace AdLunam {
    import fudge = FudgeCore;

    export enum ITEM {
        NONE = "NONE", 
        GUN = "GUN", 
        SHIELD = "SHIELD",
        JETPACK = "JETPACK"
    }

    export class Item extends HitboxObject {
        public type: ITEM;

        public constructor(type: ITEM) {
            super("Item");
            this.type = type;
            this.addComponent(new fudge.ComponentTransform());

            for (let sprite of Item.sprites) {
                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }

            this.show();
            this.hitbox = this.createHitbox("ItemHitbox", 0.25, new fudge.Vector3(0.15, 0.25, 1));
            this.appendChild(this.hitbox);

            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
        }

        public show(): void {
            for (let child of this.getChildren())
                child.activate(child.name == this.type);
        }

        public update = (_event: fudge.Eventƒ): void => {
            this.cmpTransform.local.rotateY(5);
        }
    }
}