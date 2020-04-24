var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1500,
  height: 750,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  } 
};
 
var game = new Phaser.Game(config);
 
function preload() {
    this.load.image('space', 'assets/space_background.png');														//load background image.
	
	//players:
    this.load.image('ship', 'assets/player/spaceship_1.png');
    this.load.image('ship2', 'assets//player/spaceship_2.png');
	
	//power-ups:
	this.load.image('heartPowerUp', 'assets/power-ups/heartPowerUp.png');											//loads health power-up asset.
	this.load.image('damagePowerUp', 'assets/power-ups/damagePowerUp.png');											//loads damange power-up asset.
	
	//menu assets:
	this.load.image('menu', 'assets/menu/menu.png');
	this.load.image('next', 'assets/menu/next.png');
	this.load.image('back', 'assets/menu/back.png');
	this.load.image('help', 'assets/menu/help.png');
	this.load.image('settings', 'assets/menu/settings.png');
	this.load.image('playGame', 'assets/menu/playGame.png');
	
	//dificulty assets:
	this.load.image('easy', 'assets/menu/easy.png');
	this.load.image('medium', 'assets/menu/medium.png');
	this.load.image('hard', 'assets/menu/hard.png');
}
 
function create() {
    var self = this;
    this.add.image(750,375, 'space');
    this.socket = io();
    this.otherPlayers = this.physics.add.group();
    this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
            if (players[id].playerId === self.socket.id) {
                addPlayer(self, players[id]);
            } else {
                addOtherPlayers(self, players[id]);
            }
        });
    });
    this.socket.on('newPlayer', function (playerInfo) {
        addOtherPlayers(self, playerInfo);
    });
    this.socket.on('disconnect', function (playerId) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
            otherPlayer.destroy();
            }
        });
    });
    	
    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.socket.on('playerMoved', function (playerInfo) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
            if (playerInfo.playerId === otherPlayer.playerId) {
                otherPlayer.setRotation(playerInfo.rotation);
                otherPlayer.setPosition(playerInfo.x, playerInfo.y);
            }
        });
    });
}
 
function update() {
    if (this.ship) {
    if (this.cursors.left.isDown) {
        this.ship.setAngularVelocity(-150);
    }   else if (this.cursors.right.isDown) {
        this.ship.setAngularVelocity(150);
    }   else {
        this.ship.setAngularVelocity(0);
    }
  
    if (this.cursors.up.isDown) {
        this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
    }   else {
        this.ship.setAcceleration(0);
    }
  
    //this.physics.world.wrap(this.ship, 5);
        
    // emit player movement
    var x = this.ship.x;
    var y = this.ship.y;
    var r = this.ship.rotation;
    if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
    this.socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y, rotation: this.ship.rotation });
    }
 
    // save old position data
    this.ship.oldPosition = {
        x: this.ship.x,
        y: this.ship.y,
        rotation: this.ship.rotation
    };
  }
}

function addPlayer(self, playerInfo) {
  self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  //if (playerInfo.team === 'blue') {
  //  self.ship.setTint(0x0000ff);
  //} else {
  //  self.ship.setTint(0xff0000);
  //}
  self.ship.setDrag(100);
  self.ship.setAngularDrag(100);
  self.ship.setMaxVelocity(200);
}

function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'ship2').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  //if (playerInfo.team === 'blue') {
  //  otherPlayer.setTint(0x0000ff);
  //} else {
  //  otherPlayer.setTint(0xff0000);
  //}
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}