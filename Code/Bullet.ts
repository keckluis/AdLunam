namespace AdLunam {
    import fudge = FudgeCore;

    export class Bullet extends HitboxObject {
        public hit: boolean = false;
        public lifetime: number = 0;
        private direction: DIRECTION;

        public constructor() {
            super("Bullet");
            let nodeSprite: NodeSprite = new NodeSprite("Bullet", Bullet.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            this.show();
            this.hitbox = this.createHitbox("BulletHitbox", 0.15, new fudge.Vector3(0.25, 0.35, 1));
            this.appendChild(this.hitbox);
            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
            this.direction = astronaut.direction;
        }

        public show(): void {
            for (let child of this.getChildren()) 
                child.activate(child.name == "Bullet");
        }

        public update = (_event: fudge.Eventƒ): void => {
            if (!this.hit && this.lifetime < 100) {   
                let direction: number = (this.direction == DIRECTION.RIGHT ? 1 : -1);
                this.cmpTransform.local.translateX(0.2 * direction);
                if (this.hitbox.checkCollision(true))
                    this.hit = true;
                this.checkCollision();
                this.lifetime += 1;
            }
        }

        private checkCollision(): void {
            for (let platform of level.getChildren()) {
                let rect: fudge.Rectangle = (<Platform>platform).getRectWorld();
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    this.hit = true;
                } 
            }
        }
    }
}