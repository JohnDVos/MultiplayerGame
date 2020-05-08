var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1500,
  height: 750,
  physics: {
    default: 'arcade',
    arcade: {
		debug: false,
      	gravity: { y: 0 },
    }
  },
  scene: [mainMenu, difficultyMenu, settingsMenu, mainGame, helpMenu]
    
};

var bullets;
var lastFired = 0;
var bullet_array= [];
var game = new Phaser.Game(config);
 
