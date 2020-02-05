namespace AdLunam {
  import fudge = FudgeCore;

  export class Platform extends fudge.Node {
    private static mesh: fudge.MeshSprite = new fudge.MeshSprite();
    private static readonly pivot: fudge.Matrix4x4 = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));
    private static sprites: Sprite[];
    //private static material: fudge.Material = new fudge.Material("Platform", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("red", 0.5)));

    public constructor(_posX: number, _posY: number, _item?: ITEM) {
      super("Platform");
      let nodeSprite: NodeSprite = new NodeSprite("PlatformSprite", Platform.sprites[0]);
      nodeSprite.activate(false);
      this.appendChild(nodeSprite);
      this.addComponent(new fudge.ComponentTransform());
      //this.addComponent(new fudge.ComponentMaterial(Platform.material));
      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Platform.mesh);
      cmpMesh.pivot = Platform.pivot;
      this.addComponent(cmpMesh);
      this.show();

      this.cmpTransform.local.scaleX(2);
      this.cmpTransform.local.scaleY(2);
      this.cmpTransform.local.translateX(_posX * 0.1);
      if (_posY > 22)
        _posY = 22;
      if (_posY < -30)
        _posY = -30;
      this.cmpTransform.local.translateY(_posY * 0.1);

      if (_item) {

        let item: Item = new Item(_item);
        this.appendChild(item);
      }
    }

    public static generateSprites(_txtImage: fudge.TextureImage): void {
      Platform.sprites = [];
      let sprite: Sprite = new Sprite("PlatformSprite");
      sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 144, 72, 216), 1, fudge.Vector2.ZERO(), 72, fudge.ORIGIN2D.TOPCENTER);
      Platform.sprites.push(sprite);
    }

    public show(): void {
      for (let child of this.getChildren()) {
        child.activate(child.name == "PlatformSprite");
      }
    }

    public getRectWorld(): fudge.Rectangle {
      let rect: fudge.Rectangle = fudge.Rectangle.GET(0, 0, 100, 100);
      let topleft: fudge.Vector3 = new fudge.Vector3(-0.5, 0.5, 0);
      let bottomright: fudge.Vector3 = new fudge.Vector3(0.5, -0.5, 0);
      
      let mtxResult: fudge.Matrix4x4 = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Platform.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: fudge.Vector2 = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }
  }
}