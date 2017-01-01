// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -50;
    var positions = [60, 145, 230];
    var position = positions[Math.floor(Math.random() * positions.length)];
    this.speed = Math.random() * 350 + 50;
    this.y = (position);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;
    if (this.x > 505) {
        this.reset();
    }
    if (((player.x - this.x) < 80) && ((player.x - this.x) > -45) && ((player.y - this.y) < 80) && (player.y - this.y) > 0) {
        player.reset();
        misses++;
        setMisses(misses);
    }
};

// resets the state of enemies as it should be at the start of game i.e. moving state, crossing the road.

Enemy.prototype.reset = function() {
    this.x = -100;
    var positions = [60, 145, 230];
    var position = positions[Math.floor(Math.random() * positions.length)];
    this.speed = Math.random() * 350 + 100;
    this.y = (position);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.reset();
};

// Score counts the number of times Player crosses the road and reaches the water
// Misses counts the number of times Player got hit by enemy(bugs).

var score = 0;
var misses = 0;

    var win = "You WIN!";
    var draw = "ITS A DRAW!";
    var lose = "You LOSE!";
Player.prototype = {

    // Handles keyboard inout for player

    "handleInput": function(keycode) {
        if (clock.textContent != win && clock.textContent != draw && clock.textContent != lose) {
            if (keycode == "left") {
                if (this.x > 0)
                    this.x -= 101;
            }
            if (keycode == "right") {
                if (this.x < 404)
                    this.x += 101;
            }
            if (keycode == "down") {
                if (this.y < 404)
                    this.y += 81;
            }
            if (keycode == "up") {
                if (this.y > 0)
                    this.y -= 81;
            }
        }
    },

    
    // Updates clock, score, misses and start/restart button

    "update": function() {
        if (this.y < 0) {
            this.reset();
            score++;
            setScore(score);
        }
        if (clock.textContent == "00") {
            if (score >= 7 && score > misses) {
                clock.textContent = win;
                clock.style.color = "green";
            } else if (score < 7 || score < misses) {
                clock.textContent = lose;
                clock.style.color = "red";
            } else {
                clock.textContent = draw;
                clock.style.color = "#ffa500";
            }
            allEnemies.forEach(function(enemy) {
                enemy.speed = 0;
            });
            var tempScore = score;
            var tempMisses = misses;
            setScore(tempScore);
            setMisses(tempMisses);
            button.textContent = "Restart";
            button.style.display = "block";
            button.style.margin = "0 auto";
        }
    },

    // renders player on the screen

    "render": function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },

    // resets the character to a default position and randoms the character icon.

    "reset": function() {
        this.x = 202;
        this.y = 404;
        var sprites = ["char-boy", "char-cat-girl", "char-horn-girl", "char-pink-girl", "char-princess-girl"];
        var randomSprite = Math.floor(Math.random() * sprites.length);
        this.sprite = "images/" + sprites[randomSprite] + ".png";
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

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


// This function changes the Timer Clock.

var clock = document.querySelector('date');

function startTimer(time, display) {
    function timer() {
        time--;
        time = time < 10 ? "0" + time : time;
        display.textContent = time;
        if (time <= 10) {
            clock.style.color = "#ffa500";
        }
        if (time <= 5) {
            clock.style.color = "red";
        }
        if (time == 0) {
            clearInterval(interval);
        }
    }

    var interval = setInterval(timer, 1000);

}


var button = document.querySelector('button');
var p = document.querySelector('p');

// Freezes the movements of bugs when the window is loaded

window.onload = function() {
    button.style.display = "block";
    button.style.margin = "0 auto";
    p.style.display = "none";
    allEnemies.forEach(function(enemy) {
        enemy.speed = 0;
    });
};


// "time" is value of countdown timer

var time = 30;
button.onclick = function() {
    var display = document.querySelector('#time');
    startTimer(time, display);
    score = 0;
    setScore(score);
    misses = 0;
    setMisses(misses);
    button.style.display = "none";
    p.style.display = "block";
    clock.textContent = time;
    clock.style.color = "green";
    allEnemies.forEach(function(enemy) {
        enemy.reset();
    });
    player.reset();
};

//Sets the Score

function setScore(score) {
    document.querySelector('p span:first-child').textContent = "Score = " + score;
}

//Sets the Misses

function setMisses(misses) {
    document.querySelector('p span:last-child').textContent = "Misses = " + misses;
}