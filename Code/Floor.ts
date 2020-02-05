namespace AdLunam {
  import ƒ = FudgeCore;

  export class Floor extends ƒ.Node {
    private static mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
    private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    private static sprites: Sprite[];

    public constructor() {
      super("Floor");
      let nodeSprite: NodeSprite = new NodeSprite("FloorSprite", Floor.sprites[0]);
      nodeSprite.activate(false);
      this.appendChild(nodeSprite);
      this.addComponent(new ƒ.ComponentTransform());
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Floor.mesh);
      cmpMesh.pivot = Floor.pivot;
      this.addComponent(cmpMesh);
      this.show();
    }

    public static generateSprites(_txtImage: fudge.TextureImage): void {
      Floor.sprites = [];
      let sprite: Sprite = new Sprite("FloorSprite");
      sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 156, 72, 61), 1, fudge.Vector2.ZERO(), 72, fudge.ORIGIN2D.TOPCENTER);
      Floor.sprites.push(sprite);
    }

    public show(): void {
      for (let child of this.getChildren())
        child.activate(child.name == "FloorSprite");
    }

    public getRectWorld(): ƒ.Rectangle {
      let rect: ƒ.Rectangle = ƒ.Rectangle.GET(0, 0, 100, 100);
      let topleft: ƒ.Vector3 = new ƒ.Vector3(-0.5, 0.5, 0);
      let bottomright: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.5, 0);
      
      //let pivot: ƒ.Matrix4x4 = this.getComponent(ƒ.ComponentMesh).pivot;
      let mtxResult: ƒ.Matrix4x4 = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: ƒ.Vector2 = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }
  }
}