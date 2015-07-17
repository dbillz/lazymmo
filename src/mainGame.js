var mainGame = function(game){
    this.textShown = "hola mundo ";
    this.textStyle = { font: '34px Arial', fill: '#f0f' };
}

mainGame.prototype = {
    
    preload: function(){
        
    },
    
    create:function(){
        this.game.add.text(10,10,this.textShown, this.textStyle)
    },
    
    update: function(){
        
    }
    
}