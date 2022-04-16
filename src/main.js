// Rocket Patrol Mods Assignment
// Name: Dominic Berardi
// Date: 4/12/2022
// Class: UCSC CMPM 120 Spring 2022
//
// This assignment took approximately 10 hours.
// 
// LIST OF MODS CREATED:
//
// 20 point mods: 60 points
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20 points)
// Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20 points)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20 points)
//
// 10 point mods: 10 points
// Display the time remaining (in seconds) on the screen (10 points)
// 
// 5 point mods: 30 points
// Implement the speed increase that happens after 30 seconds in the original game (5 points)
// Allow the player to control the Rocket after it's fired (5 points)
// Track a high score that persists across scenes and display it in the UI (5 points)
// Implement the 'FIRE' UI text from the original game (5 points)
// Add your own (copyright-free) background music to the Play scene (5 points)
// Randomize each spaceship's movement direction at the start of each play (5 points)
// 
// Total: 100 points
//
// REFERENCES/RESOURCES USED:
// https://jsfiddle.net/lewster32/8odgdyq6/
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/ 
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/random/
// http://pixelartmaker.com/
//
// MUSIC CREDIT:
// Playground Runaround by shortiefoeva2
// https://freesound.org/people/shortiefoeva2/sounds/405220/ 

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

// MOD: High score variable
var highScore = 0;

// MOD: Background music variable
var musicStarted = false;