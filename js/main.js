"use strict";
function log(){Function.prototype.apply.apply(console.log, [console, arguments]);}
function rand(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1);
	rand = Math.round(rand);
	return rand;
};
function cloneObj( obj ){ return $.extend(true, {}, obj); };

window.zar = function(){
	this.setting = window.setting;
	delete window.setting;
	
	this.gameData = {
		cardsDefault : {
		F:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0},
		W:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0},
		A:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0},
		E:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0},
		D:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0}
	},

		
		P1 : {
			health: this.setting.game.P1startHealth,
			mana : {},
			card : {},
		},
		P2 : {
			health: this.setting.game.P2startHealth,
			mana : {},
			card : {}
		},
	};
};
zar.prototype.gameStartCard = function(player){
	var cards = this.gameData.cards;
	 
	var cards = this.gameData.cards; 
	var card = {F:[],W:[],A:[],E:[],D:[]};
	
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

zar.prototype.gameStartMana = function(player){
	var mana = {F:0,W:0,A:0,E:0,D:0};
	var min = this.setting.game['P'+player+'startMinMana'];
	var max = this.setting.game['P'+player+'startMaxMana'];
	var count = this.setting.game['P'+player+'startManaCount'];
	
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

zar.prototype.gameStart = function(arg){
	var fTurn = arg.firstTurn;
	var sTurn = (fTurn == 1) ? 2 : 1;

	//mana
	this.gameData.P1.mana = this.gameStartMana(fTurn);
	this.gameData.P2.mana = this.gameStartMana(sTurn);
	
	//card
	this.gameData.cards = cloneObj(this.gameData.cardsDefault);

	this.gameData.P1.card =  this.gameStartCard(fTurn);
	this.gameData.P2.card =  this.gameStartCard(sTurn);
	
	return this.gameData;
	
};

var z = new zar();

window.ui = {
	cardTpl : '<div class="playCard"></div>',
	showCard: function(player,mana){
		var imgPath = "img/card/";
		var align = (player==1) ? "L" :"R"; 

		var card = z.gameData["P"+player].card[mana];
		var wrap = $("#P"+player+"cardWrap").empty();
		
		for(var i=0;i<card.length;i++){
			var str = 'url("'+imgPath+mana+card[i]+align+'.jpg")';
			$(ui.cardTpl).html(card[i]).css("background-image",str).prependTo(wrap);
		}
	},
	gameNew : function(arg){
		if (typeof arg == "undefined") arg = {};
		
		var animate =  (typeof arg.animate == "undefined") ? true : arg.animate;  
		var turnVisible = arg.turnVisible || $("#gameTurnVisibleCheck").prop("checked");
		
		//var firstTurn = $("input[type=radio][name=gameTurnFirstCheck]:checked").val();
		var firstTurn = 0;
		if (firstTurn==0) firstTurn = rand(1,2);
		
		
		
		var modal = $("#modalGameStart");
		var game =  $("#playWrap");
		var btn = $("#gameNewBtn");
		
		var obj = z.gameStart({firstTurn:firstTurn});
		
		//log(obj)
			
		// mana
		for (var v in obj.P1.mana){	$('#P1mana'+v).html(obj.P1.mana[v]); }
		for (var v in obj.P2.mana){	$('#P2mana'+v).html(obj.P2.mana[v]); }
		
		//health
		$("#P1health").html(obj.P1.health);
		$("#P2health").html(obj.P2.health);
		
		if (animate) {
			btn.attr('disabled','disabled');
			modal.fadeOut("normal",function(){
				btn.removeAttr('disabled');
			});
			game.css({'opacity':0,'visibility':'visible'}).fadeTo(2000,1);
		} else {
			modal.hide();
			game.css({'opacity':1,'visibility':'visible'});
		}
	}
};

$(function(){
	$("#gameNewBtn").click(function(){
		ui.gameNew();
	});
	
	ui.P1cardButton = $("#P1cardBtnWrap > .playManaMenuItem");
	ui.P2cardButton = $("#P2cardBtnWrap > .playManaMenuItem");
	
	$("#playWrap").bind("mousedown",function(e){
		var self = $(e.target).closest(".playManaMenuItem"); 
		if (self.length == 1) {
			if (self.hasClass('active')) return;
			if (self.hasClass('playSkipTurnBtn')) return;		
			var id=	parseInt(self.data("player"));
			var mana = self.data("mana");
			ui["P"+id+"cardButton"].removeClass('active');
			self.addClass('active');
			ui.showCard(id,mana);
		}
	});
	
	ui.gameNew({turnVisible:true,animate:false});
});
