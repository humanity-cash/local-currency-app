import { FilterType, Growth, MarketEntry } from "./types";

export const availableFilters = [
	{
		name: 'Top 10 gainers this week',
		type: FilterType.TOP_GAINS
	},
	{
		name: 'Top 10 losers this week',
		type: FilterType.TOP_LOSS
	},
	{
		name: 'Highest dividend yield',
		type: FilterType.TOP_DIVIDED
	},
	{
		name: 'Highest trade volume',
		type: FilterType.TOP_TRADE
	},
];

export const filterMarketEntries = (entries: MarketEntry[], type: FilterType | null) => {
	switch (type) {
		case FilterType.TOP_GAINS:
			return entries
				.sort((a, b) => b.changeRate - a.changeRate)
				.filter(entry => entry.diff === Growth.INCREASE);
		case FilterType.TOP_LOSS:
			return entries
				.sort((a, b) => b.changeRate - a.changeRate)
				.filter(entry => entry.diff === Growth.DECRESE);
		case FilterType.TOP_DIVIDED:
		case FilterType.TOP_TRADE:
		default:
			return entries
				.sort((a, b) => b.changeRate - a.changeRate)
	}
}