class SceneOne extends Phaser.Scene {

    playerShootCooldown = 1 * 1000;

    maxEnemies = 16;
    enemyShootCooldown = 6 * 1000;

    constructor() {
        super("SceneOne");
    }

    // Create game objects.
    create() {

        // Timestamp when scene was created.
        this.gameStartTime = Date.now();

        this.levelText = this.add.text(20, 20, "Level One")

        // Create player object.
        this.player = this.physics.add.image(config.width / 2, config.height - 32, "player");
        this.player.setCollideWorldBounds(true);
        this.player.alive = true;

        // Sound effects.
        this.deathSound = this.sound.add("death");
        this.pew = this.sound.add("pew");
        this.pop = this.sound.add("pop");
        this.guh = this.sound.add("guh");

        // Create group to handle enemies.
        this.enemies = this.physics.add.group();

        // Frag counter
        this.frags = 0;
        this.fragsText = this.add.text(20, 40, "Frags: 0");

        // Register collision checking between player and enemies.
        this.physics.add.overlap(this.player, this.enemies, this.enemyCollision, null, this);

        // Keyboard input.
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    // Runs once per frame.
    update() {
        this.playerControl();
        this.enemyHandle();
    }

    // Controls the player object.
    playerControl() {
        if (!this.player.alive) return;
        if (this.cursors.down.isDown) this.player.y += 2;
        if (this.cursors.up.isDown) this.player.y -= 2;
        if (this.cursors.left.isDown) this.player.x -= 2;
        if (this.cursors.right.isDown) this.player.x += 2;
        if (this.cursors.space.isDown) this.playerShoot();
    }

    // Fires a laser straight up.
    timeSinceLastLaser = 0;
    playerShoot() {
        if (this.timeSinceLastLaser + this.playerShootCooldown > this.deltaTime()) return;
        console.log("Player fired a laser!");
        this.pew.play();
        const laser = this.physics.add.image(this.player.x, this.player.y, "laser");
        this.physics.add.overlap(this.enemies, laser, this.playerShotEnemy, null, this);
        this.physics.world.enableBody(laser);
        laser.body.velocity.y -= 200;
        this.timeSinceLastLaser = this.deltaTime();
    }

    // Handles player projectile and enemy collision.
    playerShotEnemy(enemy, laser) {
        this.pop.play();
        this.frags++;
        this.fragsText.text = `Frags: ${ this.frags }`;
        enemy.destroy();
        laser.destroy();
    }

    // Handles player death.
    playerDeath() {
        console.log("Player died!");
        this.deathSound.play();
        this.player.destroy();
        this.player.alive = false;
        this.add.text(20, config.height / 2, "YOU LOSE! Refresh to go again.", {
            fill: "red",
            font: "20px"
        });
    }

    // Uses pythagoras theorem and trigonometry to calculate bullet travel.
    async enemyCalculateShoot({ a, b }, { x, y }) {

        const promise = new Promise((resolve, reject) => {
            const deltaX = x - a; // X Distance
            const deltaY = y - b; // Y Distance
            const hypotenuse = Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY) ); // Length of hypotenuse.

            const travelX = deltaX / hypotenuse;
            const travelY = deltaY / hypotenuse;

            resolve({ x: travelX, y: travelY });
        });

        return promise;
    }

    // Handles player enemy collision.
    enemyCollision(player, enemy) {
        console.log("Player collided with enemy!");
        this.guh.play();
        enemy.destroy();
        this.playerDeath();
    }

    // Respawns enemies and makes them shoot.
    lastBarrage = 0;
    async enemyHandle() {

        // Respawns enemies.
        if (this.enemies.countActive() < this.maxEnemies) {
            const newEnemy = this.physics.add.image(
                Phaser.Math.Between(0 + 32, config.width - 32),
                Phaser.Math.Between(0 + 32, config.height / 2),
                "enemy"
            );
            this.enemies.add(newEnemy);
        }

        // Fires a barrage of energyballs every third second.
        if (this.lastBarrage + this.enemyShootCooldown < this.deltaTime()) {
            for (let i = 0; i < this.enemies.getChildren().length; i++) {
                const enemy = this.enemies.getChildren()[i];

                // Calculate bullet vector.
                const vector = await this.enemyCalculateShoot({
                    a: enemy.x,
                    b: enemy.y
                },
                {
                    x: this.player.x,
                    y: this.player.y
                });

                // Create enemy projectile.
                const energyBall = this.physics.add.image(enemy.x, enemy.y, "energyball");
                this.physics.world.enableBody(energyBall);

                // Player and energyball collision.
                this.physics.add.overlap(energyBall, this.player, () => { this.playerDeath(); }, null, this);

                // Randomness.
                const randomOffset = Math.random() * 21;

                // Applies vector to energyball.
                energyBall.body.velocity.x += vector.x * 100 + randomOffset;
                energyBall.body.velocity.y += vector.y * 100 + randomOffset;
            }
            this.lastBarrage = this.deltaTime();
        }
    }

    // Returns time since scene was created.
    deltaTime() {
        return Date.now() - this.gameStartTime;
    }

}