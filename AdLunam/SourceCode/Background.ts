namespace AdLunam {

    import fudge = FudgeCore;

    export enum BACKGROUND {
        ONE = "1",
        TWO = "2",
        THREE = "3"
    }

    export class Background extends fudge.Node {
        private static sprites: Sprite[];

        public constructor() {
            super("Background");

            this.addComponent(new fudge.ComponentTransform());

            for (let sprite of Background.sprites)
                this.nodeSprites(sprite);
            
            this.cmpTransform.local.translateZ(-5);
            this.cmpTransform.local.translateY(1);
        }

        public static generateSprites(_txtImage: fudge.TextureImage): void {
            Background.sprites = [];

            let sprite: Sprite = new Sprite(BACKGROUND.ONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 1920, 1080), 1, fudge.Vector2.ZERO(), 95, fudge.ORIGIN2D.CENTER);
            Background.sprites.push(sprite);

            sprite = new Sprite(BACKGROUND.TWO);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(1920, 0, 1920, 1080), 1, fudge.Vector2.ZERO(), 95, fudge.ORIGIN2D.CENTER);
            Background.sprites.push(sprite);

            sprite = new Sprite(BACKGROUND.THREE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(3840, 0, 1920, 1080), 1, fudge.Vector2.ZERO(), 95, fudge.ORIGIN2D.CENTER);
            Background.sprites.push(sprite);
        }

        public show(_bg: BACKGROUND): void {
            for (let bg of this.getChildren()) 
                bg.activate(bg.name == _bg);
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