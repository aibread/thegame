class MoleculaEnemy extends Actor {
	constructor(gameArea, imageFile) {
        super(gameArea, imageFile);        
		this.x = super.randomInteger(0, 500);
		this.y = super.randomInteger(0, 500)
    }
	
    newPos() {
        if (this.gameArea.canvas.height < this.y || this.y < 0) {
            this.speedY = -this.speedY;            
        }

        if (this.gameArea.canvas.width < this.x || this.x < 0) {
            this.speedX = -this.speedX;            
        }

        this.x += this.speedX;
        this.y += this.speedY;
    }
}