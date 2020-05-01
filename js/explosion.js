class Explosion extends Actor {
    constructor(gameArea, imageFile, x, y) {
         super(gameArea, imageFile);
         this.spriteItemWidth = 128;
		 this.spriteColumns = 5;
		 this.spriteRows = 4;
		 this.x = x;
		 this.y = y;
		 this.comlplete = false;
	}
	
	update() {
        ctx = myGameArea.context;

        if (this.imageFile != "") {		
			let xIndex = this.spriteIndex - super.div(this.spriteIndex, this.spriteColumns)	* this.spriteColumns;	
            let xShift = xIndex * this.spriteItemWidth;
			let yShift = super.div(this.spriteIndex, this.spriteColumns) * this.spriteItemWidth;

            ctx.drawImage(this.image, xShift, yShift, this.spriteItemWidth, this.spriteItemWidth, this.x, this.y, this.width, this.height);

            if (this.delayCount >= this.delay) {
                this.spriteIndex++;
                this.delayCount = 0;
                if (this.spriteIndex == (this.spriteColumns*this.spriteRows)) {
                    this.spriteIndex = 0;
					this.complete = true;
                }
            }
            else {
                this.delayCount++;
            }
        }
    }

}