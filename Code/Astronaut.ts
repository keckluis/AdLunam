namespace AdLunam {
    import fudge = FudgeCore;
  
    export class Astronaut extends Character {
      public item: ITEM = ITEM.NONE;
      public direction: DIRECTION = DIRECTION.RIGHT;
      public isOnFloor: boolean = false;
      public hitbox: Hitbox;
      public jetpackUsed: boolean = false;
  
      public constructor() {
        super("Astronaut");
        
        for (let sprite of Astronaut.sprites) 
          this.nodeSprites(sprite);
    
        this.hitbox = this.createHitbox("AstronautHitbox", 0.55, new fudge.Vector3(0.35, 0.55, 1));
        this.appendChild(this.hitbox);

        this.speedMax = new fudge.Vector2(2, 4);
        this.show(ACTION.IDLE, this.item);
      }
  
      public static generateSprites(_txtImage: fudge.TextureImage): void {
        Astronaut.sprites = [];

        //WALKING DEFAULT
        let sprite: Sprite = new Sprite(ACTION.WALK + "." + ITEM.NONE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 0, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
        
        //IDLE DEFAULT
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.NONE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //JUMP DEFAULT
        sprite = new Sprite(ACTION.JUMP + "." + ITEM.NONE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //WALKING GUN
        sprite = new Sprite(ACTION.WALK + "." + ITEM.GUN);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 18, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
        
        //IDLE GUN
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.GUN);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //JUMP GUN
        sprite = new Sprite(ACTION.JUMP + "." + ITEM.GUN);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //WALKING SHIELD
        sprite = new Sprite(ACTION.WALK + "." + ITEM.SHIELD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 36, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
        
        //IDLE SHIELD
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.SHIELD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //JUMP SHIELD
        sprite = new Sprite(ACTION.JUMP + "." + ITEM.SHIELD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //WALKING JETPACK
        sprite = new Sprite(ACTION.WALK + "." + ITEM.JETPACK);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 54, 18, 18), 4, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
        
        //IDLE JETPACK
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.JETPACK);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 54, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //JUMP JETPACK
        sprite = new Sprite(ACTION.JUMP + "." + ITEM.JETPACK);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(90, 54, 18, 20), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        //JUMP JETPACK BOOST
        sprite = new Sprite(ACTION.JUMP + "." + ITEM.JETPACK + "BOOST");
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(88, 74, 20, 22), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
      }
  
      public show(_action: ACTION, _item: ITEM): void {
        for (let child of this.getChildren()) {
          if (this.jetpackUsed)
            child.activate(child.name == "Jump.JETPACKBOOST");
          else if (_action == ACTION.WALK && this.jetpackUsed)
            child.activate(child.name == "Jump.JETPACKBOOST");
          else if (_action == ACTION.WALK && !this.isOnFloor)
            child.activate(child.name == "Jump" + "." + _item);
          else
           child.activate(child.name == _action + "." + _item);
        }
      }
  
      public act(_action: ACTION, _direction?: DIRECTION): void {
        let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
        switch (_action) {
          case ACTION.IDLE:
            this.speed.x = 0;
            break;
          case ACTION.WALK:
            astronaut.direction = _direction;
            this.speed.x = this.speedMax.x;
            if (!this.jetpackUsed && !gameOver) 
              this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
            break;
          case ACTION.JUMP:
              if (this.isOnFloor) {
                this.isOnFloor = false;

                this.speed.y = 6;
                if (_direction != null && !gameOver) {
                  this.speed.x = this.speedMax.x;
                  this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                }
              }
              break;
        }
        if (!gameOver)
          this.show(_action, this.item);
      }

      public updateAdditions(): void {
        if (this.speed.y == 0)
          this.isOnFloor = true;
        else
          this.isOnFloor = false;
        
        if (this.isOnFloor && this.jetpackUsed) {
          this.item = ITEM.NONE;
          this.jetpackUsed = false;
        }
      
        this.hitbox.checkCollision();

        if (this.cmpTransform.local.translation.y < -10) {
          this.gravity = fudge.Vector2.Y(0);
          gameOver = true;
        }
      }
    }
  }