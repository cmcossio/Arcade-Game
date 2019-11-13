const Enemy = function(xAxis, yAxis, speed) {
    this.sprite = "images/enemy-bug.png";
    this.x = xAxis;
    this.y = yAxis;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;      //enemies moving horizontally across at random speeds
    if (this.x > 500) {             //if off-canvas, appear on left side again
        this.x = -100;
        this.speed = 75 + Math.floor(Math.random() * 20 * 30 + 10 * 2);
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function () {
    this.sprite = "images/char-boy.png";
    this.x = 202;
    this.y = 405;
}

Player.prototype.update = function (dt) {
    
}

Player.prototype.render = function () {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (key) {
    if (key == "left" && this.x > 100) {
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
    if (this.y < 0) {
        setTimeout (function () {
            player.x = 202;
            player.y = 405;
        }, 300);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const enemyPosition = [60, 145, 227];

enemyPosition.forEach(function (yAxis) {
    enemy = new Enemy(0, yAxis, 500);
    allEnemies.push(enemy);
});

const player = new Player(); 


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
