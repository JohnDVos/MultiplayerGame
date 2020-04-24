class Scene1 extends Phaser.Scene{
    constructor(){
        super("mainMenu"); 
    }
    
    preload(){
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
    
    create(){
        
        game.setBackgroundColor('rgba(0,0,0,0');
        
        //creates a button and sets a clause if it is pressed or not
        let playButton = this.add.image(640, 400, 'playGame').setDisplaySize(100, 100);
        playButton.setInteractive();
        playButton.once('pointerdown', function(pointer){ 
            game.scene.start('mainGame');

            });

    }
}