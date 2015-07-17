var preload = function(game){}

preload.prototype = {
    preload:function(){
        //this.game.load.audio('name','relative path');
    //this.game.load.image('name','relative path');
    //this.game.load.spritesheet('name','relative path',x,y);
    },
    create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize( true );

        this.game.state.start("Menu"); 
    }
}
