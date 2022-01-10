import { Business } from "@humanity.cash/types";
import { getRequest } from "./base";
import { AxiosPromiseResponse } from "./types";

export const getBusinesses = async (): Promise<AxiosPromiseResponse<
  Business[]
>> => {
  try {
    const response = await getRequest(`/businesses`);
    return response;
  } catch (error) {
    return {} as Promise<AxiosPromiseResponse<Business[]>>;
  }
};
