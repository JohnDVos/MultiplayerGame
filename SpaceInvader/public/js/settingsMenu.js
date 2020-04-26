//Settings Menu
class settingsMenu extends Phaser.Scene{
    constructor(){
        super("settingsMenu"); 
    }
	
	preload(){
		//background asset:
		this.load.image('space', 'assets/space_background.png');
		
        //menu assets:
        this.load.image('menu', 'assets/menu/menu.png');
        this.load.image('next', 'assets/menu/next.png');
        this.load.image('back', 'assets/menu/back.png');
		
		//sound assets:
		this.load.image('sound_on', 'assets/menu/sound_on.png');
		this.load.image('sound_off', 'assets/menu/sound_off.png');
    }
	
	create(){
        this.add.image(750,375, 'space'); 
		
        //Settings Menu
        
        let easyButton = this.add.image(game.config.width/2, game.config.height/2, 'sound_on').setDisplaySize(128, 64);
        easyButton.setInteractive();
        easyButton.once('pointerdown', function(pointer){
            
        });
        
        let mediumButton = this.add.image(game.config.width/2.5, game.config.height/2, 'sound_off').setDisplaySize(128, 64);
        mediumButton.setInteractive();
        mediumButton.once('pointerdown', function(pointer){
            
        });
        
        let backButton = this.add.image(100, 50, 'back').setDisplaySize(128, 64);
        backButton.setInteractive();
        backButton.once('pointerdown', function(pointer){
            game.scene.start('mainMenu');
            game.scene.stop('settingsMenu');
        });

    }
}