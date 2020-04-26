//Main Menu
class mainMenu extends Phaser.Scene{
    constructor(){
        super("mainMenu"); 
    }
    
    preload(){
        //menu assets:
        this.load.image('help', 'assets/menu/help.png');
        this.load.image('settings', 'assets/menu/settings.png');
        this.load.image('playGame', 'assets/menu/playGame.png');
    }
    
    create(){
        
        //Main Menu
        
        //creates a button and sets a clause if it is pressed or not
        let playButton = this.add.image(game.config.width/2, game.config.height/3, 'playGame').setDisplaySize(128, 64);
        playButton.setInteractive();
        playButton.once('pointerdown', function(pointer){
            game.scene.start('mainGame');
        });
        
        let settingsButton = this.add.image(game.config.width/2, game.config.height/2, 'settings').setDisplaySize(128, 64);
        settingsButton.setInteractive();
        settingsButton.once('pointerdown', function(pointer){ 
            game.scene.stop('mainMenu');
            game.scene.start('settingsMenu');
        });
        
        let helpButton = this.add.image(game.config.width/2, game.config.height/1.5, 'help').setDisplaySize(128, 64);
        helpButton.setInteractive();
        helpButton.once('pointerdown', function(pointer){ 

            console.log("sup");
        });
        
    }
}