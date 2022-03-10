class SceneTwo extends Phaser.Scene {

    constructor() {
        super("SceneOne");
    }

    // Create game objects.
    create() {
        this.gameStartTime = Date.now();
        this.levelText = this.add.text(20, 40, "Stage Two");

        // Create player object.
        this.player = this.physics.add.image(config.width / 2, config.height - 32, "player");
        this.player.setCollideWorldBounds(true);

        // Frag counter
        this.frags = 0;
        this.fragsText = this.add.text(20, 40, "Frags: 0");

        // Create group to handle enemies.
        this.enemies = this.physics.add.group();

        // Register collision checking between player and enemies.
        this.physics.add.overlap(this.player, this.enemies, this.enemyCollision, null, this);

        // Keyboard input.
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    // Runs once per frame.
    update() {
        this.playerControl();

    }

    // Controls the player object.
    playerControl() {
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
        this.add.text(20, config.height / 2, "YOU LOSE! Refresh to go again.", {
            fill: "red",
            font: "20px"
        });
    }

    // Returns time since scene was created.
    deltaTime() {
        return Date.now() - this.gameStartTime;
    }

}