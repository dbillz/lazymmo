var mainGame = function(game){
    this.textShown = "hola mundo ";
    this.textStyle = { font: '34px Arial', fill: '#f0f' };
    
    
    this.HEAD_SLOT = 'head';
    this.LEG_SLOT = 'leg';
    this.CHEST_SLOT = 'chest';
    this.FOOT_SLOT = 'foot';
    this.WEAPON_SLOT = 'weapon';
    this.BACK_SLOT = 'back';
    this.BELT_SLOT = 'belt';
    this.NECK_SLOT = 'neck';
    this.RING_SLOT = 'ring';
    this.HAND_SLOT = 'hand';
    this.SHOULDER_SLOT = 'shoulder';
    this.WRIST_SLOT = 'wrist';
    
    this.COMMON_RARITY = 'common';
    this.UNCOMMON_RARITY = 'uncommon';
    this.RARE_RARITY = 'rare';
    this.EPIC_RARITY = 'epic';
}

mainGame.prototype = {
    
    preload: function(){
        
    },
    
    create:function(){
        this.game.add.text(10,10,this.textShown, this.textStyle);
        this.player = this.createPlayer();
        var chestSprite = this.game.add.sprite(200,200,this.getSpritesheetForItem(this.player.equipment[this.CHEST_SLOT]));
        chestSprite.frame = 0;
    },
    
    update: function(){
        
    },
    
    createPlayer: function(){
        var player = {};
        player.coins = 0;
        player.equipment = [];
        //Players start with chest, legs, and weapon.
        //No gloves, necklace, shoulder,  head given at start.
        
        player.equipment[this.CHEST_SLOT] = this.createItem(this.CHEST_SLOT,0);
        player.equipment[this.LEG_SLOT] = this.createItem(this.LEG_SLOT,0);
        player.equipment[this.WEAPON_SLOT] = this.createItem(this.WEAPON_SLOT,0);
        
        player.inventory = [];
        return player;
    },
    
    equipItem: function(item){
        
        //If there's already something in that slot,
        if(typeof this.player.equipment[item.slot] != 'undefined' && this.player.equipment[item.slot] != null){
            this.unequipItem(item.slot);
        } 
        //Then place the item in the newly empty slot
        this.player.equipment[item.slot] = item;
        
    },
    
    unequipItem: function(slot){
        if(typeof this.player.equipment[slot] != 'undefined' && this.player.equipment[slot] != null){
            this.player.inventory.push(this.player.equipment[slot]);
        } 
    },
    
    createItem: function(slot, rarity){
        var item = {};
        item.slot = slot;
        switch(rarity){
            case 0: item.rarity = this.COMMON_RARITY; break;
            case 1: item.rarity = this.UNCOMMON_RARITY; break;
            case 2: item.rarity = this.RARE_RARITY; break;
            case 3: item.rarity = this.EPIC_RARITY; break;
        }
        return item;
    },
    
    //I'm not happy with how this function works right now,
    //it won't really work like this once there are more items
    //items should have a unique ID number that gets looked up in some table
    //this has a single sheet per slot
    getSpritesheetForItem: function(item){
        var spritesheet;
        switch(item.slot){
            case this.HEAD_SLOT: spritesheet = "heads0"; break;
            case this.BACK_SLOT: spritesheet = "backs0"; break;
            case this.BELT_SLOT: spritesheet = "waists0"; break;
            case this.CHEST_SLOT: spritesheet = "chests0"; break;
            case this.FOOT_SLOT: spritesheet = "feet0"; break;
            case this.SHOULDER_SLOT: spritesheet = "shoulder0"; break;
            case this.HAND_SLOT: spritesheet = "hands0"; break;
            case this.LEG_SLOT: spritesheet = "legs0"; break;
            case this.WRIST_SLOT: spritesheet = "wrists0"; break;
            case this.WEAPON_SLOT: spritesheet = "weapons0"; break;
            case this.RING_SLOT: spritesheet = "rings0"; break;
            case this.NECK_SLOT: spritesheet = "necks0"; break;
        }
        return spritesheet;
    },
    
    
    drawEquipment: function(){
        
    }
    
}