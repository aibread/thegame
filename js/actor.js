class Actor {

    constructor(gameArea, imageFile) {
        this.gameArea = gameArea;
        this.width = 100;
        this.height = 100;
        this.imageFile = imageFile;
        this.spriteIndex = 0;
        this.spriteItemWidth = 256;
        this.delay = 10;
        this.delayCount = 0;
        this.speedX = 1;
        this.speedY = 1;
        this.x = this.getRandomInt(this.width);
        this.y = this.getRandomInt(this.height);

        if (imageFile != "") {
            this.image = new Image();
            this.image.src = imageFile;
        }
    }

    update() {
        ctx = myGameArea.context;

        if (this.imageFile != "") {
            let shift = this.spriteIndex * this.spriteItemWidth;

            ctx.drawImage(this.image, shift, 0, 256, 256, this.x, this.y, this.width, this.height);

            if (this.delayCount >= this.delay) {
                this.spriteIndex++;
                this.delayCount = 0;
                if (this.spriteIndex == 4) {
                    this.spriteIndex = 0;
                }
            }
            else {
                this.delayCount++;
            }
        }
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    crashWith(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
	
	randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	}
	
	div(val, by){
		return (val - val % by) / by;
	}

}