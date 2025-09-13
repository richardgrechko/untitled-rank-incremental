let dt1 = Date.now(), dt2 = Date.now(), dt;
let update = function()
{
	dt1 = Date.now();
	dt = (dt1-dt2)/1000;
	dt2 = Date.now();
	game.points = game.pointGain.add(game.pointGain.mul(dt));
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
