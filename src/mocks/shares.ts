import { Growth, Share } from "../utils/types";

const list: Share[] = [
	{
		id: '1234',
		marketEntryId: '2345',
		name: 'Cham Group',
		changeRate: 10,
		diff: Growth.INCREASE,
		quantity: 100,
		price: 303,
		yield: 0.13
	},
	{
		id: '1236',
		marketEntryId: '2347',
		name: 'Weisse Arena Laax',
		changeRate: 10,
		diff: Growth.INCREASE,
		quantity: 20,
		price: 403,
		yield: 0.13
	},
	{
		id: '1237',
		marketEntryId: '2348',
		name: 'Lenzerheide Bergbahnen',
		changeRate: 10,
		diff: Growth.DECRESE,
		quantity: 20,
		price: 403,
		yield: 0.13
	}
];

export default list;