var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
	//load background image.
	game.load.image('background', 'assets/space_background.png');
	//loads player asset
    game.load.image('player', 'assets/spaceship_1.png');
	
	//loads enemie asset
	game.load.image('enemie_1', 'assets/enemie_1.png');
};

Game.create = function(){
	this.add.image(1500, 750, 'space_background');
	
	
    Game.playerMap = {};
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    
	//init left key
    var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(Client.moveLeft, this);
    //init right key
    var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(Client.moveRight, this);
	//init up key
	var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	upKey.onDown.add(Client.moveUp, this);
	//init down key
	var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	downKey.onDown.add(Client.moveDown, this);
	/*init spacebar
	var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spacebar.onDown.add(Client.shoot, this);*/
    
    game.input.onTap.add(Game.getCoordinates, this);
    
    Client.askNewPlayer();
};

Game.getCoordinates = function(pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

//loads in players sprite.
Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'player');
};


Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};