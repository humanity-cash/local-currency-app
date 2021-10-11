import { IUserResponse, AxiosPromiseResponse } from "src/api/types";

export const userData = (res: AxiosPromiseResponse): IUserResponse => {
    return res.data as IUserResponse;
}
