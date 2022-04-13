// Rocket Patrol Mods Assignment
// Name: Dominic Berardi
// Date: 4/12/2022
//
// This assignment took approximately 2 hours.
// 
// LIST OF MODS CREATED:
// Display the time remaining (in seconds) on the screen (10 points)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20 points)
//
// REFERENCES USED:
// https://jsfiddle.net/lewster32/8odgdyq6/
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/ 

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// Keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;