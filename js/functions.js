const functions = {
	rankUp() {
		data.ranks += data.rankGain;
		data.points = 0;
		data.pointGain = 1;
	}
	tierUp() {
		data.tiers += data.tierGain;
		data.ranks = 1;
		data.points = 0;
		data.pointGain = 1;
	}
	tetrUp() {
		data.tetrs += data.tetrGain;
		data.tiers = 1;
		data.ranks = 1;
		data.points = 0;
		data.pointGain = 1;
	}
}
