let dt1 = Date.now(), dt2 = Date.now(), dt;
let update = function()
{
	dt1 = Date.now();
	dt = (dt1-dt2)/1000;
	dt2 = Date.now();
	game.points = game.points.add(game.pointGain.mul(dt));
	game.rankGain = game.points.div(1000000).mul(5).log(5).pow(1/1.05).floor();
	game.rankReqs = new Decimal(1000000).mul(new Decimal(5).pow(game.ranks.pow(1.05)));
	game.nextRank = new Decimal(1000000).mul(new Decimal(5).pow(game.ranks.add(game.rankGain).pow(1.05)));
	game.tierGain = game.ranks.pow(1/1.25).div(5).floor();
	game.tierReqs = new Decimal(5).mul(game.tiers.pow(1.25)).add(0.5).floor();
	game.nextTier = new Decimal(5).mul(game.tiers.add(game.tierGain).pow(1.25)).add(0.5).floor();
	game.tetrGain = game.tiers.pow(1/1.5).div(5).floor();
	game.tetrReqs = new Decimal(5).mul(game.tetrs.pow(1.5)).add(0.5).floor();
	game.nextTetr = new Decimal(5).mul(game.tetrs.add(game.tetrGain).pow(1.5)).add(0.5).floor();
	game.rankGain = (game.rankGain == new Decimal(NaN)) ? new Decimal(0) : game.rankGain;
	game.tierGain = (game.tierGain == new Decimal(NaN)) ? new Decimal(0) : game.tierGain;
	game.tetrGain = (game.tetrGain == new Decimal(NaN)) ? new Decimal(0) : game.tetrGain;
	requestAnimationFrame(update);
}
let onCreate = function()
{
	initialGame = functions.getSaveCode();

	functions.loadGame();

	requestAnimationFrame(update);
}
var app = new Vue({
	el: "#app",
	data: game,
	methods: functions,
	created: onCreate
});
