//Main Menu
class mainMenu extends Phaser.Scene{
    constructor(){
        super("mainMenu"); 
    }
    
    preload(){
		//background asset:
		this.load.image('space', 'assets/space_background.png');
		
        //menu assets:
        this.load.image('help', 'assets/menu/help.png');
        this.load.image('settings', 'assets/menu/settings.png');
		this.load.image('difficulty', 'assets/menu/difficulty.png');
        this.load.image('playGame', 'assets/menu/playGame.png');
		
		//player assets:
		this.load.image('player1', 'assets/player/spaceship_1.png');
		this.load.image('player2', 'assets/player/spaceship_2.png');
		
		//enemy assets:
		this.load.image('enemy_1', 'assets/enemy/enemy_1.png');
		this.load.image('enemy_2', 'assets/enemy/enemy_2.png');
		this.load.image('enemy_3', 'assets/enemy/enemy_3.png');
		this.load.image('boss', 'assets/enemy/boss.png');
    }
    
    create(){
        this.add.image(750,375, 'space');
		
        //Main Menu
        
        //creates a button and sets a clause if it is pressed or not
        let playButton = this.add.image(game.config.width/2, game.config.height/3, 'playGame').setDisplaySize(128, 64);
        playButton.setInteractive();
        playButton.once('pointerdown', function(pointer){
            game.scene.start('mainGame');
        });
        
        let difficultyButton = this.add.image(game.config.width/2, game.config.height/2.25, 'difficulty').setDisplaySize(128, 64);
        difficultyButton.setInteractive();
        difficultyButton.once('pointerdown', function(pointer){ 
            game.scene.stop('mainMenu');
            game.scene.start('difficultyMenu');
        });
		
		let settingsButton = this.add.image(game.config.width/2, game.config.height/1.8, 'settings').setDisplaySize(128, 64);
		settingsButton.setInteractive();
		settingsButton.once('pointerdown', function(pointer) {
			game.scene.stop('mainMenu');
			game.scene.start('settingsMenu');
		})
        
        let helpButton = this.add.image(game.config.width/2, game.config.height/1.5, 'help').setDisplaySize(128, 64);
        helpButton.setInteractive();
        helpButton.once('pointerdown', function(pointer){ 
			game.scene.stop('helpMenu');
			game.scene.start('helpMenu');
        });
		
		//spawns player in background.
		this.player1 = this.add.image(config.width/6, config.height/1, 'player1');
		this.player2 = this.add.image(config.width/5 + 50, config.height/1, 'player2');
		
		//spawns enemies in background.
		this.enemy_1 = this.add.image(config.width/4, config.height/1, 'enemy_1');
		this.enemy_2 = this.add.image(config.width/3, config.height/1, 'enemy_2');
		this.enemy_3 = this.add.image(config.width/2, config.height/1, 'enemy_3');
        this.boss = this.add.image(config.width/2.2, config.height/1, 'boss');
    }
	
	update() {																														//update for ships to move at different speeds.
		this.moveShip(this.player1, 2);
		this.moveShip(this.player2, 2);
		
		this.moveShip(this.enemy_1, 2);
		this.moveShip(this.enemy_2, 2);
		this.moveShip(this.enemy_3, 2);
		this.moveShip(this.boss, 2);
	}
	
	moveShip(ship, speed) {
		ship.y += speed;																											//takes param for ship object & y velocity.
		if(ship.y > config.height) {																								//if vertical position exceeds height of game.
			this.resetShipPos(ship);																								//calls reset ship position.	
		}
	}
	resetShipPos(ship) {
		ship.y = 0;																													//takes ship object & sets Y to 0.
		var randomX = Phaser.Math.Between(0, config.width);																			//creates random value between 0 & width of canvas.
		ship.x = randomX;																											//assigns to x position.
	}
}