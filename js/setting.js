"use_strict";
window.setting = {};
window.setting.game = {
	P1startHealth : 50,
	P2startHealth : 50,
	P1startCardCount : 20,
	P2startCardCount : 19,
	P1startManaCount: 20,
	P2startManaCount: 19,
	P1startMinMana: 2,
	P2startMinMana: 2,
	P1startMaxMana: 6,
	P2startMaxMana: 6,

};
window.setting.card = {
	F:{
		1 : {
			type: "magic",
			name: "Огненные капли",
			desc: "Дамажит 3 вражеским юнитам"
		},
		2 : {
			type: "unit",
			attack: 4,
			defence: 12,
			name: "Гопник",
			desc: "Если при влёте Огонь хозяина меньше 6 дамажит хозяина на 4"
		},
		3 : {
			type: "magic",
			name: "Ритуал",
			desc: "+5 Огню (+2 профит) - 1 Воды врагу"
		},
		4 : {
			type: "unit",
			attack: 0,
			defence: 20,
			name: "Стенка",
			desc: "При влёте дамажит 3 врагу"
		},
		5 : {
			type: "unit",
			attack: 4,
			defence: 15,
			name: "Минотавр",
			desc: "При влёте -2 Земли врагу"
		},
		6 : {
			type: "magic",
			name: "Волна",
			desc: "Огонь/2+4 дамага юнитам врага"
		},
		7 : {
			type: "unit",
			attack: 2,
			defence: 24,
			name: "Саламандер",
			desc: "-1 Огонь себе каждый ход, сплэш"
		},
		8 : {
			type: "magic",
			name: "Инферно",
			desc: "Огонь/2+4 дамага вражеским юнитам и врагу"
		},
		9 : {
			type: "unit",
			attack: 6,
			defence: 20,
			name: "Варлорд",
			desc: "+50% атаки своим юнитам"
		},
		10 : {
			type: "unit",
			attack: -1,
			defence: 40,
			name: "Элементаль",
			desc: "Дамаг = Огонь, +1 огонь каждый ход, при влёте -2 дамага юнитам и жизням врага"
		},
		11 : {
			type: "magic",
			name: "Армагедец",
			desc: "5+Огонь дамага всем юнитам и врагу"
		},
		12 : {
			type: "unit",
			attack: 8,
			defence: 40,
			name: "Дракоша",
			desc: "Заклы хозяина +50% дамаги"
		}
	},
	W : {
		1 : {
			type: "magic",
			name: "Вода",
			desc: "Вода/2+3 хила хозяину в жизни"
		},
		2 : {
			type: "unit",
			attack: 2,
			defence: 10,
			name: "Водяной",
			desc: "При влёте +1 Земли хозяину"
		},
		3 : {
			type: "Magic",
			name: "Весы",
			desc: "Каждый юнит врага дамажит сам себя"
		},
		4 : {
			type: "unit",
			attack: 5,
			defence: 18,
			name: "Мокрая баба",
			desc: "Перед каждой атакой дамажит 2 хозяину если Вода меньше чем у врага"
		},
		5 : {
			type: "magic",
			name: "Болт",
			desc: "Вода+3 дамаги врагу"
		},
		6 : {
			type: "unit",
			attack: 3,
			defence: 15,
			name: "Гуардиан",
			desc: "Срезает 50% дамаги по жизням хозяина"
		},
		7 : {
			type: "unit",
			attack: 5,
			defence: 24,
			name: "Жаба",
			desc: "При влёте 5 дамага в жизни врага"
		},
		8 : {
			type: "unit",
			name: "Челябинский дождь",
			desc: "15 дамага ВСЕМ юнитам, -1 всей магии противника"
		},
		9 : {
			type: "unit",
			attack: 4,
			defence: 30,
			name: "Крановщик",
			desc: "+1 Вода себе, -1 Вода врагу каждый ход"
		},
		10 : {
			type: "unit",
			attack: -1,
			defence: 40,
			name: "Элементаль",
			desc: "+1 воды каждый ход, при влёте хилит 8 хозяину"
		},
		11 : {
			type: "unit",
			attack: 2,
			defence: 24,
			name: "Супербаба",
			desc: "+1 всей магии хозяину каждый ход"
		},
		12 : {
			type: "unit",
			attack: 1,
			defence: 15,
			name: "Обломщик",
			desc: "-1 всей маны врагу каждый ход"
		}
	},
	A : {
		1 : {
			type: "unit",
			attack: 3,
			defence: 8,
			name: "Фея",
			desc: "Заклы +1 к дамагу"
		},
		2 : {
			type: "unit",
			attack: 3,
			defence: 9,
			name: "Грифон",
			desc: "Если Воздух хозяина больше 5 дамажит 5 по врагу"
		},
		3 : {
			type: "unit",
			attack: 2,
			defence: 12,
			name: "Жрец",
			desc: "+1 Воздух хозяину каждый ход"
		},
		4 : {
			type: "unit",
			attack: 4,
			defence: 12,
			name: "Вирерн",
			desc: "При влте дамажит 5 самого жирного юнита врага"
		},
		5 : {
			type: "magic",
			name: "Гипноз",
			desc: "Два самых сильных юнита врага дамажат врага"
		},
		6 : {
			type: "magic",
			name: "Молния",
			desc: "Воздух +5 дамага врагу"
		},
		7 : {
			type: "unit",
			attack: 5,
			defence: 18,
			name: "Феникс",
			desc: "Воскрешается если Огонь>9"
		},
		8 : {
			type: "magic",
			name: "Чайн",
			desc: "Дамажит Воздух-1 юнитам и жизням врага"
		},
		9 : {
			type: "magic",
			name: "Торнадо",
			desc: "Уносит самого жирного юнита врага"
		},
		10 : {
			type: "unit",
			attack: -1,
			defence: 40,
			name: "Элементаль",
			desc: "Дамаг = Воздух, +1 Воздуха каждый ход, при влёте дамажит 6 в жизни врага"
		},
		11 : {
			type: "unit",
			attack: 5,
			defence: 18,
			name: "Тучка",
			desc: "сплэш -1 к Воздуху хозяина"
		},
		12 : {
			type: "unit",
			attack: 6,
			defence: 40,
			name: "Архангел",
			desc: "при влте полностью хилит своих"
		}
	},
	E : {
		1 : {
			type: "unit",
			attack: 1,
			defence: 10,
			name: "Пельф хилер",
			desc: "+2хила в жизнь каждый ход"
		},
		2 : {
			type: "unit",
			attack: 1,
			defence: 8,
			name: "Пельф защитник",
			desc: "-1дамаг по жизням и по юнитам"
		},
		3 : {
			type: "unit",
			attack: 1,
			defence: 16,
			name: "Дриада",
			desc: "сплэш"
		},
		4 : {
			type: "magic",
			name: "Булыжник",
			desc: "хилит 5 магу и юнитам"
		},
		5 : {
			type: "unit",
			attack: 1,
			defence: 14,
			name: "Дедок",
			desc: "Качер +2 земли"
		},
		6 : {
			type: "magic",
			name: "Гербарий",
			desc: "земля*2 хила в жизни"
		},
		7 : {
			type: "unit",
			attack: 5,
			defence: 16,
			name: "Пельф",
			desc: "+2смерти -1 земли качер"
		},
		8 : {
			type: "unit",
			attack: 5,
			defence: 24,
			name: "Тролль",
			desc: "регенит 3"
		},
		9 : {
			type: "unit",
			attack: 1,
			defence: 24,
			name: "Хилер",
			desc: "хилит 2 всем своим юнитами и жизню"
		},
		10 : {
			type: "magic",
			name: "Метеориты",
			desc: "дамаэит 20 по всем юнитам, если Земля > 11 своих не бьт"
		},
		110 : {
			type: "unit",
			attack: -1,
			defence: 60,
			name: "Элементаль",
			desc: "+1земли качер"
		},
		12 : {
			type: "unit",
			attack: 3,
			defence: 40,
			name: "Гидра",
			desc: "сплэш, регенит 4"
		}
	},
	D : {
		1 : {
			type: "unit",
			attack: 3,
			defence: 12,
			name: "Скелетик",
			desc: "при влте дамажит 1 хозяину"
		},
		2 : {
			type: "unit",
			attack: 2,
			defence: 13,
			name: "Зомбя",
			desc: "регенит 2"
		},
		3 : {
			type: "magic",
			name: "Рогатина",
			desc: "дамажит 2 врагу и срубает ему -1 всей магии"
		},
		4 : {
			type: "unit",
			attack: 2,
			defence: 16,
			name: "Кипер",
			desc: "дат 1 смерть зап каждого убитого"
		},
		5 : {
			type: "unit",
			attack: 2,
			defence: 15,
			name: "Файрдемон",
			desc: "+1 огонь за каждый ход"
		},
		6 : {
			type: "unit",
			attack: 3,
			defence: 15,
			name: "Бабка",
			desc: "При влте срезает -1 магии врагу"
		},
		7 : {
			type: "unit",
			attack: 4,
			defence: 16,
			name: "Яйцерез",
			desc: "при влте дамажит 8 врагу"
		},
		8 : {
			type: "magic",
			name: "Отсос",
			desc: "Смерть/2+5"
		},
		9 : {
			type: "unit",
			attack: 0,
			defence: 50,
			name: "Некростенка",
			desc: "хилит и регенит +3 за каждую смерть"
		},
		10 : {
			type: "unit",
			attack: 6,
			defence: 30,
			name: "Лич",
			desc: "при влте дамажит 4 юнитам врага и врагу"
		},
		11 : {
			type: "unit",
			attack: 8,
			defence: 30,
			name: "Вампир",
			desc: "регенит 1 за каждые 2 дамага от себя"
		},
		12 : {
			type: "magic",
			name: "Рука",
			desc: "килит всех, за каждого 3 зила"
		}
		
	}
};