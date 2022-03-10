class LoadingScene extends Phaser.Scene {

    constructor() {
        super("LoadingScene");
    }

    // Load assets.
    preload() {
        this.load.image("player", "assets/space-ship.png");
        this.load.image("enemy", "assets/enemy.png");
        this.load.image("laser", "assets/laser.png");
        this.load.image("energyball", "assets/energy_ball.png");
        this.load.audio("death", "assets/you_are_dead.mp3");
        this.load.audio("pew", "assets/pew.mp3");
        this.load.audio("pop", "assets/pop.mp3");
        this.load.audio("guh", "assets/guh.mp3");
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("SceneOne");
    }

}