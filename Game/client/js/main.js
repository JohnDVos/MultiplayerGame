var game = new Phaser.Game(1500, 750, Phaser.AUTO, '');			//sets up game and canvas.

game.state.add('Game', Game);									//decalres single game state called game, corresponds to JS object with same name.
game.state.start('Game');