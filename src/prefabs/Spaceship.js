class Spaceship extends Phaser.GameObjects.Sprite {
    //MOD: direction is either left or right movement direction
    constructor(scene, x, y, texture, frame, pointValue, speed, direction) {
        super(scene, x, y, texture, frame);
        //add to existing scene
        scene.add.existing(this);
        //store points value per ship
        this.points = pointValue;
        //pixels per frame
        this.moveSpeed = speed;
        this.moveDirection = direction;
    }
    update() {
        if (this.moveDirection == 1) {
            //move ships left
            this.x -= this.moveSpeed;
            //wrap around screen
            if (this.x <= 0 - this.width) {
                this.reset();
            }
        }
        else {
            //move ships right
            this.x += this.moveSpeed;
            if (this.x >= game.config.width + this.width) {
                this.reset();
            }
        }
    }
    reset() {
        if (this.moveDirection == 1) {
            this.x = game.config.width;
        }
        else {
            this.x = 0 - this.width;
        }
    }
}