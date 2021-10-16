import { IUserResponse, AxiosPromiseResponse, ITransactionResponse } from "src/api/types";

export const userData = (res: AxiosPromiseResponse): IUserResponse => {
    return res.data as IUserResponse;
}

export const transactionDatas = (res: AxiosPromiseResponse): ITransactionResponse[] => {
    return res.data as ITransactionResponse[];
}
