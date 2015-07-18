var mainGame = function(game){
    this.game = game;
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
    
    this.questButton;
    this.questResultDisplay;
    this.xpTextDisplay;
    this.levelTextDisplay;
    
    this.lastQuestTime;
    this.QUEST_TEXT_RESET_TIME = 2000;
    
    this.currentXp = 0;
    this.currentCoins = 0;
    this.currentLevel = 1;
    
    
    this.copperSprite;
    this.copperText;
    this.silverSprite;
    this.silverText;
    this.goldSprite;
    this.goldText;
    this.gemSprite;
    this.gemText;
    
    this.xpToLevel = 0;
}

mainGame.prototype = {
    
    preload: function(){
        
    },
    
    create:function(){
        this.player = this.createPlayer();
      
        this.lastQuestTime = this.game.time.now;
        this.questResultDisplay = this.game.add.text(0,350," ",this.textStyle);
        this.levelTextDisplay = this.game.add.text(0,0,"Level: 0000",this.textStyle);
        
        this.copperSprite = this.game.add.sprite(0,40,'coins');
        this.copperSprite.frame = 0;
        this.copperText = this.game.add.text(40,40,"000",this.textStyle);
        this.silverSprite = this.game.add.sprite(100,40,'coins');
        this.silverSprite.frame = 1;
        this.silverText = this.game.add.text(140,40,"000",this.textStyle);
        this.goldSprite = this.game.add.sprite(200,40,'coins');
        this.goldSprite.frame = 2;
        this.goldText = this.game.add.text(240,40,"000",this.textStyle);
        this.gemSprite = this.game.add.sprite(300,40,'coins');
        this.gemSprite.frame = 3;
        this.gemText = this.game.add.text(340,40,"000",this.textStyle);
        
        this.xpTextDisplay = this.game.add.text(300,0,"XP: 0",this.textStyle);
        this.questButton = this.game.add.button(400,250,'questButton', this.doQuest, this,3,2,1);
        this.xpToLevel = this.getXpNeeded(1);
        this.updateTextDisplays();
    },
    
    update: function(){
        if(this.game.time.now > (this.lastQuestTime + this.QUEST_TEXT_RESET_TIME)){
            this.resetQuestText();
            console.log("reset");
        }
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
        
    },
    
    doQuest: function(){
        var xpEarned = Math.floor(Math.random()*10);
        var coinEarned = Math.floor(Math.random()*5*this.currentLevel);
        this.currentXp += xpEarned;
        this.currentCoins += coinEarned;
        this.questResultDisplay.text =  "Found " + coinEarned + " coins and earned " + xpEarned + " xp on the quest!";
        this.lastQuestTime = this.game.time.now;
        this.checkLevelUp();
        this.updateTextDisplays();
        this.questButton.frame = 3;
    },
    
    updateTextDisplays: function(){
        this.xpTextDisplay.text = "XP: " + this.currentXp + "/" + this.getXpNeeded(this.currentLevel);
        this.levelTextDisplay.text = "Level: " + this.currentLevel;
        
        var displayMoney = this.currentCoins;
        
        var silverValue = 100;
        var goldValue = silverValue * 1000;
        var gemValue = goldValue * 10000;
    
        if(displayMoney > gemValue){
            this.gemSprite.visible = true;
            this.gemText.visible = true;
            this.gemText.text = Math.floor(displayMoney/gemValue);
            displayMoney = displayMoney % gemValue;
        }
        else{
            this.gemSprite.visible = false;
            this.gemText.visible = false;
        }
        
        if(displayMoney > goldValue){
            this.goldSprite.visible = true;
            this.goldText.visible = true;
            this.goldText.text = Math.floor(displayMoney/goldValue);
            displayMoney = displayMoney % goldValue;
        }
        else{
            this.goldSprite.visible = false;
            this.goldText.visible = false;
        }
        
        if(displayMoney > silverValue){
            this.silverSprite.visible = true;
            this.silverText.visible = true;
            this.silverText.text = Math.floor(displayMoney/silverValue);
            displayMoney = displayMoney % silverValue;
        }
        else{
            this.silverSprite.visible = false;
            this.silverText.visible = false;
        }
        
        this.copperText.text = displayMoney;
        
    },
    
    checkLevelUp: function(){
        if(this.currentXp > this.xpToLevel){
            this.currentXp -= this.xpToLevel;
            this.currentLevel++;
            this.xpToLevel = this.getXpNeeded(this.currentLevel);
        }
    },
    
    getXpNeeded: function(currentLevel){
        return (currentLevel * 100 );
    },
    
    resetQuestText: function(){
        this.questResultDisplay.text = "";
    }
    
}