var Game = {};																		//makes the game keep reacting to messages from the server even when the game window doesn’t have focus.

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

//pre-load function for assets that are needed.
Game.preload = function() {
	game.load.image('background', 'assets/space_background.png');					//load background image.
    game.load.image('player', 'assets/spaceship_1.png');							//loads player asset
	game.load.image('enemy', 'assets/enemy_1.png');									//loads enemy asset
};	

//create function, notify server that a new player should be created.
Game.create = function() {
	var background = game.add.image(0, 0, 'background');							//background image.
	
	Game.playerMap = {};															//empty object to keep track of player.
	
	for(var y = 0; y < 4; y++) {
		for(var x = 0; x < 8; x++) {
			var enemy = this.add.image(x*48, y * 50, 'enemy');
		}
	}
	
	/*
	Game.projectile = {}; 															//projectile object for player shooting.
	Game.powerUps = {};																//powerup object for player boost.
	var fire = game.input.keyboard.addKey(phaser.Keyboard.SPACE);					//player shoot projectile.
	fire.onDown.add(Client.fireProjectile, this);
	*/
    
	/****************************************
	*										*
	*		player movement controls		*
	*										*
	****************************************/
    var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);					//init left key
    	leftKey.onDown.add(Client.moveLeft, this);
    var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);				//init right key
    	rightKey.onDown.add(Client.moveRight, this);
	var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);						//init up key
		upKey.onDown.add(Client.moveUp, this);
	var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);					//init down key
		downKey.onDown.add(Client.moveDown, this);
	
	var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);				//init test key
    	testKey.onDown.add(Client.sendTest, this);
    
    Client.askNewPlayer();
};

//loads in players sprite & controls player movements based on "Game.PLayerMap" in create.
Game.getCoordinates = function(pointer) {
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id) {
    Game.playerMap[id] = game.add.sprite(600, 600, 'player');						//loads in players sprite with x / y co-ordinates starting position.
};

Game.movePlayer = function(id, x, y) {												//function called move player takes: player ID & xy co-ordinates.
    var player = Game.playerMap[id];												//var player = player with passed ID.
    var distance = Phaser.Math.distance(player.x, player.y, x, y);					//distance = distance between players current pos and co-ordinates given.
    var tween = game.add.tween(player);	
    var duration = distance * 10;													//dur = 10 * distance
    tween.to({x:x, y:y}, duration);													//move tween to given xy over calculated duration.
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

