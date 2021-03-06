'use_strict';

window.server = function(){
	this.setting = window.setting;
	delete window.setting;	
	this.card = window.card;
	delete window.card;
	
	this.gameState = 0;

};

server.prototype.turn = function(mana,card,slt){
	var player = this.data['p'+this.data.turn];
	var player2 = (this.data.turn == 1) ? this.data.p2 : this.data.p1;
	
	var slot = player.slot[slt];
	
	//add to slot
	for (var i = 1; i<=5; i++){
		player2.slot[i].skip--;
	}
	
	
	//CALCULATE DAMAGE
	var findDeath = function(){
		var arr = [];
		
		for(var i=1;i<=5;i++){	
			if (player2.slot[i].mana == '' ) continue;
			if (player2.slot[i].defence > 0 ) continue;
			
			player2.slot[i].mana = '';
			arr.push(i);
			
		};
		return arr;
	};
	
	//set start
	this.data.actions = [];
	player.healthOld = player.health;
	player2.healthOld = player2.health;

	//spell
	//summon
	if (mana != 'skip') {
		if ($.inArray(card, player.cardVisible[mana]) < 0) player.cardVisible[mana].push(card);
		if (this.card[mana][card].type=='unit') {
			slot.mana = mana;
			slot.card = card;
			slot.attack = this.card[mana][card].attack;	
			slot.defence = this.card[mana][card].defence;
			slot.skip = 1;
			
			var obj = {
				summon: slt,
				mana : slot.mana,
				card : slot.card,
				attack: slot.attack,
				defence: slot.defence,
				skip: slot.skip,
				healthOwner: player.health,
				healthEnemy: player2.health,
				slotOwner: cloneObj(player.slot),
				slotEnemy: cloneObj(player2,slot)
			};
			this.data.actions.push(obj);
		}
	}
	
	//slot attack
	for (var i=1; i<=5; i++){
		if (player.slot[i].mana == '') continue;
		if (player.slot[i].skip > 0) continue;
		
		if (player2.slot[i].mana == '') {
			player2.health -= player.slot[i].attack;	
		} else {
			player2.slot[i].defence -= player.slot[i].attack;
		}

		var obj = {
			slot: i,
			healthOwner: player.health,
			healthEnemy: player2.health,
			slotOwner: cloneObj(player.slot),
			slotEnemy: cloneObj(player2,slot),
			death: findDeath() 
		};
		this.data.actions.push(obj);
	}
	

	
	//find active slot
	for (var i = 1; i<=5; i++){
		player.slotActive = 0;
		if (player.slot[i].mana == "") {
			player.slotActive = i;
			break;
		}
	}
	
	//next player
	this.data.turnOld = this.data.turn; 
	this.data.turn = (this.data.turn == 1) ? 2 : 1;
	this.data.turnCounter++;
	
	//add mana
	for (v in this.data['p'+this.data.turn].mana) {
		this.data['p'+this.data.turn].mana[v]++;
	}

	return this.data;
};


server.prototype.game = function(arg){
	if (this.gameState == 1){ return this.data; }
	
	if(typeof arg == 'undefined') arg = {};
	var firstTurn = arg.firstTurn || rand(1,2);
	var secTurn = (firstTurn == 1) ? 2 : 1;

	var self = this;
	
	this.data = {
		turn: firstTurn,
		turnOld: secTurn,
		turnCounter: 1,
		actions:[],
		p1 : {
			health : this.setting.startHealth1,
			healthOld: this.setting.startHealth1,
		},
		p2 : {
			health : this.setting.startHealth2,
			healthOld: this.setting.startHealth2,
		}
	};
	
	//mana	
	var getMana =  function(player){
		var mana = {f:0,w:0,a:0,e:0,d:0};
		var min = self.setting['manaMin'+player];
		var max = self.setting['manaMax'+ player];
		var count = self.setting['manaStart'+player];
		
		for(var v in mana) {
			count -= min;
			if (count < 0 ) break;
			mana[v] += min;
		}
		
		var key = Object.keys(mana);
		

		for (var i = 0;true; i++){
			if (count <= 0) break;
			if (i > 4) i = 0;
			var rand = Math.random();
			if (mana[key[i]] >= max) continue;
			if (rand > 0.5) continue;
	
			mana[key[i]]++;
			count--;
		}
		return mana;
	};
	
	this.data.p1.mana = getMana(firstTurn);
	this.data.p2.mana = getMana(secTurn);
	
	//card
	var cards = {
		f:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0},
		w:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0},
		a:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0},
		e:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0},
		d:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0}
	};

	var getCard = function(player){
		var card = {f:[],w:[],a:[],e:[],d:[]};
		self.data['p'+player].cardVisible = cloneObj(card);
		
		for(var v in card) {
			for (var i = 0; i<6; i++){
				var key = Object.keys(cards[v]);
				var l = key.length-1;
				var r = rand(0,l);
				
				card[v].push(parseInt([key[r]]));
				delete cards[v][key[r]];
			}
			card[v] = card[v].sort(function(a,b){return b-a;});
		}
		return card;
	};
	
	this.data.p1.card = getCard(firstTurn);
	this.data.p2.card = getCard(secTurn);
	
	//slot
	this.data.p1.slotActive = 1;
	var slotTpl = {
		mana:"",
		card:"",
		defence:0,
		attack:0
	}; 
	
	this.data.p1.slot = {1:cloneObj(slotTpl),2:cloneObj(slotTpl),3:cloneObj(slotTpl),4:cloneObj(slotTpl),5:cloneObj(slotTpl)};
	this.data.p2.slotActive = 1;
	this.data.p2.slot = cloneObj(this.data.p1.slot);

	this.gameState = 1;
	return 0;

};
