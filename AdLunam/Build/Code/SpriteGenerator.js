"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class SpriteFrame {
    }
    AdLunam.SpriteFrame = SpriteFrame;
    class Sprite {
        constructor(_name) {
            this.frames = [];
            this.name = _name;
        }
        static getMesh() {
            return Sprite.mesh;
        }
        /**
         * Creates a series of frames for this [[Sprite]] resulting in pivot matrices and materials to use on a sprite node
         * @param _texture The spritesheet
         * @param _rects A series of rectangles in pixel coordinates defining the single sprites on the sheet
         * @param _resolutionQuad The desired number of pixels within a length of 1 of the sprite quad
         * @param _origin The location of the origin of the sprite quad
         */
        generate(_texture, _rects, _resolutionQuad, _origin) {
            this.frames = [];
            let framing = new fudge.FramingScaled();
            framing.setScale(1 / _texture.image.width, 1 / _texture.image.height);
            let count = 0;
            for (let rect of _rects) {
                let frame = this.createFrame(this.name + `${count}`, _texture, framing, rect, _resolutionQuad, _origin);
                frame.timeScale = 1;
                this.frames.push(frame);
                count++;
            }
        }
        generateByGrid(_texture, _startRect, _frames, _borderSize, _resolutionQuad, _origin) {
            let rect = _startRect.copy;
            let rects = [];
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
            this.generate(_texture, rects, _resolutionQuad, _origin);
        }
        createFrame(_name, _texture, _framing, _rect, _resolutionQuad, _origin) {
            let rectTexture = new fudge.Rectangle(0, 0, _texture.image.width, _texture.image.height);
            let frame = new SpriteFrame();
            frame.rectTexture = _framing.getRect(_rect);
            frame.rectTexture.position = _framing.getPoint(_rect.position, rectTexture);
            let rectQuad = new fudge.Rectangle(0, 0, _rect.width / _resolutionQuad, _rect.height / _resolutionQuad, _origin);
            frame.pivot = fudge.Matrix4x4.IDENTITY;
            frame.pivot.translate(new fudge.Vector3(rectQuad.position.x + rectQuad.size.x / 2, -rectQuad.position.y - rectQuad.size.y / 2, 0));
            frame.pivot.scaleX(rectQuad.size.x);
            frame.pivot.scaleY(rectQuad.size.y);
            let coat = new fudge.CoatTextured();
            coat.pivot.translate(frame.rectTexture.position);
            coat.pivot.scale(frame.rectTexture.size);
            coat.name = _name;
            coat.texture = _texture;
            frame.material = new fudge.Material(_name, fudge.ShaderTexture, coat);
            return frame;
        }
    }
    Sprite.mesh = new fudge.MeshSprite();
    AdLunam.Sprite = Sprite;
    class NodeSprite extends fudge.Node {
        constructor(_name, _sprite) {
            super(_name);
            this.frameCurrent = 0;
            this.direction = 1;
            this.sprite = _sprite;
            this.cmpMesh = new fudge.ComponentMesh(Sprite.getMesh());
            this.cmpMaterial = new fudge.ComponentMaterial();
            this.addComponent(this.cmpMesh);
            this.addComponent(this.cmpMaterial);
            this.showFrame(this.frameCurrent);
        }
        showFrame(_index) {
            let spriteFrame = this.sprite.frames[_index];
            this.cmpMesh.pivot = spriteFrame.pivot;
            this.cmpMaterial.material = spriteFrame.material;
            fudge.RenderManager.updateNode(this);
            this.frameCurrent = _index;
        }
        showFrameNext() {
            this.frameCurrent = (this.frameCurrent + this.direction + this.sprite.frames.length) % this.sprite.frames.length;
            this.showFrame(this.frameCurrent);
        }
        setFrameDirection(_direction) {
            this.direction = Math.floor(_direction);
        }
    }
    AdLunam.NodeSprite = NodeSprite;
    class SpriteGenerator {
        static generateSprites(_txtImage) {
            AdLunam.Astronaut.sprites = [];
            AdLunam.Alien.sprites = [];
            AdLunam.Item.sprites = [];
            AdLunam.Bullet.sprites = [];
            let sprite;
            let i = 0;
            while (SpriteGenerator.data[i] != null) {
                sprite = new Sprite(this.data[i].name);
                sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(this.data[i].x, this.data[i].y, this.data[i].sizeX, this.data[i].sizeY), this.data[i].frames, fudge.Vector2.ZERO(), this.data[i].scale, fudge.ORIGIN2D.BOTTOMCENTER);
                switch (this.data[i].type) {
                    case "Astronaut":
                        AdLunam.Astronaut.sprites.push(sprite);
                        break;
                    case "Alien":
                        AdLunam.Alien.sprites.push(sprite);
                        break;
                    case "Item":
                        AdLunam.Item.sprites.push(sprite);
                        break;
                    case "Bullet":
                        AdLunam.Bullet.sprites.push(sprite);
                        break;
                    default:
                        console.log("Type does not exist.");
                        break;
                }
                i++;
            }
        }
    }
    AdLunam.SpriteGenerator = SpriteGenerator;
    async function generateSprites(_txtImage) {
        let response = await fetch("../Resources/SpriteSheets/SpriteData.json");
        let offer = await response.text();
        let data = JSON.parse(offer);
        SpriteGenerator.data = data;
        SpriteGenerator.generateSprites(_txtImage);
        for (let sprite of AdLunam.Astronaut.sprites)
            AdLunam.astronaut.nodeSprites(sprite);
        AdLunam.astronaut.show(AdLunam.ACTION.IDLE, AdLunam.astronaut.item);
    }
    AdLunam.generateSprites = generateSprites;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=SpriteGenerator.js.map