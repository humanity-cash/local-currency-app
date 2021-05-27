import { Growth, MarketEntry, DocumentFile, OrderType, ShareEntry } from "../utils/types";

const t1 = 'Die Weisse Arena Gruppe ist eine integrierte Dienstleistungsunternehmung in der Tourismus- und Freizeitbranche im Kanton Graubünden in der Schweiz. Die Unternehmung ist verantwortlich für die Vermarktung der Destination Flims Laax Falera und positioniert deren Freizeitangebote ganzjährig unter den beiden Marken Flims und LAAX.';
const t2 = 'Zur Unternehmensgruppe gehören eine Bergbahnunternehmung, diverse Hotel- und Gastronomiebetriebe, Sport und Rental Shops, eine Ski-, Snowboard- und Bikeschule sowie eine Management- und eine Baugesellschaft.';

const list: MarketEntry[] = [
	{
		id: '2345',
		name: 'Cham Group',
		changeRate: 10,
		diff: Growth.DECRESE,
		price: 400,
		description: [t1, t2],
		companyValue: 200000000,
		totalShares: 1200,
		nominalValue: 80,
		dividend: 6.0,
		tradedShares: 600,
		tradedValue: 1000000,
		wanted: [
			{
				price: 30.5,
				quantity: 70,
				type: OrderType.SELL
			},
			{
				price: 80.5,
				quantity: 70,
				type: OrderType.SELL
			},{
				price: 100.5,
				quantity: 170,
				type: OrderType.SELL
			}
		],
		offered: [
			{
				price: 30.5,
				quantity: 70,
				type: OrderType.BUY
			},
			{
				price: 80.5,
				quantity: 70,
				type: OrderType.BUY
			},{
				price: 100.5,
				quantity: 170,
				type: OrderType.BUY
			}
		],
		files: [
			{
				name: 'Some document',
				filename: require('../../assets/document.pdf')
			},
			{
				name: 'Some document 2',
				filename: require('../../assets/document.pdf')
			}
		]
	},
	{
		id: '2346',
		name: 'CKW',
		changeRate: 6,
		diff: Growth.DECRESE,
		price: 400,
		description: [t1, t2],
		companyValue: 200000000,
		totalShares: 1200,
		nominalValue: 80,
		dividend: 6.0,
		tradedShares: 600,
		tradedValue: 1000000,
		wanted: [
			{
				price: 30.5,
				quantity: 70,
				type: OrderType.SELL
			},
			{
				price: 80.5,
				quantity: 70,
				type: OrderType.SELL
			},{
				price: 100.5,
				quantity: 170,
				type: OrderType.SELL
			}
		],
		offered: [
			{
				price: 30.5,
				quantity: 70,
				type: OrderType.BUY
			},
			{
				price: 80.5,
				quantity: 70,
				type: OrderType.BUY
			},
			{
				price: 100.5,
				quantity: 170,
				type: OrderType.BUY
			},
			{
				price: 101.5,
				quantity: 120,
				type: OrderType.BUY
			}
		],
		files: [
			{
				name: 'Some document',
				filename: require('../../assets/document.pdf')
			},
			{
				name: 'Some document 2',
				filename: require('../../assets/document.pdf')
			}
		]
	},
	{
		id: '2347',
		name: 'Weisse Arena Laax',
		changeRate: 16,
		diff: Growth.INCREASE,
		price: 400,
		description: [t1, t2],
		companyValue: 200000000,
		totalShares: 1200,
		nominalValue: 80,
		dividend: 6.0,
		tradedShares: 600,
		tradedValue: 1000000,
		wanted: [
			{
				price: 30.5,
				quantity: 70,
				type: OrderType.SELL
			},
			{
				price: 80.5,
				quantity: 70,
				type: OrderType.SELL
			},{
				price: 100.5,
				quantity: 170,
				type: OrderType.SELL
			}
		],
		offered: [
			{
				price: 30.5,
				quantity: 70,
				type: OrderType.BUY
			},
			{
				price: 80.5,
				quantity: 70,
				type: OrderType.BUY
			},{
				price: 100.5,
				quantity: 170,
				type: OrderType.BUY
			}
		],
		files: [
			{
				name: 'Some document',
				filename: require('../../assets/document.pdf')
			},
			{
				name: 'Some document 2',
				filename: require('../../assets/document.pdf')
			}
		]
	},
	{
		id: '2348',
		name: 'Lenzerheide Bergbahnen',
		changeRate: 6,
		diff: Growth.INCREASE,
		price: 400,
		description: [t1, t2],
		companyValue: 200000000,
		totalShares: 1200,
		nominalValue: 80,
		dividend: 6.0,
		tradedShares: 600,
		tradedValue: 1000000,
		wanted: [
			{
				price: 30.5,
				quantity: 70,
				type: OrderType.SELL
			},
			{
				price: 80.5,
				quantity: 70,
				type: OrderType.SELL
			},{
				price: 100.5,
				quantity: 170,
				type: OrderType.SELL
			}
		],
		offered: [
			{
				price: 30.5,
				quantity: 70,
				type: OrderType.BUY
			},
			{
				price: 80.5,
				quantity: 70,
				type: OrderType.BUY
			},{
				price: 100.5,
				quantity: 170,
				type: OrderType.BUY
			}
		],
		files: [
			{
				name: 'Some document',
				filename: require('../../assets/document.pdf')
			},
			{
				name: 'Some document 2',
				filename: require('../../assets/document.pdf')
			}
		]
	}
];

export default list