import { MyTransactionItem, MerchantTransactionItem, MerchantTransactionType } from "../utils/types";

export const consumerTransactions: MyTransactionItem[] = [
	{
		transactionId: 1,
		avatar: "feed1.png",
		name: "Dory & Ginger1",
		type: "PURCHASE",
		amount: "10.00",
		date: "2021-08-02"
	}, {
		transactionId: 2,
		avatar: "feed1.png",
		name: "Dory & Ginger2",
		type: "PURCHASE",
		amount: "20.00",
		date: "2021-08-03"
	}, {
		transactionId: 3,
		avatar: "feed1.png",
		name: "Dory & Ginger3",
		type: "PURCHASE",
		amount: "0.34",
		date: "2021-08-04"
	}, {
		transactionId: 4,
		avatar: "feed1.png",
		name: "Dory & Ginger3",
		type: "PURCHASE",
		amount: "350.00",
		date: "2021-08-05"
	}, {
		transactionId: 5,
		avatar: "feed1.png",
		name: "Abbott's Service",
		type: "PURCHASE",
		amount: "10.00",
		date: "2021-08-01"
	}, {
		transactionId: 6,
		avatar: "feed1.png",
		name: "Dory & Ginger3",
		type: "PURCHASE",
		amount: "10.00",
		date: "2021-08-08"
	}, {
		transactionId: 7,
		avatar: "feed1.png",
		name: "Dory & Ginger3",
		type: "PURCHASE",
		amount: "3.00",
		date: "2021-08-08"
	}, {
		transactionId: 8,
		avatar: "feed1.png",
		name: "Dory & Ginger3",
		type: "PURCHASE",
		amount: "15.00",
		date: "2021-08-09"
	}, {
		transactionId: 9,
		avatar: "feed1.png",
		name: "Cash out to USD",
		type: "PURCHASE",
		amount: "20.00",
		date: "2021-08-05"
	}, {
		transactionId: 10,
		avatar: "feed1.png",
		name: "Dory & Ginger3",
		type: "PURCHASE",
		amount: "30.00",
		date: "2021-08-04"
	}
];

export const merchantTransactions: MerchantTransactionItem[] = [
	{
		transactionId: '12345',
		type: MerchantTransactionType.SALE,
		amount: 15,
		date: "2021-08-31"
	}, {
		transactionId: '12346',
		type: MerchantTransactionType.RETURN,
		amount: 10,
		date: "2021-08-01"
	}, {
		transactionId: '12347',
		type: MerchantTransactionType.CASH_OUT,
		amount: 10,
		date: "2021-07-29"
	}, {
		transactionId: '12348',
		type: MerchantTransactionType.TRANSFER,
		amount: 10,
		date: "2021-07-28"
	}, {
		transactionId: '12349',
		type: MerchantTransactionType.CASH_OUT,
		amount: 10,
		date: "2021-07-29"
	}, {
		transactionId: '12350',
		type: MerchantTransactionType.CUSTOMER_RETURN,
		amount: 10,
		date: "2021-07-28"
	}, {
		transactionId: '12351',
		type: MerchantTransactionType.DONATION,
		amount: 10,
		date: "2021-07-27"
	}, {
		transactionId: '12352',
		type: MerchantTransactionType.PURCHASEMENT,
		amount: 10,
		date: "2021-07-26"
	}, {
		transactionId: '12349',
		type: MerchantTransactionType.SALE,
		amount: 10,
		date: "2021-07-25"
	}
];