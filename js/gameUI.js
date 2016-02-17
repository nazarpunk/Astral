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
		turnReplayBtn : $('#turnReplayBtn').bind('click',function(){
			if (self.data.animate) return;
			self.refresh();
			self.animate();
		}),
		cardWrapper : $(".manaMenuCardWrap").bind('mouseover',function(e){
			var elem = $(e.target).closest('.card');
			if(elem.length == 0) return;
			var player = elem.data('player');
			var mana = elem.data('mana');
			var card = elem.data('card');
			var data = self.server.card[mana][card];
			var html = '<b>'+data.name+'</b>';
			if (typeof data['attack'] != 'undefined' & data['attack'] > 0) html += '<br>Урон: <i>'+data['attack']+'</i> ';
			if (typeof data['defence'] != 'undefined') html += '<br>Жизня: <i>'+data['defence']+'</i>';
			if (typeof data['desc'] != 'undefined') html += '<br><br>'+data['desc'];
			$("#manaMenuHelp"+player).html(html).show();
		}).bind('mouseout',function(e){
			var elem = $(e.target).closest('.card');
			if(elem.length == 0) return;
			var player = elem.data('player');
			$("#manaMenuHelp"+player).hide();
		}).bind('mousedown',function(e){
			var elem = $(e.target).closest('.card');
			if (elem.length !=1) return;
			var mana = elem.data('mana');
			var card = elem.data('card');
			var type = elem.data('type');
			var player = elem.data('player');
			self.turn(mana,card,type,player);
		}),
		slotWrapper : $('#slotWrap').bind('mousedown',function(e){
			var elem = ($(e.target).hasClass('card')) ? $(e.target) : $(e.target).closest('card');
			if( elem.length == 0) return;
			
			var player = elem.data('player');
			var slot = elem.data('slot');
			
			if(self.data['p'+player].slot[slot].mana!="") return;
			self.data['p'+player].slotActive = slot;
			
			if (self.data.turn != player) return;
			$('#slotWrap .card.active').removeClass('active');
			elem.addClass('active');
		})
	};
	
	
	this.elem.gameNewBtn.bind('click',function(){
		var firstTurn = parseInt($('input[type=radio][name='+self.elem.firstTurnInputName+']:checked').val());
		self.game({firstTurn:firstTurn});
	});
	
	
};

ui.prototype.turn = function(mana,card,type,player){
	if (this.server.game() == 0){
		this.elem.modalGameNew.show();
		return;
	}
	
	if ( this.data.animate ) return;

	var slot = this.data['p'+this.data.turn].slotActive;

	if (mana != 'skip'){
		if (slot==0 & type=='unit') return;
		if (this.data['p'+this.data.turn].mana[mana] < card) return;
	}
	
	if (this.data.turn != player) return;
	
	
	this.data = this.server.turn(mana,card,slot,player);
	this.refresh(this.data);
};

ui.prototype.game = function(arg){
	if (typeof arg == 'undefined') arg = {};
	var firstTurn = arg.firstTurn || 0;

	this.elem.modalGameNew.hide();
	var data = this.server.game({firstTurn:firstTurn});
	this.data = data;
	
	this.refresh();

};

ui.prototype.animate = function(){
	this.data.animate = true; 
	data = cloneObj(this.data);
	var self = this;

	this.elem.health1.html(data.p1.healthOld);
	this.elem.health2.html(data.p2.healthOld);
	

	var spellAnim = function(data){
		var act = data.actions[0];
		var player = data.turnOld;
	};
	var summonAnim = function(data){
		var act = data.actions[0];
		var player = data.turnOld;
	
		$("#slot"+player+act.summon).animate({opacity: 0},800,function(){
			var align = (player==1) ? "L" :"R";
			
			var elem = $("#slot"+player+act.summon).css('background-image','url("img/card/'+act.mana.toUpperCase()+act.card+align+'.jpg")');
			
			elem.find('div').remove();
			if (act.attack != 0) elem.append( $('<div class="cardAttack">'+act.attack+'</div>') );			
			if (act.defence != 0) elem.append( $('<div class="cardDefence">'+act.defence+'</div>') );
			if (act.skip > 0) elem.append ( $('<div class="cardNoMana"><div>Turned</div></div>') );

			$(this).animate({opacity:1},200,function(){
				data.actions = data.actions.slice(1);
				return nextAnim(data);
			});
		});
	};
	
	var damageAnim = function(data){
		//log(cloneObj(data))
		var act = data.actions[0];
		var player = data.turnOld;
		
		var side = (data.turnOld == 1) ? 1 : -1;
		
		$("#slot"+data.turnOld+act.slot).css('z-index',100).animate({"left":side*-40},300,function(){
			$(this).animate({"left":side*20},50,function(){
				self.elem['health'+self.data.turn].html(act.healthEnemy);
				
				$('#slot'+data.turn+act.slot).find('.cardDefence').html(data['p'+data.turn].slot[act.slot].defence);
				
				$(this).animate({"left":0},function(){
					$(this).css('z-index',1);
					return deathAnim(data);
				});
			});
		});
	
	};
	
	var deathAnim = function(data) {
		
		if (data.actions[0].death.length == 0) {
			data.actions = data.actions.slice(1);
			return nextAnim(data);
		}
		//log(cloneObj(data))
		var player = data.turn;
		$("#slot"+player+data.actions[0].death[0]).animate({opacity: 0},800,function(){
			$(this).empty().css('background-image','none').animate({opacity: 1},200,function(){
				data.actions[0].death = data.actions[0].death.slice(1);
				return deathAnim(data);
			});
		});
	};

	var endAnim = function(data){
		
		$('#slot'+data.turn+data['p'+data.turn].slotActive).addClass('active');
		$('#avatar'+data.turn).addClass('active');
	
		self.elem.turn.addClass('p'+data.turn).html('Ход '+data.turnCounter);
		self.data.animate = false;
		
		//log('end',this.data);
	};

	var nextAnim = function(data){
		var act = data.actions;
		
		if (act.length == 0) return endAnim(data);
		
		if (typeof act[0].summon != 'undefined' ) return summonAnim(data);
		if (typeof act[0].slot != 'undefined' ) return damageAnim(data);
		if (typeof act[0].death != 'undefined' ) return deathAnim(data);
		//nextAnim(act.slice(1));
	};

	//remove turned
	for (var i=1;i<=5;i++){
		var player = data.turn; 
		if (data['p'+player].slot[i].skip <=0){
			$('#slot'+player+i+' .cardNoMana').animate({
				top: 50,
				left: 50,
				bottom: 50,
				right: 50
			},function(){ $(this).remove(); } );
		}
	}

	$('#slotWrap .card').removeClass('active');
	$('.avatar').removeClass('active');
	this.elem.turn.removeClass('p1 p2');

	nextAnim(data); //start recursion
};


ui.prototype.refresh = function(){
	data = this.data;

	var turn = data.turn;
	var slot = data['p'+turn].slotActive;
	
	// mana
	for (var v in data.p1.mana){	$('#mana1'+v).html(data.p1.mana[v]); }
	for (var v in data.p2.mana){	$('#mana2'+v).html(data.p2.mana[v]); }
	
	//card
	$('#manaMenu1 > div, #manaMenu2 > div').removeClass('active');
	$('#cardWrap1, #cardWrap2').empty();
	$('#manaMenuHelp1, #manaMenuHelp2').hide();

	
	//animate
	this.animate();
};

ui.prototype.showCard = function(player,mana){
	if (mana == 'skip') {
		this.turn('skip',0,0,this.data.turn);
		return;
	}
	
	$('#manaMenu'+player+' > div').removeClass('active');
	$('#cardBtn'+player+mana).addClass('active');
	
	var data = this.data;
	var imgPath = "img/card/";
	var align = (player==1) ? "L" :"R";
	
	var card = (data.turn == player) 
		? data["p"+player].card[mana]
		: data["p"+player].cardVisible[mana];
			
	var wrap = $("#cardWrap"+player).empty();
	
	//card[v] = card[v].sort(function(a,b){return b-a;});
	if (card.length == 0) $("<div>").addClass('manaMenuHelp ta-c').html('No Card').appendTo(wrap);
	
	for(var i=0;i<card.length;i++){
		var str = 'url("'+imgPath+mana.toUpperCase()+card[i]+align+'.jpg")';
		var html = '<div class="cardCost">'+card[i]+'</div>';
			
		if(typeof this.server.card[mana][card[i]].attack != "undefined")
			html+='<div class="cardAttack">'+this.server.card[mana][card[i]].attack+'</div>';
			
		if(typeof this.server.card[mana][card[i]].defence != "undefined")
			html+='<div class="cardDefence">'+this.server.card[mana][card[i]].defence+'</div>';


		if(data["p"+player].mana[mana] < card[i]) html+='<div class="cardNoMana"><div>No Mana</div></div>';
			
		$("<div>").data("mana",mana).data("player",player).data("card",card[i])
			.data('type',this.server.card[mana][card[i]].type)
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
