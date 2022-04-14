class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        //tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        //add player 1 rocket
        this.p1rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //key definitions
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);
        //MOD: Increase speed of ships every 30 seconds
        this.ship01SpeedTimer = this.time.addEvent({
            delay: 30000,
            callback: () => {this.ship01.moveSpeed += 1},
            startAt: 0,
            loop: true
        });
        this.ship02SpeedTimer = this.time.addEvent({
            delay: 30000,
            callback: () => {this.ship02.moveSpeed += 1},
            startAt: 0,
            loop: true
        });
        this.ship03SpeedTimer = this.time.addEvent({
            delay: 30000,
            callback: () => {this.ship03.moveSpeed += 1},
            startAt: 0,
            loop: true
        });

        //explosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });

        //Init player score
        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let headerConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            backgroundColor: '#ADD8E6',
            color: '#000000',
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        this.scoreHeader = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, "Score", headerConfig);

        //GAME OVER flag
        this.gameOver = false;
        //Play clock
        //MOD: Alternative play clock method to allow for adding time
        scoreConfig.fixedWidth = 0;
        this.timeRemaining = this.time.delayedCall(game.settings.gameTimer, () => {
                this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
        }, null, this);
        scoreConfig.fixedWidth = 100;

        //MOD: Display play clock
        this.clockRight = this.add.text(game.config.width - (borderUISize + borderPadding * 10), borderUISize + borderPadding * 2, this.timeRemaining.getRemainingSeconds(), scoreConfig);
        this.clockHeader = this.add.text(game.config.width - (borderUISize + borderPadding * 10), borderUISize + borderPadding, "Time", headerConfig);

        //MOD: Display high score
        this.highMid = this.add.text(game.config.width - (borderUISize + borderPadding * 25), borderUISize + borderPadding * 2, highScore, scoreConfig);
        this.highHeader = this.add.text(game.config.width - (borderUISize + borderPadding * 25), borderUISize + borderPadding, "High", headerConfig);

        //MOD: Display fire text
        scoreConfig.align = 'center';
        this.fireMid = this.add.text(borderUISize + borderPadding * 15, borderUISize + borderPadding * 2, "FIRE", scoreConfig);

    }
    update() {
        //check for restart input
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        //move starfield
        this.starfield.tilePositionX -= 4;
        //game over update (stops ships and rocket)
        if (!this.gameOver) {
            this.p1rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        //check collisions every frame
        if (this.checkCollision(this.p1rocket, this.ship03)){
            this.p1rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1rocket, this.ship02)){
            this.p1rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1rocket, this.ship01)){
            this.p1rocket.reset();
            this.shipExplode(this.ship01);
        }

        //MOD: Display play clock
        this.clockRight.text = Math.trunc(this.timeRemaining.getRemainingSeconds());

        //MOD: Display fire text
        if (this.p1rocket.isFiring){
            this.fireMid.setAlpha(0);
        }
        else{
            this.fireMid.setAlpha(1);
        }

    }
    checkCollision(rocket, ship) {
        // Axis-Aligned Bounding Boxes method
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            var currentTime = this.timeRemaining.getRemaining();
            this.timeRemaining.destroy();
            this.timeRemaining = this.time.delayedCall(currentTime + 2000, () => {
                this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', textConfig).setOrigin(0.5);
                this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', textConfig).setOrigin(0.5);
                this.gameOver = true;
            }, null, this);
            return true;
        }
        else{
            return false;
        }
    }
    shipExplode(ship) {
        //makes ship invisible temporarily
        ship.alpha = 0;
        //create explosion animation at ship position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        //play explode animation
        boom.anims.play('explode');
        //callback after animation completes
        boom.on('animationcomplete', () => {
            //reset ship pos
            ship.reset();
            //make ship visible again
            ship.alpha = 1;
            //remove explosion animation
            boom.destroy();
        });
        //score addition and repaint score text
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        if (this.p1Score >= highScore){
            highScore = this.p1Score;
        }
        this.highMid.text = highScore;
        this.sound.play('sfx_explosion');
    }
}