import { IUser, AxiosPromiseResponse, ITransaction } from "src/api/types";

export const userData = (res: AxiosPromiseResponse): IUser => {
    if (!res.data) return {
        totalBalance: 0,
        availableBalance: 0,
        userId: "",
        address: "",
        createdBlock: ""
    }

    const list = res.data as IUser[]
    return list[0];
}

export const transactionDatas = (res: AxiosPromiseResponse): ITransaction[] => {
    if (!res.data) return [];

    const list = res.data as ITransaction[];
    return list.map((transaction) => {
        return {
            ...transaction,
            timestamp: transaction.timestamp * 1000,
            value: (Number(transaction.value) / 1000000000000000000).toFixed(2),
        };
    });
}

export const fundingSource = (res: AxiosPromiseResponse): boolean => {
    if (!res.data) return false;

    if (res.data.body?._embedded["funding-sources"]?.length > 0) return true;
    else return false;
}