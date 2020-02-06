namespace AdLunam {
  import fudge = FudgeCore;

  export class SpriteFrame {
    rectTexture: fudge.Rectangle;
    pivot: fudge.Matrix4x4;
    material: fudge.Material;
    timeScale: number;
  }

  export class Sprite {
    private static mesh: fudge.MeshSprite = new fudge.MeshSprite();
    public frames: SpriteFrame[] = [];
    public name: string;

    constructor(_name: string) {
      this.name = _name;
    }

    public static getMesh(): fudge.MeshSprite {
      return Sprite.mesh;
    }

    /**
     * Creates a series of frames for this [[Sprite]] resulting in pivot matrices and materials to use on a sprite node
     * @param _texture The spritesheet
     * @param _rects A series of rectangles in pixel coordinates defining the single sprites on the sheet
     * @param _resolutionQuad The desired number of pixels within a length of 1 of the sprite quad
     * @param _origin The location of the origin of the sprite quad
     */
    public generate(_texture: fudge.TextureImage, _rects: fudge.Rectangle[], _resolutionQuad: number, _origin: fudge.ORIGIN2D): void {
      this.frames = [];
      let framing: fudge.FramingScaled = new fudge.FramingScaled();
      framing.setScale(1 / _texture.image.width, 1 / _texture.image.height);

      let count: number = 0;
      for (let rect of _rects) {
        let frame: SpriteFrame = this.createFrame(this.name + `${count}`, _texture, framing, rect, _resolutionQuad, _origin);
        frame.timeScale = 1;
        this.frames.push(frame);

        // fudge.Debug.log(frame.rectTexture.toString());
        // fudge.Debug.log(frame.pivot.toString());
        // fudge.Debug.log(frame.material);

        count++;
      }
    }

    public generateByGrid(_texture: fudge.TextureImage, _startRect: fudge.Rectangle, _frames: number, _borderSize: fudge.Vector2, _resolutionQuad: number, _origin: fudge.ORIGIN2D): void {
      let rect: fudge.Rectangle = _startRect.copy;
      let rects: fudge.Rectangle[] = [];
      while (_frames--) {
        rects.push(rect.copy);
        rect.position.x += _startRect.size.x + _borderSize.x;

        if (rect.right < _texture.image.width)
          continue;

        _startRect.position.y += _startRect.size.y + _borderSize.y;
        rect = _startRect.copy;
        if (rect.bottom > _texture.image.height)
          break;
      }

      rects.forEach((_rect: fudge.Rectangle) => fudge.Debug.log(_rect.toString()));
      this.generate(_texture, rects, _resolutionQuad, _origin);
    }

    private createFrame(_name: string, _texture: fudge.TextureImage, _framing: fudge.FramingScaled, _rect: fudge.Rectangle, _resolutionQuad: number, _origin: fudge.ORIGIN2D): SpriteFrame {
      let rectTexture: fudge.Rectangle = new fudge.Rectangle(0, 0, _texture.image.width, _texture.image.height);
      let frame: SpriteFrame = new SpriteFrame();

      frame.rectTexture = _framing.getRect(_rect);
      frame.rectTexture.position = _framing.getPoint(_rect.position, rectTexture);

      let rectQuad: fudge.Rectangle = new fudge.Rectangle(0, 0, _rect.width / _resolutionQuad, _rect.height / _resolutionQuad, _origin);
      frame.pivot = fudge.Matrix4x4.IDENTITY;
      frame.pivot.translate(new fudge.Vector3(rectQuad.position.x + rectQuad.size.x / 2, -rectQuad.position.y - rectQuad.size.y / 2, 0));
      frame.pivot.scaleX(rectQuad.size.x);
      frame.pivot.scaleY(rectQuad.size.y);
      // fudge.Debug.log(rectQuad.toString());

      let coat: fudge.CoatTextured = new fudge.CoatTextured();
      coat.pivot.translate(frame.rectTexture.position);
      coat.pivot.scale(frame.rectTexture.size);
      coat.name = _name;
      coat.texture = _texture;

      frame.material = new fudge.Material(_name, fudge.ShaderTexture, coat);
      // fudge.Debug.log(coat.pivot.toString());  

      return frame;
    }
  }

  export class NodeSprite extends fudge.Node {
    private cmpMesh: fudge.ComponentMesh;
    private cmpMaterial: fudge.ComponentMaterial;
    private sprite: Sprite;
    private frameCurrent: number = 0;
    private direction: number = 1;

    constructor(_name: string, _sprite: Sprite) {
      super(_name);
      this.sprite = _sprite;

      this.cmpMesh = new fudge.ComponentMesh(Sprite.getMesh());
      this.cmpMaterial = new fudge.ComponentMaterial();
      this.addComponent(this.cmpMesh);
      this.addComponent(this.cmpMaterial);

      this.showFrame(this.frameCurrent);

      fudge.Debug.info("NodeSprite constructor", this);
    }

    public showFrame(_index: number): void {
      let spriteFrame: SpriteFrame = this.sprite.frames[_index];
      this.cmpMesh.pivot = spriteFrame.pivot;
      this.cmpMaterial.material = spriteFrame.material;
      fudge.RenderManager.updateNode(this);
      this.frameCurrent = _index;
    }

    public showFrameNext(): void {
      this.frameCurrent = (this.frameCurrent + this.direction + this.sprite.frames.length) % this.sprite.frames.length;
      this.showFrame(this.frameCurrent);
    }

    public setFrameDirection(_direction: number): void {
      this.direction = Math.floor(_direction);
    }
  }
}