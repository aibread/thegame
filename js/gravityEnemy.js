class GravityEnemy extends Actor {
    constructor(gameArea, imageFile) {
        super(gameArea, imageFile);
        this.gravity = 0.1;
        this.gravitySpeed = 0;
        this.bounce = 0.9;
        this.speedY = 0;
    }

    newPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitRight();
        this.hitLeft();
    }

    hitBottom() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }

    hitRight() {
        var rightSide = myGameArea.canvas.width - this.width;
        if (this.x > rightSide) {
            this.speedX = -5;
            this.gravitySpeed = -5;
        }
    }

    hitLeft() {
        var leftSide = 0;
        if (this.x < leftSide) {
            this.speedX = 5;
            this.gravitySpeed = -5;
        }
    }
}