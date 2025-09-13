const functions = {
	rankUp() {
		game.ranks += game.rankGain;
		game.points = 0;
		game.pointGain = 1;
	},
	tierUp() {
		game.tiers += game.tierGain;
		game.ranks = 1;
		game.points = 0;
		game.pointGain = 1;
	},
	tetrUp() {
		game.tetrs += game.tetrGain;
		game.tiers = 1;
		game.ranks = 1;
		game.points = 0;
		game.pointGain = 1;
	},
	getSaveCode() {
		return btoa(unescape(encodeURIComponent(JSON.stringify(game))))
	},
	saveGame() {
		let str = getSaveCode();
		localStorage.setItem("GameSave", str)
	},
	loadGame(importString) {
		let loadVal = function(v, alt) {
			return v !== undefined ? v : alt;
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
			game.tiers = loadVal(E(obj.tiers), E(1));
			game.tierReqs = loadVal(E(obj.tierReqs), E(5));
			game.tierGain = loadVal(E(obj.tierGain), E(0));
			game.tetrs = loadVal(E(obj.tetrs), E(1));
			game.tetrReqs = loadVal(E(obj.tetrReqs), E(5));
			game.tetrGain = loadVal(E(obj.tetrGain), E(0));
		}
	}
}
