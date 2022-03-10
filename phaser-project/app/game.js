const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 850,
    parent: "game",
    backgroundColor: "black",
    scene: {
        preload,
        create,
        update
    }
};

const state = {};
const gameStartTime = Date.now();

function preload() {
    this.load.image("player", "assets/space-ship.png");
    this.load.image("enemy", "assets/enemy.png");
    state.enemies = [];
}

function create() {
    state.player = this.add.image(200, 800, "player");
    
    for (let i = 0; i < 3; i++) {
        state.enemies.push(this.add.image(Math.floor(Math.random() * 368), Math.floor(Math.random() * 300 + 16), "enemy"));
        state.enemies[i].speedOffset = Math.random();
        state.enemies[i].direction = Math.random() >= 0.50 ? -1 : 1;
    }

}

function update() {

    state.enemies.forEach(enemy => {
        // Invert enemy direction when they hit the wall.
        if (enemy.x > config.width - 16 || enemy.x < 0 + 16) {
            enemy.direction *= -1;
        }
        enemy.x += enemy.speedOffset * enemy.direction;
    });

}

/**
 * Gets time since game started in milliseconds.
 */
function getTime() {
    return Date.now() - gameStartTime;
}

/**
 * Gets random number in range.
 */
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

const game = new Phaser.Game(config);