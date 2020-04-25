//Settings Menu
class settingsMenu extends Phaser.Scene{
    constructor(){
        super("settingsMenu"); 
    }
    
    preload(){
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
         
        //Settings Menu
        
        let easyButton = this.add.image(game.config.width/3, game.config.height/2, 'easy').setDisplaySize(200, 100);
        easyButton.setInteractive();
        easyButton.once('pointerdown', function(pointer){
            
        });
        
        let mediumButton = this.add.image(game.config.width/2, game.config.height/2, 'medium').setDisplaySize(200, 100);
        mediumButton.setInteractive();
        mediumButton.once('pointerdown', function(pointer){
            
        });
        
        let hardButton = this.add.image(game.config.width/1.5, game.config.height/2, 'hard').setDisplaySize(200, 100);
        hardButton.setInteractive();
        hardButton.once('pointerdown', function(pointer){
            
        });
        
        let backButton = this.add.image(200, 100, 'back').setDisplaySize(200, 100);
        backButton.setInteractive();
        backButton.once('pointerdown', function(pointer){
            game.scene.start('mainMenu');
            game.scene.stop('settingsMenu');
        });

    }
}