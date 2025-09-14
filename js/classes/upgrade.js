class Upgrade
{
	constructor(name,price,priceIncrease,multiplier)
	{
		this.name = name;
		this.price = price;
		this.priceIncrease = priceIncrease;
		this.multiplier = multiplier;
		this.level = E(0);
		this.subtractsPoints = true;
	}
	getMultiplier()
	{
		return this.multiplier.pow(this.level)
	}
	getPrice()
	{
		let price = this.price.mul(this.priceIncrease.pow(this.level));
		return price;
	}
	buy()
	{
		if(this.getPrice().lte(game.points))
		{
			game.points = game.points.sub(this.getPrice());
			this.level = this.level.add(1);
			return true;
		}
		return false;
	}
	buyMax()
	{
		while(this.buy())
	}
}
