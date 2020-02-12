namespace AdLunam {
    import fudge = FudgeCore;
  
    export class Astronaut extends Character {
      public item: ITEM = ITEM.NONE;
      public direction: DIRECTION = DIRECTION.RIGHT;
      public isOnFloor: boolean = false;
      public jetpackUsed: boolean = false;
  
      public constructor() {
        super("Astronaut");
      
        this.hitbox = this.createHitbox("AstronautHitbox", 0.55, new fudge.Vector3(0.35, 0.55, 1));
        this.appendChild(this.hitbox);

        this.speedMax = new fudge.Vector2(2, 4);
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
  
      public act(_action: ACTION, _direction?: DIRECTION, _noJumpSound?: boolean): void {
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
                
                if (!_noJumpSound)
                  Sound.play("jump");
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