const game = {
	points: new Decimal(0),
	pointGain: new Decimal(1),
	ranks: new Decimal(1),
	rankReqs: new Decimal(1000000),
	rankGain: new Decimal(0),
	tiers: new Decimal(1),
	tierReqs: new Decimal(5),
	tierGain: new Decimal(0),
	tetrs: new Decimal(1),
	tetrReqs: new Decimal(5),
	tetrGain: new Decimal(0),
	ranksDoNotReset: false,
	tiersDoNotReset: false,
	tetrsDoNotReset: false,
	autoRank: {
		enabled: false,
		value: false,
	},
	autoTier: {
		enabled: false,
		value: false,
	},
	autoTetr: {
		enabled: false,
		value: false,
	},
};
