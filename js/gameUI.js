'use_strict';

window.ui = function(){
	this.server = new server;
	this.bind();
	this.turn();
};

ui.prototype.bind = function(){
	var self = this;
	
	this.elem = {
		modalGameNew : $("#modalGameNew"),
		gameNewBtn : $("#gameNewBtn"),
		firstTurnInputName : "gameTurnFirstCheck",
		health1 : $("#health1"),
		health2 : $("#health2"),
		turn: $("#turn"),
		cardWrap : $(".manaMenu").bind("mousedown",function(e){
			var elem = $(e.target).closest(".manaMenuItem");
			if (elem.length == 1) self.showCard(parseInt(elem.data("player")),elem.data("mana"));
		}),
		cardWrapper : $(".manaMenuCardWrap").bind('mouseover',function(e){
			var elem = $(e.target).closest('.card');
			if(elem.length ==1) log('show')
		}).bind('mouseout',function(e){
			log('hide')
		}),
	};
	
	
	this.elem.gameNewBtn.bind('click',function(){
		var firstTurn = parseInt($('input[type=radio][name='+self.elem.firstTurnInputName+']:checked').val());
		self.game({firstTurn:firstTurn});
	});
	
	
};

ui.prototype.turn = function(){
	var s = this.server;
	
	if (s.game() == 0){
		this.elem.modalGameNew.show();
		return;
	}
	
};

ui.prototype.game = function(arg){
	if (typeof arg == 'undefined') arg = {};
	var firstTurn = arg.firstTurn || 0;

	this.elem.modalGameNew.hide();
	
	var data = this.server.game({firstTurn:firstTurn});
	this.data = data;
	
	this.refresh(data);

};

ui.prototype.refresh = function(data){
	// mana
	for (var v in data.p1.mana){	$('#mana1'+v).html(data.p1.mana[v]); }
	for (var v in data.p2.mana){	$('#mana2'+v).html(data.p2.mana[v]); }
	
	//health
	this.elem.health1.html(data.p1.health);
	this.elem.health2.html(data.p2.health);
	
	//turn
	this.elem.turn.removeClass('p1 p2').addClass('p'+data.turn).html('Ход '+data.turnCounter);
	
	//avatar
	$('.avatar').removeClass('.active');
	$("#avatar"+data.turn).addClass('active');
	
	//log(data)
};

ui.prototype.showCard = function(player,mana){
	if (mana == 'skip') return;
	
	var data = this.data;
	var imgPath = "img/card/";
	var align = (player==1) ? "L" :"R";
	
	var card = (data.turn == player) 
		? data["p"+player].card[mana]
		: data["p"+player].cardVisible[mana];
			
	var wrap = $("#cardWrap"+player).empty();
	
	//card[v] = card[v].sort(function(a,b){return b-a;});
	
	for(var i=0;i<card.length;i++){
		var str = 'url("'+imgPath+mana.toUpperCase()+card[i]+align+'.jpg")';
		var html = '<div class="cardCost">'+card[i]+'</div>';
			
		if(typeof this.server.card[mana][card[i]].attack != "undefined")
			html+='<div class="cardAttack">'+this.server.card[mana][card[i]].attack+'</div>';
			
		if(typeof this.server.card[mana][card[i]].defence != "undefined")
			html+='<div class="cardDefence">'+this.server.card[mana][card[i]].defence+'</div>';


		if(data["p"+player].mana[mana] < card[i]) html+='<div class="cardNoMana"><div>No Mana</div></div>';
			
		$("<div>").data("mana",mana).data("player",player).data("card",card[i])
			.addClass('card')
			.css("background-image",str)
			.html(html)
			.prependTo(wrap);
	}
};


$(function(){
	var u = new ui();
	
	//test
	var r = rand(1,2);
	u.game({firstTurn:r});
		
});
