import { IUserResponse, AxiosPromiseResponse, ITransaction } from "src/api/types";

export const userData = (res: AxiosPromiseResponse): IUserResponse => {
    return res.data as IUserResponse;
}

export const transactionDatas = (res: AxiosPromiseResponse): ITransaction[] => {
    if (!res.data) return [];

    const list = res.data as ITransaction[];
    return list.map((transaction) => {
        return {
            ...transaction,
            value: (Number(transaction.value) / 1000000000000000000).toFixed(2)
        };
    });
}
