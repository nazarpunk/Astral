'use_strict';

window.server = function(){
	this.setting = window.setting;
	delete window.setting;	
	this.card = window.card;
	delete window.card;
	
	this.gameState = 0;

};


server.prototype.game = function(arg){
	if (this.gameState == 1){ return this.data; }
	
	if(typeof arg == 'undefined') arg = {};
	var firstTurn = arg.firstTurn || 1;
	var secTurn = (firstTurn == 1) ? 2 : 1;

	var self = this;
	
	this.data = {
		turn: firstTurn,
		turnCounter: 1,
		p1 : {
			health : this.setting.startHealth1
		},
		p2 : {
			health : this.setting.startHealth2
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
	

	this.gameState = 1;
	return 0;

};
