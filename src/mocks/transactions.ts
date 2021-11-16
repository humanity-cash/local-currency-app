import { BusinessTransactionItem, TransactionType } from "../utils/types";

export const businessTransactions: BusinessTransactionItem[] = [
	{
		transactionId: '12345',
		type: TransactionType.SALE,
		amount: 15,
		date: "2021-08-31"
	}, {
		transactionId: '12346',
		type: TransactionType.RETURN,
		amount: 10,
		date: "2021-08-01"
	}, {
		transactionId: '12347',
		type: TransactionType.CASH_OUT,
		amount: 10,
		date: "2021-07-29"
	}, {
		transactionId: '12348',
		type: TransactionType.TRANSFER,
		amount: 10,
		date: "2021-07-28"
	}, {
		transactionId: '12349',
		type: TransactionType.CASH_OUT,
		amount: 10,
		date: "2021-07-29"
	}, {
		transactionId: '12350',
		type: TransactionType.CUSTOMER_RETURN,
		amount: 10,
		date: "2021-07-28"
	}, {
		transactionId: '12351',
		type: TransactionType.DONATION,
		amount: 10,
		date: "2021-07-27"
	}, {
		transactionId: '12352',
		type: TransactionType.PURCHASEMENT,
		amount: 10,
		date: "2021-07-26"
	}, {
		transactionId: '12349',
		type: TransactionType.SALE,
		amount: 10,
		date: "2021-07-25"
	}
];