namespace AdLunam {
  import fudge = FudgeCore;

  export class Hitbox extends fudge.Node {
    private static mesh: fudge.MeshSprite = new fudge.MeshSprite();
    private static readonly pivot: fudge.Matrix4x4 = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));

    public constructor(_name?: string) {

      if (_name) {
        super(_name);
      } else {
        super("Hitbox");
      }
      this.addComponent(new fudge.ComponentTransform());
      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Hitbox.mesh);
      cmpMesh.pivot = Hitbox.pivot;
      this.addComponent(cmpMesh);
    }

    public getRectWorld(): fudge.Rectangle {
      let rect: fudge.Rectangle = fudge.Rectangle.GET(0, 0, 100, 100);
      let topleft: fudge.Vector3 = new fudge.Vector3(-0.5, 0.5, 0);
      let bottomright: fudge.Vector3 = new fudge.Vector3(0.5, -0.5, 0);
      
      let mtxResult: fudge.Matrix4x4 = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: fudge.Vector2 = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }

    public checkCollision(_isBullet?: boolean): boolean {
      for (let platform of level.getChildren()) {
        for (let child of platform.getChildren()) {
          if (child.name == "Item") {
            let hitbox: Hitbox = (<Item>child).hitbox;
            if (this.detectHit(hitbox)) {
              console.log("HIT ITEM");
              if (astronaut.item == ITEM.NONE && !_isBullet) {
                astronaut.item = (<Item>child).type;
                Sound.play("item_pickup");
                (<Item>child).cmpTransform.local.translateY(100);
              }
            } 
          } else if (child.name == "Alien") {
            let hitbox: Hitbox = (<Alien>child).hitbox;
            if (this.detectHit(hitbox)) {
              console.log("HIT ALIEN");
              if (astronaut.item == ITEM.SHIELD || _isBullet) {
                astronaut.item = ITEM.NONE;
                (<Alien>child).cmpTransform.local.translateY(100);
                (<Alien>child).gravity = fudge.Vector2.Y(0);
                Sound.play("alien_death");
                fudge.Loop.removeEventListener(fudge.EVENT.LOOP_FRAME, (<Alien>child).update);
                return true;
              } else { 
                gameOver = true;
              } 
            } 
          } else {
            continue;
          }
        }
      }
      return false;
    }

    private detectHit(hitbox: Hitbox): boolean {
      let hit: boolean = false;
      let rectOfThis: fudge.Rectangle = (<Hitbox>this).getRectWorld();
      let rectOfThat: fudge.Rectangle = hitbox.getRectWorld();
      let expansionRight: fudge.Vector2 = new fudge.Vector2(rectOfThat.size.x);
      let expansionDown: fudge.Vector2 = new fudge.Vector2(0 , rectOfThat.size.y);
      let topRight: fudge.Vector2 = fudge.Vector2.SUM(rectOfThat.position, expansionRight);
      let bottomLeft: fudge.Vector2 = fudge.Vector2.SUM(rectOfThat.position, expansionDown);
      let bottomRight: fudge.Vector2 = fudge.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);

      if (rectOfThis.isInside(rectOfThat.position)) {
        hit = true;
      } else if (rectOfThis.isInside(topRight)) {
        hit = true;
      } else if (rectOfThis.isInside(bottomLeft)) {
        hit = true;
      } else if (rectOfThis.isInside(bottomRight)) {
        hit = true;
      }
      return hit;
    }
  }
}