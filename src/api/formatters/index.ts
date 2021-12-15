import { IWallet } from "@humanity.cash/types";
import { AxiosPromiseResponse, ITransaction, IEvent } from "src/api/types";
import { MiniTransaction } from "src/utils/types";

const formatTransactionValue = (value: number | string): string => {
	return String((Number(value) / 1000000000000000000).toFixed(2))
}

export const formatDeposits = (response: AxiosPromiseResponse<[]>): MiniTransaction[] => {
	return response?.data?.map((tx: any) => {
		return {
			transactionHash: tx.transactionHash,
			blockNumber: tx.blockNumber,
			timestamp: tx.timestamp * 1000,
			fromName: tx.fromName,
			type: "Deposit",
			toName: tx.toName,
			value: formatTransactionValue(tx.value)
		}
	})
}

export const formatWithdrawals = (response: AxiosPromiseResponse<[]>)
	: MiniTransaction[] => {
	return response?.data?.map((tx: any) => {
		return {
			transactionHash: tx.transactionHash,
			blockNumber: tx.blockNumber,
			timestamp: tx.timestamp * 1000,
			toName: tx.toName,
			fromName: tx.fromName,
			type: "Withdraw",
			value: formatTransactionValue(tx.value)
		}
	})
}

export const formatTransactions = (res: AxiosPromiseResponse): MiniTransaction[] => {
	if (!res.data) return [];

	const list = res.data as ITransaction[];
	return list.map((tx) => {
		return {
			transactionHash: tx.transactionHash,
			blockNumber: tx.blockNumber,
			timestamp: tx.timestamp * 1000,
			toName: tx.toName,
			fromName: tx.fromName,
			type: tx.type,
			value: formatTransactionValue(tx.value)
		};
	});
}

export const fundingSource = (res: AxiosPromiseResponse): boolean => {
	if (!res.data) return false;

	if (res.data.body?._embedded["funding-sources"]?.length > 0) return true;
	else return false;
}

export const userData = (res: AxiosPromiseResponse): IWallet => {
	if (!res.data) return {
		totalBalance: 0,
		availableBalance: 0,
		userId: "",
		createdTimestamp: 0,
		address: "",
		createdBlock: ""
	}

	const list = res.data as IWallet[]
	return list[0];
}

export const eventDatas = (res: AxiosPromiseResponse): IEvent[] => {
	if (!res.data) return [];

	const list = res.data as IEvent[];
    return list.filter((event) => {
        return !event.closed
    })
}