//Main Game

class mainGame extends Phaser.Scene{
    constructor(){
        super("mainGame"); 
    }
    
    preload() {
        this.load.image('space', 'assets/space_background.png');																	//load background image.
	
	   //players:
        this.load.image('ship', 'assets/player/spaceship_1.png');
        this.load.image('ship2', 'assets//player/spaceship_2.png');
	
	   //power-ups:
	   this.load.image('heartPowerUp', 'assets/powerUps/heartPowerUp.png');														//loads health power-up asset.
	   this.load.image('damagePowerUp', 'assets/powerUps/damagePowerUp.png');														//loads damange power-up asset.
	
    }
 
    create() {
		var self = this;
		this.add.image(750,375, 'space');
		this.socket = io();
		this.otherPlayers = this.physics.add.group();
		this.socket.on('currentPlayers', function (players) {
			Object.keys(players).forEach(function (id) {
				if (players[id].playerId === self.socket.id) {
					self.addPlayer(self, players[id]);
				} else {
					self.addOtherPlayers(self, players[id]);
				}
			});
		});
		this.socket.on('newPlayer', function (playerInfo) {
			self.addOtherPlayers(self, playerInfo);
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
		
		//adds text game object to display team scores:
		this.redScoreText = this.add.text(1000, 16, '', { fontSize: '32px', fill: '#FF0000' });											//red team score.
		this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });											//blue team score.
		
		this.socket.on('scoreUpdate', function(scores) {																				//when score event received.
			self.redScoreText.setText('Red team score: ' + scores.blue);																//passes score.
			self.blueScoreText.setText('Blue team score: ' + scores.blue);																//passes score.
		});
		
		this.socket.on('heartPowerUpLocation', function(heartPowerUpLocation) {
			if(self.heartPowerUp) self.heartPowerUp.destroy();
			self.heartPowerUp = self.physics.add.image(heartPowerUpLocation.x, heartPowerUpLocation.y, 'heartPowerUp');			//add new heart power-up object to players game.
			self.physics.add.overlap(self.ship, self.heartPowerUpLocation, function() {													//check if player's ship & power-up overlap.
				this.socket.emit('heartPowerUpCollected');
			}, null, self);
		});
		
		this.socket.on('damagePowerUpLocation', function(damagePowerUpLocation) {
			if(self.damagePowerUp) self.damagePowerUp.destroy();
			self.damagePowerUp = self.physics.add.image(damagePowerUpLocation.x, damagePowerUpLocation.y, 'damagePowerUp');		//add new heart power-up object to players game.
			self.physics.add.overlap(self.ship, self.damagePowerUpLocation, function() {													//check if player's ship & power-up overlap.
				this.socket.emit('damagePowerUpCollected');
			}, null, self);
		});
	}
 
    update() {
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

    addPlayer(self, playerInfo) {
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

    addOtherPlayers(self, playerInfo) {
	  const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'ship2').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
	  //if (playerInfo.team === 'blue') {
	  //  otherPlayer.setTint(0x0000ff);
	  //} else {
	  //  otherPlayer.setTint(0xff0000);
	  //}
	  otherPlayer.playerId = playerInfo.playerId;
	  self.otherPlayers.add(otherPlayer);
	}
}