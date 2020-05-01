class Bullet extends Actor {
	    constructor(gameArea, imageFile, x, y) {
        super(gameArea, imageFile);
        this.bulletsCount = 0;
        this.maxBulletCount = 50;
		this.bullets = [];
		this.maxLives = 3;
		this.livesLeft = this.maxLives;
		this.speedX = 2;
		this.speedY = 0;
		this.x = x;
		this.y = y;
		this.height = 50;
		this.width = 50;
    }    
}