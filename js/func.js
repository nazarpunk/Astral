'use_strict';
function log(){Function.prototype.apply.apply(console.log, [console, arguments]);}

function rand(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1);
	rand = Math.round(rand);
	return rand;
};

function cloneObj( obj ){ return $.extend(true, {}, obj); };
