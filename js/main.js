let dt1 = Date.now(), dt2 = Date.now(), dt;
var E = (n) => {
	return new Decimal(n)
}
let update = function()
{
	dt1 = Date.now();
	dt = (dt1-dt2)/1000;
	dt2 = Date.now();
	game.points = game.points.add(game.pointGain.mul(dt));
	game.rankGain = game.points.div(1000000).mul(5).log(5).pow(1/1.05).floor();
	game.rankReqs = E(1000000).mul(E(5).pow(game.ranks.sub(1).pow(1.05)));
	game.nextRank = E(1000000).mul(E(5).pow(game.ranks.add(game.rankGain).sub(1).pow(1.05)));
	game.tierGain = game.ranks.pow(1/1.25).div(5).floor();
	game.tierReqs = E(5).mul(game.tiers.pow(1.25)).add(0.5).floor();
	game.nextTier = E(5).mul(game.tiers.add(game.tierGain).pow(1.25)).add(0.5).floor();
	game.tetrGain = game.tiers.pow(1/1.5).div(5).floor();
	game.tetrReqs = E(5).mul(game.tetrs.pow(1.5)).add(0.5).floor();
	game.nextTetr = E(5).mul(game.tetrs.add(game.tetrGain).pow(1.5)).add(0.5).floor();
	game.rankGain = (game.rankGain == E(NaN)) ? E(0) : game.rankGain;
	game.tierGain = (game.tierGain == E(NaN)) ? E(0) : game.tierGain;
	game.tetrGain = (game.tetrGain == E(NaN)) ? E(0) : game.tetrGain;
	game.pointGain = E(2).pow(game.ranks)
		.mul(new Decimal(1).add(game.tiers.sub(1).div(10)).pow(1.05))
		.mul(new Decimal(1).add(game.tetrs.sub(1).div(5)).pow(1.1));
	if (game.autoRank.value) {
		functions.rankUp()
	}
	if (game.autoTier.value) {
		functions.tierUp()
	}
	if (game.autoTetr.value) {
		functions.tetrUp()
	}
	requestAnimationFrame(update);
}
let onCreate = function()
{
	initialGame = functions.getSaveCode();

	functions.loadGame(initialGame);

	requestAnimationFrame(update);
}
var app = new Vue({
	el: "#app",
	data: game,
	methods: functions,
	created: onCreate
});
