var game = new Phaser.Game(1500, 750, Phaser.AUTO, '');

game.state.add('Game', Game);
game.state.start('Game');