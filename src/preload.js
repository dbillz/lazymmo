var preload = function(game){}

preload.prototype = {
    preload:function(){
        //this.game.load.audio('name','relative path');
    //this.game.load.image('name','relative path');
    //this.game.load.spritesheet('name','relative path',x,y);
        this.game.load.spritesheet('heads0','assets/hats.png',64,64);
        this.game.load.spritesheet('feet0','assets/boots.png',64,64);
        this.game.load.spritesheet('wrists0','assets/bracers.png',64,64);
        this.game.load.spritesheet('waists0','assets/belts.png',64,64);
        this.game.load.spritesheet('backs0','assets/cloaks.png',64,64);
        this.game.load.spritesheet('hands0','assets/cloth gloves.png',64,64);
        this.game.load.spritesheet('legs0','assets/cloth pants.png',64,64);
        this.game.load.spritesheet('chests0','assets/cloth shirt.png',64,64);
        this.game.load.spritesheet('shoulders0','assets/cloth shoulders.png',64,64);
        this.game.load.spritesheet('necks0','assets/necklaces.png',64,64);
        this.game.load.spritesheet('weapons0','assets/spear.png',64,64);
        this.game.load.spritesheet('rings0','assets/rings.png',64,64);
    },
    create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize( true );

        this.game.state.start("Menu"); 
    }
}
