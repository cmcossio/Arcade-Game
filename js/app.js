const Enemy = function(xAxis, yAxis, speed) {   //Enemy object with a vertical/horizontal position and speed properties
    this.sprite = "images/enemy-bug.png";
    this.x = xAxis;
    this.y = yAxis;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;      //enemies moving horizontally across at random speeds
    if (this.x > 500) {             //if off-canvas, appear on left side again
        this.x = -100;
        this.speed = 75 + Math.floor(Math.random() * 20 * 30 + 10 * 2); //randomize speed of enemies
    }
    if (player.x < this.x + 70 &&       //collision logic; enemy returns to off-screen position;
        player.x > this.x - 70 &&       //playerHit function reduces one life and score by 50 points
        player.y < this.y + 60 &&
        player.y > this.y - 60) {
            this.x = -100;
            playerHit();
        }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function () {                //Player object with fixed starting position
    this.sprite = "images/char-boy.png";
    this.reset();
}

Player.prototype.reset = function () {
    this.x = 202;
    this.y = 405;
}

Player.prototype.update = function () {
    if (this.y < 0) {                               //player reaches upper limit (water) run add score function 
        addScore();
        player.reset();                               //which includes resetting to starting position
}  
}

Player.prototype.render = function () {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (key) {     //when key inputs are pressed, player moves specified distance
    if (key == "left" && this.x > 100) {            //while respecting borders and not going off screen
        this.x -= 100;
    }
    if (key == "right" && this.x < 305) {
        this.x += 100;
    }
    if (key == "up" && this.y > 0) {
        this.y -= 83;
    }
    if (key == "down" && this.y < 405) {
        this.y += 83
    }
}

// Now instantiate your objects.
const allEnemies = [];
const enemyPosition = [60, 145, 227];               //fixed enemy y positions

enemyPosition.forEach(function (yAxis) {            //assign values to yAxis parameter 
    enemy = new Enemy(0, yAxis, 500);               //create three enemy objects, with fixed x and start speed of 500
    allEnemies.push(enemy);                         // Place all enemy objects in an array called allEnemies
});

const player = new Player();                        // Place the player object in a variable called player


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//define action when player reaches water
function addScore() {
    score += 500;
    document.getElementById("score").innerHTML = score;
}

//define action when player hits enemy
function playerHit() {
    player.reset();
    if (score > 0) {
        score -= 50;
        document.getElementById("score").innerHTML = score;
        }
    if (lives > 0) {
        lives -= 1;
        document.getElementById("lives").innerHTML = lives;
    }
    if (lives === 0) {
        (function popUp() {
            let box = document.querySelector("#pop-up");
            box.showModal();
        })();
    }
}


let score = 0;
let lives = 5;

//button on pop-up with event listener to reset game
const playAgain = document.querySelector(".btn-restart");

playAgain.addEventListener("click", function() {
    score = 0;
    lives = 5;
    document.getElementById("score").innerHTML = score;
    document.getElementById("lives").innerHTML = lives;
    (function closePopUp() {
        document.querySelector("#pop-up").close();
    })();
})
