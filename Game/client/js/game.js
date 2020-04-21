var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

//load assets that are needed.
Game.preload = function() {
	game.load.image('background', 'assets/space_background.png');					//load background image.
    game.load.image('player', 'assets/spaceship_1.png');							//loads player asset
	game.load.image('enemy_1', 'assets/enemy_1.png');								//loads enemy asset
};

//notify server that a new player should be created.
Game.create = function() {
	Game.playerMap = {};															//empty object to keep track of player.
	
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    
	//player controls.
    var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);					//init left key
    	leftKey.onDown.add(Client.moveLeft, this);
    
    var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);				//init right key
    	rightKey.onDown.add(Client.moveRight, this);
	
	var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);						//init up key
		upKey.onDown.add(Client.moveUp, this);
	
	var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);				//init down key
		downKey.onDown.add(Client.moveDown, this);
    
    Client.askNewPlayer();
};

//loads in players sprite & controls player movements based on "Game.PLayerMap" in create.
Game.getCoordinates = function(pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

//loads in players sprite with x / y co-ordinates.
Game.addNewPlayer = function(id){
    Game.playerMap[id] = game.add.sprite(650,650,'player');
};

Game.movePlayer = function(id, x, y) {
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x, player.y, x, y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};