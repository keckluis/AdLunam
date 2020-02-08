namespace AdLunam {
    import fudge = FudgeCore;
  
    export enum ACTION {
      IDLE = "Idle",
      WALK = "Walk",
      JUMP = "Jump"
    }
    export enum DIRECTION {
      RIGHT, LEFT
    }

    export class Character extends fudge.Node {
       
        public static sprites: Sprite[];
        public speed: fudge.Vector3 = fudge.Vector3.ZERO();
        public gravity: fudge.Vector2 = fudge.Vector2.Y(-7);
        public hitbox: Hitbox;
        public speedMax: fudge.Vector2;
        public constructor(_name: string) {
            super(_name);

            this.addComponent(new fudge.ComponentTransform());
            
            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
        }

        public update = (_event: fudge.Eventƒ): void => {
            if (!gameOver)
                this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
            this.speed.y += this.gravity.y * timeFrame;
            let distance: fudge.Vector3 = fudge.Vector3.SCALE(this.speed, timeFrame);

            if (!gameOver)
                this.cmpTransform.local.translate(distance);

            this.checkCollision();

            this.updateAdditions();
        }

        public createHitbox(_name: string, _yTranslation: number, _scale: fudge.Vector3): Hitbox {
            let hitbox: Hitbox = new Hitbox(_name);
            hitbox.cmpTransform.local.translateY(_yTranslation);
            hitbox.cmpTransform.local.scale(_scale);
            return hitbox;
        }

        public checkCollision(): void {
            for (let platform of level.getChildren()) {
              let rect: fudge.Rectangle = (<Platform>platform).getRectWorld();
              let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
              if (hit) {
                    let translation: fudge.Vector3 = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }

        public updateAdditions(): void {
            return;
        }

        public nodeSprites(_sprite: Sprite): void {
            let nodeSprite: NodeSprite = new NodeSprite(_sprite.name, _sprite);
            nodeSprite.activate(false);

            nodeSprite.addEventListener(
                "showNext",
                (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
                true
            );
            this.appendChild(nodeSprite);
        }
    }
}