namespace AdLunam {
    import fudge = FudgeCore;

    export enum ITEM {
        NONE = "NONE", 
        GUN = "GUN", 
        SHIELD = "SHIELD",
        JETPACK = "JETPACK"
    }

    export class Item extends fudge.Node {

        private static sprites: Sprite[];
        private type: ITEM;

        public constructor(type: ITEM) {
            super(type);
            this.type = type;
            this.addComponent(new fudge.ComponentTransform());

            for (let sprite of Item.sprites) {
                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }

            this.show();
        }

        public static generateSprites(_txtImage: fudge.TextureImage): void {

            Item.sprites = [];
            
            let sprite: Sprite = new Sprite (ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 83, 8, 9), 1, fudge.Vector2.ZERO(), 40, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite (ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(8, 83, 8, 9), 1, fudge.Vector2.ZERO(), 40, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite (ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(16, 83, 8, 9), 1, fudge.Vector2.ZERO(), 40, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);
        }

        public show(): void {
            for (let child of this.getChildren())
                child.activate(child.name == this.type);
        }
    }
}