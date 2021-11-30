import { Business, Customer, IDBUser, IWallet } from '@humanity.cash/types';
import { delay } from 'src/utils/http';
import { getRequest, postRequest } from './base';
import { userData } from './formatters';
import { AxiosPromiseResponse, IUserRequest, UserId } from './types';

const createUser = async (request: IUserRequest): Promise<AxiosPromiseResponse<IDBUser>> => {
  try {
    const response = await postRequest(`/users`, request);
    return response;
  } catch (err) {
    return {} as any;
  }
};

const addCustomerVerification = async (businessDwollaId: string, request: Customer): Promise<AxiosPromiseResponse<IDBUser>> => {
  try {
    const response = await postRequest(`/users/${businessDwollaId}/customer`, { customer: request });
    return response;
  } catch (err) {
    return {} as Promise<AxiosPromiseResponse<IDBUser>>;
  }
};

const addBusinessVerification = async (customerDwollaId: string, request: Business): Promise<AxiosPromiseResponse<IDBUser>> => {
  try {
    const response = await postRequest(`/users/${customerDwollaId}/business`, { business: request });
    return response;
  } catch (err) {
    return {} as Promise<AxiosPromiseResponse<IDBUser>>;
  }
};

export const getUserByEmail = async (email: string): Promise<IDBUser> => {
  try {
    const response: AxiosPromiseResponse<IDBUser[]> = await getRequest(`/users/email/${email.toLowerCase()}`);
    const data = response?.data[0];
    return data;
  } catch (err) {
    console.log("Error: getUserByEmail:", err)
    return {} as IDBUser;
  }
};

export const getUser = async (userId: UserId): Promise<IWallet> => {
  try {
    const response: AxiosPromiseResponse<IWallet> = await getRequest(`/users/${userId}`);
    return userData(response);
  } catch (err) {
    console.log(err)
    await delay(5);
    try {
      const response: AxiosPromiseResponse<IWallet> = await getRequest(`/users/${userId}`);
      return userData(response);
    } catch (err) {
      return {} as IWallet;
    }
  }
};

export const createBusiness = async (user: IDBUser): Promise<{ status: number, data: IDBUser }> => {
  try {
    if (user?.verifiedCustomer
      && user?.customer?.dwollaId
      && user?.business) {
      const response: AxiosPromiseResponse<IDBUser> = await addBusinessVerification(
        user.customer.dwollaId
        , { ...user?.business, avatar: "avatar" });
      //@ts-ignore
      return { status: response.status, data: response.data.data };
    } else {
      const response = await createUser({
        email: user.email,
        consent: true,
        type: 'business',
        business: user.business
      });
      return { status: response.status, data: response.data };
    }
  } catch (error) {
    console.log("error creating business", error)
    return { status: 500, data: {} as IDBUser };
  }
}

export const createCustomer = async (user: IDBUser): Promise<{ status: number, data: IDBUser }> => {
  try {
    if (user?.verifiedBusiness && user?.business?.dwollaId && user?.dbId && user?.customer) {
      const response: AxiosPromiseResponse<IDBUser> =
        await addCustomerVerification(user.business.dwollaId, user?.customer);
      //@ts-ignore
      return { status: response.status, data: response.data.data };
    } else {
      const response = await createUser({
        email: user.email,
        consent: true,
        type: 'customer',
        customer: user.customer
      });
      return { status: response.status, data: response.data };
    }
  } catch (error) {
    console.log("error creating customer", error)
    return { status: 500, data: {} as IDBUser };
  }
}