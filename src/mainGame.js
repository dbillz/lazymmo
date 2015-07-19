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
    this.inventorySprites = {};
    
    this.inventorySize = 72;
    
    this.equippedItemSprites = {};
    
    this.itemSlots = [this.HEAD_SLOT,this.NECK_SLOT,this.CHEST_SLOT,this.BELT_SLOT,this.LEG_SLOT,this.FOOT_SLOT,this.SHOULDER_SLOT,this.WRIST_SLOT,this.HAND_SLOT,this.WEAPON_SLOT,this.BACK_SLOT,this.RING_SLOT];

    this.equipmentString;
    
    
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
        this.updateEquippedItemsSprites();
        
        this.equipmentString = this.game.add.text(550,0,"Equipped items",this.textStyle);
    },
    
    update: function(){
        if(this.game.time.now > (this.lastQuestTime + this.QUEST_TEXT_RESET_TIME)){
            this.resetQuestText();
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
        this.removeItem(item);
        this.updateEquippedItemsSprites();
        this.drawEquipment();
    },
    
    inventoryItemClick: function(itemSprite, pointer){
        
        if(this.game.input.mouse.button==2){
            this.sellItem(itemSprite.item);
        }
        else{
            this.equipItem(itemSprite.item);
        }
    },
    
    
    unequipItem: function(slot){
        if(typeof this.player.equipment[slot] != 'undefined' && this.player.equipment[slot] != null){
            console.log("pushed " + this.player.equipment[slot].rarity + " " +  this.player.equipment[slot].slot + "  to inventory");
            this.player.inventory.push(this.player.equipment[slot]);
            console.log("Inventory size is " + this.player.inventory.length);
        } 
    },
    
    addItem: function(item){
        if(this.player.inventory.length < this.inventorySize){
            this.player.inventory.push(item);
            this.drawEquipment();
        }
        else{
            console.log("Couldn't add item! Item destroyed. Sucks to be you!");
        }
        
    },
    
    sellItem: function(item){
      var value = 0;
      switch(item.rarityInt){
          case 0: value = Math.floor(Math.random()*80 + 20); break;
          case 1: value = Math.floor(Math.random()*900 + 100); break;
          case 2: value = Math.floor(Math.random()*8000 + 2000); break;
          case 3: value = Math.floor(Math.random()*90000 + 10000); break;
      }
       this.questResultDisplay.text =  "Sold item for " + value + " coins!";
       this.lastQuestTime = this.game.time.now;
      this.currentCoins += value;
      this.removeItem(item);
      this.updateTextDisplays();
    },
    
    removeItem: function(item){
        var index = this.player.inventory.indexOf(item);
        if(index > -1){
            this.player.inventory.splice(index,1);
        }
        this.drawEquipment();
    },
    
    createRandomItem: function(minRarity, maxRarity){
        var rarity;
        var rarityRoll = Math.floor(Math.random()*1000)+1;
        
        if(rarityRoll < 750){
            rarity = minRarity;
        }
        else if(rarityRoll < 900){
            rarity = Math.min(minRarity+1, maxRarity);
        }
        else if(rarityRoll < 999){
            rarity = Math.min(minRarity+2, maxRarity);
        }
        else{
            rarity = Math.min(minRarity+3, maxRarity);
        }
        
        var slot = Math.floor(Math.random()*12);
        switch(slot){
            case 0: return this.createItem(this.BACK_SLOT,rarity); break;
            case 1: return this.createItem(this.BELT_SLOT,rarity);break;
            case 2: return this.createItem(this.CHEST_SLOT,rarity);break;
            case 3: return this.createItem(this.FOOT_SLOT,rarity);break;
            case 4: return this.createItem(this.HAND_SLOT,rarity);break;
            case 5: return this.createItem(this.HEAD_SLOT,rarity);break;
            case 6: return this.createItem(this.LEG_SLOT,rarity);break;
            case 7: return this.createItem(this.NECK_SLOT,rarity);break;
            case 8: return this.createItem(this.RING_SLOT,rarity);break;
            case 9: return this.createItem(this.SHOULDER_SLOT,rarity);break;
            case 10: return this.createItem(this.WEAPON_SLOT,rarity);break;
            case 11: return this.createItem(this.WRIST_SLOT,rarity);break;
        }
    },
    
    createItem: function(slot, rarity){
        var item = {};
        item.slot = slot;
        item.rarityInt = rarity;
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
            case this.SHOULDER_SLOT: spritesheet = "shoulders0"; break;
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
        var initialxLoc = 0;
        var xLoc = initialxLoc;
        var yLoc = 400;
        var maxXLoc = xLoc + 64*11;
        
        for(var i = 0; i < this.inventorySprites.length; i++){
            this.inventorySprites[i].kill();
        }
        this.inventorySprites = [];
        for(var i = 0; i < this.player.inventory.length; i++){
            this.inventorySprites[i] = this.game.add.sprite(xLoc,yLoc,this.getSpritesheetForItem(this.player.inventory[i]));
            this.inventorySprites[i].frame = this.player.inventory[i].rarityInt;
            this.inventorySprites[i].inputEnabled = true;
            this.inventorySprites[i].events.onInputDown.add(this.inventoryItemClick, this);
            this.inventorySprites[i].item = this.player.inventory[i];
            xLoc += 64;
            if(xLoc > maxXLoc){
                xLoc = initialxLoc;
                yLoc+=64;
            }
        }
        
    },
    
    doQuest: function(){
        var xpEarned = Math.floor(Math.random()*10);
        var coinEarned = Math.floor(Math.random()*5*this.currentLevel);
        var lootChance = 20;
        var improvedChance = 100;
        var epicChance = 1000;
        var lootRoll = Math.floor(Math.random()*lootChance);
        var improvedRoll = Math.floor(Math.random()*improvedChance);
        var epicRoll = Math.floor(Math.random()*lootChance);
        this.currentXp += xpEarned;
        this.currentCoins += coinEarned;
        
        
        if(epicRoll == 0){
            console.log("Epic roll!");
            var newItem = this.createRandomItem(2,3);
            this.questResultDisplay.text =  "Got " + coinEarned + " coins, " + xpEarned + " XP and Loot: " + newItem.rarity + " "+ newItem.slot;
            this.addItem(newItem);
        }
        else if(improvedRoll == 0){
            console.log("Improved roll");
            var newItem = this.createRandomItem(1,3);
            this.questResultDisplay.text =  "Got " + coinEarned + " coins, " + xpEarned + " XP and Loot: " + newItem.rarity + " "+ newItem.slot;
            this.addItem(newItem);
        }
        else if(lootRoll == 0){
            var newItem = this.createRandomItem(0,2);
            this.questResultDisplay.text =  "Got " + coinEarned + " coins, " + xpEarned + " XP and Loot: " + newItem.rarity + " "+ newItem.slot;
            this.addItem(newItem);
        }
        else{
            this.questResultDisplay.text =  "Got " + coinEarned + " coins and " + xpEarned + " XP";
        }
        
        
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
        var goldValue = silverValue * 100;
        var gemValue = goldValue * 100;
    
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
    },
    
    
    updateEquippedItemsSprites: function(){
        this.equippedItemSprites = [];
        var xLoc = 600;
        var initialXLoc = xLoc;
        var maxXLoc = xLoc + 64*3;
        var yLoc = 50;
        for(var i = 0; i < this.itemSlots.length; i++){
            var thisSlot = this.itemSlots[i];
            if(typeof this.player.equipment[thisSlot] != 'undefined' && this.player.equipment[thisSlot] != null){
                var equippedItemSprite = this.game.add.sprite(xLoc,yLoc,this.getSpritesheetForItem(this.player.equipment[thisSlot]));
                equippedItemSprite.frame = this.player.equipment[thisSlot].rarityInt;
                this.equippedItemSprites.push(equippedItemSprite);
                xLoc += 64;
                if(xLoc >= maxXLoc){
                    xLoc = initialXLoc;
                    yLoc += 64;
                }
            }
        }
    }
    
}