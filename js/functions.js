const functions = {
	empower() {
		if (!game.powerSubtractsPoints) {
			game.points = game.points.sub(game.powerReqs)
		}
		game.power = game.power.add(1)
	},
	rankUp() {
		game.ranks = game.ranks.add(game.rankGain);
		if (!game.ranksDoNotReset) {
			game.power = new Decimal(0);
			game.points = new Decimal(0);
		}
	},
	tierUp() {
		game.tiers = game.tiers.add(game.tierGain);
		if (!game.tiersDoNotReset) {
			game.ranks = new Decimal(1);
			game.power = new Decimal(0);
			game.points = new Decimal(0);
		}
	},
	tetrUp() {
		game.tetrs = game.tetrs.add(game.tetrGain);
		if (!game.tetrsDoNotReset) {
			game.tiers = new Decimal(1);
			game.ranks = new Decimal(1);
			game.power = new Decimal(0);
			game.points = new Decimal(0);
		}
	},
	getSaveCode() {
		return btoa(unescape(encodeURIComponent(JSON.stringify(game))))
	},
	saveGame() {
		let str = getSaveCode();
		localStorage.setItem("GameSave", str)
	},
	gte_no_undefined(n1,n2) {
		return (n1 == undefined) ? false : n1.gte(n2)
	},
	lte_no_undefined(n1,n2) {
		return (n1 == undefined) ? false : n1.lte(n2)
	},
	loadGame(importString) {
		let loadVal = function(v, alt) {
			return (v.layer == NaN || v == undefined) ? alt : v;
		}

		let item = importString !== undefined ? importString : localStorage.getItem("GameSave");
		if(item !== null)
		{
 			let obj;
			try
			{
				obj = JSON.parse(decodeURIComponent(escape(atob(item))));
        		}
				catch(e)
        		{
				alert("Error loading Game: " + e);
				return;
			}
			game.points = loadVal(E(obj.points), E(1));
			game.pointGain = loadVal(E(obj.pointGain), E(1));
			game.ranks = loadVal(E(obj.ranks), E(1));
			game.rankReqs = loadVal(E(obj.rankReqs), E(1000000));
			game.rankGain = loadVal(E(obj.rankGain), E(0));
			game.nextRank = loadVal(E(obj.nextRank), E(1000000));
			game.tiers = loadVal(E(obj.tiers), E(1));
			game.tierReqs = loadVal(E(obj.tierReqs), E(5));
			game.tierGain = loadVal(E(obj.tierGain), E(0));
			game.nextTier = loadVal(E(obj.nextTier), E(5));
			game.tetrs = loadVal(E(obj.tetrs), E(1));
			game.tetrReqs = loadVal(E(obj.tetrReqs), E(5));
			game.tetrGain = loadVal(E(obj.tetrGain), E(0));
			game.nextTetr = loadVal(E(obj.nextTetr), E(5));
		}
	},
	format(options) {
		function commaFormat(num) {
			let portions = num.split(".")
			portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
			if (portions.length == 1)
				return portions[0]
			return portions[0] + "." + portions[1]
		}
		options = {
			num: (options.num.layer == NaN) ? new Decimal(1) : options.num,
			precision: options.precision ?? 3,
		}
		if (functions.gte_no_undefined(options.num,"10^^1e6")) {
			return "F" + functions.format({num: options.num.slog().floor(), precision: 0});
		} else if (functions.gte_no_undefined(options.num,"10^^10")) {
			return functions.format({num: E(10).pow(options.num.slog().sub(options.num.slog().floor())), precision: 3}) + "F" + functions.format({num: options.num.slog().floor(), precision: 0});
		} else if (functions.gte_no_undefined(options.num,"ee10")) {
			return "e" + functions.format({num: options.num.log10().floor(), precision: 0});
		} else if (functions.gte_no_undefined(options.num,"e10")) {
			return functions.format({num: E(10).pow(options.num.log10().sub(options.num.log10().floor())), precision: 3}) + "e" + functions.format({num: options.num.log10().floor(), precision: 0});
		} else if (functions.gte_no_undefined(options.num,"1000000")) {
			return commaFormat(options.num.floor().toString());
		} else if (functions.gte_no_undefined(options.num,"1000")) {
			return commaFormat(Number(options.num).toFixed(options.precision));
		} else if (functions.gte_no_undefined(options.num,"0")) {
			return Number(options.num).toFixed(options.precision);
		};
	},
	removeNaN(number) {
		return number.layer == NaN ? E(0) : number
	}
}
