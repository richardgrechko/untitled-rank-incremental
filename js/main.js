let dt1 = Date.now(), dt2 = Date.now(), dt;
var E = (n) => {
	return new Decimal(n)
}
let update = function()
{
	dt1 = Date.now();
	dt = (dt1-dt2)/1000;
	dt2 = Date.now();
	game.powerReqs = E(20).mul(E(1.2).pow(game.power.pow(1.1)));
	game.rankGain = game.points.div(1000000).mul(5).div(E(5).pow(game.rank)).log(5).floor();
	game.rankReqs = E(1000000).mul(E(5).pow(game.ranks.sub(1)));
	game.nextRank = E(1000000).mul(E(5).pow(game.ranks.add(game.rankGain).sub(1)));
	game.tierGain = game.ranks.div(5).log(1.2).add(1).floor();
	game.tierReqs = E(5).mul(E(1.2).pow(game.tiers.sub(1))).add(0.5).floor();
	game.nextTier = E(5).mul(E(1.2).pow(game.tiers.add(game.tierGain).sub(1))).add(0.5).floor();
	game.tetrGain = game.tiers.div(5).log(1.2).add(1).floor();
	game.tetrReqs = E(5).mul(E(1.2).pow(game.tetrs.sub(1))).add(0.5).floor();
	game.nextTetr = E(5).mul(E(1.2).pow(game.tetrs.add(game.tetrGain).sub(1))).add(0.5).floor();
	game.rankGain = (game.rankGain == E(NaN)) ? E(0) : game.rankGain;
	game.tierGain = (game.tierGain == E(NaN)) ? E(0) : game.tierGain;
	game.tetrGain = (game.tetrGain == E(NaN)) ? E(0) : game.tetrGain;
	game.pointGain = E(2).pow(game.ranks.sub(1))
		.mul(new Decimal(1).add(game.tiers.sub(1).div(10)).pow(1.05))
		.mul(new Decimal(1).add(game.tetrs.sub(1).div(5)).pow(1.1))
		.pow(game.power.div(10).add(1).sqrt())
		.mul(game.power.div(10).add(1).sqrt())
		.mul(game.points.add(1).log10().add(1).pow(game.power.div(10)));
	game.points = game.points.add(game.pointGain.mul(dt));
	while(game.autoPower.value && functions.empower())
	if (game.autoRank.value && game.points.gte(game.rankReqs)) {
		functions.rankUp()
	}
	if (game.autoTier.value && game.ranks.gte(game.tierReqs)) {
		functions.tierUp()
	}
	if (game.autoTetr.value && game.tiers.gte(game.tetrReqs)) {
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
