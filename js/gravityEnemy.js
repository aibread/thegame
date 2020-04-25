class GravityEnemy extends Actor {
    constructor(gameArea, imageFile) {
        super(gameArea, imageFile);
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.speedY = 0;
		this.x = 500;
		this.y = 0;
		this.gone = false;
    }

    newPos() {
        this.gravitySpeed += this.gravity;
        this.y += this.speedY + this.gravitySpeed;
		this.hitBottom();
    }

	hitBottom() {
        var rockbottom = myGameArea.canvas.height;
		
        if (this.y > rockbottom && !this.gone) {
			this.gone = true;
			setTimeout(() => { 
				this.y = rockbottom;
				this.gravitySpeed = 0;
				this.y = 0;
				this.gone = false;
			}, 3000);            
        }
    }
}