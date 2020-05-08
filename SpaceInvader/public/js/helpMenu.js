//Settings Menu
class helpMenu extends Phaser.Scene{
    constructor(){
        super("helpMenu"); 
    }
	
	preload(){
		//background asset:
		this.load.image('space', 'assets/space_background.png');
		
        //menu assets:
        this.load.image('back', 'assets/menu/back.png');
		this.load.image('controls', 'assets/menu/controls.png');
		this.load.image('credits', 'assets/menu/credits.png');

		//player assets:
		this.load.image('player1', 'assets/player/spaceship_1.png');
		this.load.image('player2', 'assets/player/spaceship_2.png');
		
		//enemy assets:
		this.load.image('enemy_1', 'assets/enemy/enemy_1.png');
		this.load.image('enemy_2', 'assets/enemy/enemy_2.png');
		this.load.image('enemy_3', 'assets/enemy/enemy_3.png');
		this.load.image('boss', 'assets/enemy/boss.png');
		
		//control assets:
		this.load.image('up', 'assets/help/up_arrow.png');
		this.load.image('down', 'assets/help/down_arrow.png');
		this.load.image('left', 'assets/help/left_arrow.png');
		this.load.image('right', 'assets/help/right_arrow.png');
		this.load.image('spacebar', 'assets/help/spacebar.png');
    }
	
	create(){
        this.add.image(750,375, 'space'); 
		
        //Settings Menu:
        let backButton = this.add.image(100, 50, 'back').setDisplaySize(128, 64);
        backButton.setInteractive();
        backButton.once('pointerdown', function(pointer){
            game.scene.start('mainMenu');
            game.scene.stop('helpMenu');
        });
		
		//controls assets:	//(x, y)
		var controls = this.add.image(400, 100, 'controls').setDisplaySize(128, 64);
		
		var up = this.add.image(400, 200, 'up').setDisplaySize(64, 64);
			var upText = this.add.text(450, 200, 'press the up key to fly forwards');
		
		var left = this.add.image(400, 275, 'left').setDisplaySize(64, 64);
			var leftText = this.add.text(450, 275, 'press the left key to turn the ship left');
		
	
		var right = this.add.image(400, 325, 'right').setDisplaySize(64, 64);
			var righText = this.add.text(450, 325, 'press the right key to turn the ship right');
		
		var space = this.add.image(400, 380, 'spacebar').setDisplaySize(128, 64);
			var spaceText = this.add.text(450, 375, ' press spacebar to shoot');
		
		
		//credits
		var credits = this.add.image(400, 500, 'credits').setDisplaySize(150, 64);
		var johnText = this.add.text(400, 550, 'John');
		var nickText = this.add.text(400, 600, 'Nick');

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