//Difficulty Menu
class difficultyMenu extends Phaser.Scene{
    constructor(){
        super("difficultyMenu"); 
    }
    
    preload(){
		//background asset:
		this.load.image('space', 'assets/space_background.png');
		
        //menu assets:
        this.load.image('menu', 'assets/menu/menu.png');
        this.load.image('next', 'assets/menu/next.png');
        this.load.image('back', 'assets/menu/back.png');
	
        //dificulty assets:
        this.load.image('easy', 'assets/menu/easy.png');
        this.load.image('medium', 'assets/menu/medium.png');
        this.load.image('hard', 'assets/menu/hard.png');
		
		//player assets:
		this.load.image('player1', 'assets/player/spaceship_1.png');
		this.load.image('player2', 'assets/player/spaceship_2.png');
		
		//enemy assets:
		this.load.image('enemy_1', 'assets/enemy/enemy_1.png');
		this.load.image('enemy_2', 'assets/enemy/enemy_2.png');
		this.load.image('enemy_3', 'assets/enemy/enemy_3.png');
		this.load.image('boss', 'assets/enemy/boss.png')
    }
    
    create(){
        this.add.image(750,375, 'space'); 
		
        //Settings Menu
        
        let easyButton = this.add.image(game.config.width/3, game.config.height/2, 'easy').setDisplaySize(128, 64);
        easyButton.setInteractive();
        easyButton.once('pointerdown', function(pointer){
            
        });
        
        let mediumButton = this.add.image(game.config.width/2, game.config.height/2, 'medium').setDisplaySize(128, 64);
        mediumButton.setInteractive();
        mediumButton.once('pointerdown', function(pointer){
            
        });
        
        let hardButton = this.add.image(game.config.width/1.5, game.config.height/2, 'hard').setDisplaySize(128, 64);
        hardButton.setInteractive();
        hardButton.once('pointerdown', function(pointer){
            
        });
        
        let backButton = this.add.image(100, 50, 'back').setDisplaySize(128, 64);
        backButton.setInteractive();
        backButton.once('pointerdown', function(pointer){
            game.scene.start('mainMenu');
            game.scene.stop('difficultyMenu');
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