//Main Game

class mainGame extends Phaser.Scene{
    constructor(){
        super("mainGame");
    }
    
    preload() {
        this.load.image('space', 'assets/space_background.png');																	//load background image.
	
        //players:
        this.load.image('ship', 'assets/player/spaceship_1.png');																	//player asset image 1.
        this.load.image('ship2', 'assets//player/spaceship_2.png');																	//player asset image 2.
		this.load.image('bullet', 'assets/bullet.png');																				//bullet asset.
	
        //power-ups:
        this.load.image('heartPowerUp', 'assets/powerUps/heartPowerUp.png');														//loads health power-up asset.
        this.load.image('damagePowerUp', 'assets/powerUps/damagePowerUp.png');														//loads damange power-up asset.
	   	
		//enemy assets:
		this.load.image('enemy_1', 'assets/enemy/enemy_1.png');
		this.load.image('enemy_2', 'assets/enemy/enemy_2.png');
		this.load.image('enemy_3', 'assets/enemy/enemy_3.png');
		this.load.image('boss', 'assets/enemy/boss.png');
        
        //sound:
        this.load.audio('music', 'assets/sound/background music.wav')
        this.load.audio('bulletSFX', 'assets/sound/bullet.wav')
    }
 
    create() {
        this.physics.world.setBounds(0, 0, 1500, 750, true, true, true, true);															
        this.sound.play('music');
        
		var self = this;
		this.add.image(750,375, 'space');
		this.socket = io();
		this.otherPlayers = this.physics.add.group();
            
        //this.addEnemy();
        
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

		this.cursors = this.input.keyboard.createCursorKeys();																		//movement controls.

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
		this.blueScoreText = this.add.text(100, 16, '', { fontSize: '32px', fill: '#0000FF' });											//blue team score.
		
		this.socket.on('scoreUpdate', function(scores) {																				//when score event received.
			self.redScoreText.setText('Red team score: ' + scores.red);																//passes score.
			self.blueScoreText.setText('Blue team score: ' + scores.blue);																//passes score.
		});
    
		
		this.socket.on('heartPowerUpLocation', function(heartPowerUpLocation) {
			if(self.heartPowerUp) self.heartPowerUp.destroy();
			self.heartPowerUp = self.physics.add.image(heartPowerUpLocation.x, heartPowerUpLocation.y, 'heartPowerUp');			//add new heart power-up object to players game.
			self.physics.add.overlap(self.ship, self.heartPowerUp, function() {													//check if player's ship & power-up overlap.
				this.socket.emit('heartPowerUpCollected');
			}, null, self);
		});
		
		this.socket.on('damagePowerUpLocation', function(damagePowerUpLocation) {
			if(self.damagePowerUp) self.damagePowerUp.destroy();
			self.damagePowerUp = self.physics.add.image(damagePowerUpLocation.x, damagePowerUpLocation.y, 'damagePowerUp');		//add new heart power-up object to players game.
			self.physics.add.overlap(self.ship, self.damagePowerUp, function() {													//check if player's ship & power-up overlap.
				this.socket.emit('damagePowerUpCollected');
			}, null, self);
		});
		
		this.socket.on('bossLocation', function(bossLocation) {
			if(self.boss) {
                self.boss.destroy();
                //this.socket.emit('bossHit');
            }
            
			self.boss = self.physics.add.image(bossLocation.x, bossLocation.y, 'boss');		//add new heart power-up object to players game.
            
            //console.log("bossLocation HIT");
            
		});
        
        this.socket.on('enemyHit', function(){
            self.boss.destroy();
        })
        
        this.socket.on('bullets-update', function(server_bullet_array){
            for(var i = 0; i < server_bullet_array.length; i++){
                if(bullet_array[i] == undefined){	
                    bullet_array[i] = self.add.sprite(server_bullet_array[i].x,server_bullet_array[i].y,'bullet');
                }
                else{
                    bullet_array[i].x = server_bullet_array[i].x; 
                    bullet_array[i].y = server_bullet_array[i].y; 
                }
                for(var i=server_bullet_array.length;i<bullet_array.length;i++){
                    bullet_array[i].destroy();
                    bullet_array.splice(i,1);
                    i--;
                }
   
            }
        });
        
        // Listen for any player hit events and make that player flash 
        this.socket.on('player-hit', function(data){
            console.log(data.id);
            console.log(data.playerID);
            if(data.id == data.playerID){
                //If this is you
                self.ship.alpha = 0;
            } else {
                // Find the right player 
                self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                    otherPlayer.alpha = 0;
                })
            }
        })
		
	}
 
    update(time) {
        
       //this.moveEnemies();
        
		if (this.ship) {
            if (this.cursors.left.isDown) {
                this.ship.setAngularVelocity(-150);
            }   
            else if (this.cursors.right.isDown) {
                this.ship.setAngularVelocity(150);
            }
            else {
                this.ship.setAngularVelocity(0);
            }

            if (this.cursors.up.isDown) {
                this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
            }
            else {
                this.ship.setAcceleration(0);
            }
            
            if(this.cursors.space.isDown){
                var speed_x = Math.cos(this.ship.rotation + Math.PI/2) * 20;
                var speed_y = Math.sin(this.ship.rotation + Math.PI/2) * 20;
                this.socket.emit('shoot-bullet',{x: this.ship.x, y: this.ship.y ,angle: this.ship.rotation, speed_x: speed_x, speed_y: speed_y})
                this.sound.play('bulletSFX');    
            }

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
               
            // To make player flash when they are hit, set player.spite.alpha = 0
            if(this.ship.alpha < 1){
                this.ship.alpha += (1 - this.ship.alpha) * 0.16;
            } else {
                this.ship.alpha = 1;
            }
            
            // Each player is responsible for bringing their alpha back up on their own client 
            // Make sure other players flash back to alpha = 1 when they're hit 
            this.otherPlayers.getChildren().forEach(function (otherPlayer) {
				if (otherPlayer.alpha < 1) {
					otherPlayer.alpha += (1 - otherPlayer.alpha) * 0.16;
				} else {
                    otherPlayer.alpha = 1;
                }
			});
        }
		
    }
    
    addPlayer(self, playerInfo) {
        self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
        self.ship.setDrag(100);
	    self.ship.setAngularDrag(100);
	    self.ship.setMaxVelocity(200);
        self.ship.setCollideWorldBounds(true);
        self.ship.onWorldBounds = true;
        
        
        if (playerInfo.team === 'blue') {
            self.ship.setTint(0x0000ff);
        } else {
	        self.ship.setTint(0xff0000);
	    }
 
    }
    
    addOtherPlayers(self, playerInfo) {
        const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'ship2').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
	    if (playerInfo.team === 'blue') {
            otherPlayer.setTint(0x0000ff);
        } else {
            otherPlayer.setTint(0xff0000);
        }
        otherPlayer.playerId = playerInfo.playerId;
        self.otherPlayers.add(otherPlayer);
    }
/*        
    addEnemy(){
        this.spawns = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite
        });
        
        for(var i = 0; i < 3; i++){
        
            var enemy = this.spawns.create(Math.floor(Math.random() * 1300) + 50, 0, this.getEnemySprite());
            //enemy.body.setCollideWorldBounds(true);
            //enemy.body.setImmovable();
            
        }
    }
    
    moveEnemies(){
        this.spawns.getChildren().forEach((enemy) => {
            enemy.body.setVelocityY(50);
            if(enemy.body.y > config.height) {
                enemy.body.destroy;
                this.addEnemy();
            }
        });
        
  
    }
    
    getEnemySprite() {
        var sprites = ['enemy_1', 'enemy_2', 'enemy_3', 'boss'];
        return sprites[Math.floor(Math.random() * sprites.length)];
    }
    
    
*/    
}