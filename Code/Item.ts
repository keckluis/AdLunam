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
        public type: ITEM;
        public hitbox: Hitbox;

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
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
        }

        public static generateSprites(_txtImage: fudge.TextureImage): void {

            Item.sprites = [];
            
            let sprite: Sprite = new Sprite (ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 86, 6, 9), 1, fudge.Vector2.ZERO(), 40, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite (ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(8, 86, 6, 9), 1, fudge.Vector2.ZERO(), 40, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite (ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(16, 86, 6, 9), 1, fudge.Vector2.ZERO(), 40, fudge.ORIGIN2D.BOTTOMCENTER);
            Item.sprites.push(sprite);
        }

        public show(): void {
            for (let child of this.getChildren())
                child.activate(child.name == this.type);
        }

        public createHitbox(): Hitbox {

            let hitbox: Hitbox = new Hitbox("ItemHitbox");
            hitbox.cmpTransform.local.translateY(0.25);
            hitbox.cmpTransform.local.scaleX(0.15);
            hitbox.cmpTransform.local.scaleY(0.25);
            this.hitbox = hitbox;
            return hitbox;
        }
    }
}