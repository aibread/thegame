var player;
var enemies;
var kick;
var myMusic;
var crashSound;
var shotSound;
var background;
let scoreNum = 0;

function startGame() {
    myGameArea.start();

    kick = new sound("audio/bounce.mp3");
    crashSound = new sound("audio/crash.mp3");    
    shotSound = new sound("audio/gunshot.mp3");

    enemies = [2];
    enemies[0] = new GravityEnemy(this.myGameArea, "image/trump3.png");
    //enemies[1] = new MoleculaEnemy(this.myGameArea, "image/submarine3.png");
    //enemies[0] = new enemy(30, 30, "red", 300, 120, "monster0.png");
    //enemies[1] = new enemy(30, 30, "green", 120, 300, "monster1.png");
    //enemies[2] = new enemy(30, 30, "blue", 300, 300, "monster2.png");
    //enemies[3] = new enemy(30, 30, "red", 30, 120, "monster3.png");
    //enemies[4] = new enemy(30, 30, "green", 10, 300, "pugash.png");
    //enemies[5] = new enemy(30, 30, "blue", 1, 10, "shark.png");
    //enemies[6] = new GravityEnemy(this.myGameArea, "trump3.png");
    //enemies[6] = new GravityEnemy(this.myGameArea, "plane.png");
    //enemies[6] = new enemy(100, 100, "blue", 500, 250, "trump3.png");

    player = new Player(this.myGameArea, "image/submarine3.png")
    //player = new component(50, 50, "gray", 10, 120, "player.png");
    //player = new component(50, 50, "gray", 10, 120, "player.png");
    myBackground = new component(1000, 500, "gray", 0, 0, "image/background.jpg");
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop: function () {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, imageFile = "") {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.bullets = [];
    this.protectiveFieldIsOn = false;
    this.bulletsCount = 0;
    this.maxBulletCount = 21;
    this.b = true;

    if (imageFile != "") {
        this.image = new Image();
        this.image.src = imageFile;
        //this.image.style.backgroundPosition = `-256px 0px`; 
    }

    this.speedX = 0;
    this.speedY = 0;

    this.delay = 10;
    this.delayCount = 0;

    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;

        // x, y,
        //           this.size[0], this.size[1],
        //           0, 0,
        //           this.size[0], this.size[1]);
        if (imageFile == "image/background.jpg") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);

        } else
            if (imageFile != "") {
                if (this.b == 0) {
                    ctx.drawImage(this.image, 0, 0, 256, 256, this.x, this.y, this.width, this.height);
                }
                if (this.b == 1) {
                    ctx.drawImage(this.image, 256, 0, 256, 256, this.x, this.y, this.width, this.height);
                }

                if (this.b == 2) {
                    ctx.drawImage(this.image, 512, 0, 256, 256, this.x, this.y, this.width, this.height);
                }


                if (this.b == 3) {
                    ctx.drawImage(this.image, 1024, 0, 256, 256, this.x, this.y, this.width, this.height);
                }

                if (this.delayCount >= this.delay) {
                    this.b++;
                    this.delayCount = 0;
                    if (this.b == 4) {
                        this.b = 0;
                    }
                }
                else {
                    this.delayCount++;
                }

            } else {
                ctx.fillStyle = color;
                var radius = 10;

                if (this.protectiveFieldIsOn) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, radius * 3, 0, 2 * Math.PI, false);
                    ctx.fillStyle = "yellow";
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#FFFFFF';
                ctx.stroke();
            }

        this.bullets.forEach(function (item, i, enemies) {
            item.update();
        });
    }

    this.shoot = function () {
        if (this.bulletsCount < this.maxBulletCount) {
            var bulletObject = new bullet(this.x + this.width, this.y + this.height / 2);
            this.bullets.push(bulletObject);
            this.bulletsCount++;
            shotSound.play();
        }
    }

    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;

        this.bullets.forEach(function (item, i, bullets) {
            item.move();
        });
    }

    this.crashWith = function (otherobj) {
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
}

function enemy(width, height, color, x, y, imageFile) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;

    this.speedX = 1;
    this.speedY = 1;

    if (imageFile != "") {
        this.image = new Image();
        this.image.src = imageFile;
    }

    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;

        if (imageFile != "") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            var radius = 10;

            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FFFFFF';
            ctx.stroke();
        }
    }

    this.newPos = function () {
        if (this.gamearea.canvas.height < this.y || this.y < 0) {
            this.speedY = -this.speedY;
            kick.play();
        }

        if (this.gamearea.canvas.width < this.x || this.x < 0) {
            this.speedX = -this.speedX;
            kick.play();
        }

        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function bullet(x, y) {
    this.gamearea = myGameArea;
    this.width = 1;
    this.height = 1;

    this.speedX = 1;
    //this.speedY = 1;    


    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        var radius = 3;

        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }

    this.move = function () {
        this.x += this.speedX;
        //this.y += this.speedY;        
    }
}

function updateGameArea() {


    // if (player.bulletsCount >= this.player.maxBulletCount) {
    //     myBackground.image.src = "theend.jpg";
    //     enemies = [];
    // }

    // if (enemies == 0) {
    //     myBackground.image.src = "win.jpg";
    // }

	
	
    for (let i = 0; i < player.bullets.length; i++) {

         if (player.bullets[i].x > myGameArea.canvas.width - player.bullets[i].width || player.bullets[i].x < 0) {
             player.bullets.splice(i, 1);
         }

         for (let j = 0; j < enemies.length; j++) {
             if (Collides(player.bullets[i], enemies[j])) {
                 player.bullets.splice(i, 1);
                 enemies.splice(j, 1);
                 scoreNum += 1;
                 crashSound.play();
             }
         }
     }

    myGameArea.clear();	

    myBackground.update();
    //drawScore();
	
	
	this.player.bullets.forEach(function (item, i, enemies) {
			item.move();
            item.update();
        });

    enemies.forEach(function (item, i, enemies) {
        item.newPos();
        item.update();
    });

    //player.speedX = 0;
    //player.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) { player.speedX = -2; }
    if (myGameArea.keys && myGameArea.keys[39]) { player.speedX = 2; }
    if (myGameArea.keys && myGameArea.keys[38]) { player.speedY = -2; }
    if (myGameArea.keys && myGameArea.keys[40]) { player.speedY = 2; }
    // if (myGameArea.keys && myGameArea.keys[32]) {
    //     player.shoot();
    // }
    // if (myGameArea.keys && myGameArea.keys[80]) { player.protectiveFieldIsOn = !player.protectiveFieldIsOn; }
    player.newPos();
    player.update();

    //myBackground.newPos();

}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function Collides(spriteOne, spriteTwo) {
    if (spriteOne.x > spriteTwo.x && spriteOne.x < spriteTwo.x + spriteTwo.width &&
        spriteOne.y > spriteTwo.y && spriteOne.y < spriteTwo.y + spriteTwo.height) {
        return true;
    }
}

function drawScore() {
    let scoreText = document.getElementById('score').innerHTML = scoreNum + " Монстров подбито";
    let left = this.player.maxBulletCount - this.player.bulletsCount;
    let bulletsLeft = document.getElementById('bullets').innerHTML = " У вас осталось " + left + " пулек";
}

window.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 32:
            if (player.canShoot) {
                player.shoot();
                player.canShoot = false;
            }
            break;
    }
});

window.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 32:
            player.canShoot = true;
            break;
    }
});

