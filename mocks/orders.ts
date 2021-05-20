import { Order, OrderType, StatusType } from "../utils/types";

const list: Order[] = [
	{
		id: '1233',
		name: 'Cham Group',
		type: OrderType.SELL,
		quantity: 5,
		price: 150.2,
		created: new Date('2020-08-12'),
		expires: new Date('2020-08-25'),
		status: StatusType.COMPLETE
	},
	{
		id: '1234',
		name: 'Cham Group',
		type: OrderType.SELL,
		quantity: 5,
		price: 150.2,
		created: new Date('2020-08-12'),
		expires: new Date('2020-08-25'),
		status: StatusType.PARTIALLY
	},
	{
		id: '1235',
		name: 'Weisse Arena Laax',
		type: OrderType.BUY,
		quantity: 5,
		price: 150.2,
		created: new Date('2020-08-10'),
		expires: new Date('2020-08-24'),
		status: StatusType.PROGRESS
	},
	{
		id: '1236',
		name: 'Lenzerheide Bergbahnen',
		type: OrderType.SELL,
		quantity: 5,
		price: 150.2,
		created: new Date('2020-08-09'),
		expires: new Date('2020-08-25'),
		status: StatusType.PROGRESS
	}
];

export default list;