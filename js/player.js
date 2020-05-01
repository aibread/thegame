class Player extends Actor {
	    constructor(gameArea, imageFile) {
        super(gameArea, imageFile);
        this.bulletsCount = 0;
        this.maxBulletCount = 50;
		this.bullets = [];
		this.maxLives = 3;
		this.livesLeft = this.maxLives;
    }
	
    newPos() {
        super.newPos();
		this.speedX = 0;
		this.speedY = 0;
    }
	
	 shoot() {
        if (this.bulletsCount < this.maxBulletCount) {
            var bulletObject = new Bullet(this.myGameArea, "image/bullet.png", this.x + this.width/2, this.y + this.height/2);
            this.bullets.push(bulletObject);
            this.bulletsCount++;
            //shotSound.play();
        }
    }
}