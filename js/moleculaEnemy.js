class MoleculaEnemy extends Actor {
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