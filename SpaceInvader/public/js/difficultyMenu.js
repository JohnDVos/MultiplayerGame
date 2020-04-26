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

    }
}