class Scene1 extends Phaser.Scene{
    constructor(){
        super("mainMenu"); 
    }
    preload(){
        this.load.image('playGame', '../assets/menu/playGame.png');
    }
    create(){
        
        let playButton = this.add.image(640, 400, 'playGame').setDisplaySize(100, 100);
        playButton.setInteractive();
        playButton.once('pointerdown', function(pointer){ 
            game.scene.start('mainGame');
            
            });

    }
}