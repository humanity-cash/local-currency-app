import { MiniTransaction } from 'src/utils/types';
import { getRequest, postRequest } from './base';
import { formatDeposits, formatTransactions, formatWithdrawals } from './formatters';
import { AxiosPromiseResponse, IDepositRequest, ITransaction, ITransactionRequest, IWithdrawalRequest, UserId } from './types';

export const getDeposits = async (userId: UserId): Promise<MiniTransaction[]> => {
  try {
    const response = await getRequest(`/users/${userId}/deposit`);
    if (response.status === 204) {
      return []
    }
    return formatDeposits(response) || [];
  } catch (error) {
    console.log("Error in getDeposits", error)
    return [];
  }
};

export const getWithdrawals = async (userId: UserId): Promise<MiniTransaction[]> => {
  try {
    const response = await getRequest(`/users/${userId}/withdraw`);
    if (response.status === 204) {
      return []
    }
    return formatWithdrawals(response);
  } catch (err) {
    console.log('err here', err)
    return [];
  }
};

export const getTransactions = async (userId: UserId): Promise<MiniTransaction[]> => {
  try {
    const response = await getRequest(`/users/${userId}/transfer`);
    if (response.status === 204) {
      return []
    }
    return formatTransactions(response);
  } catch (error) {
    console.log('error in getTransactions', error)
    return [] as ITransaction[];
  }
};

export const deposit = async (userId: UserId, request: IDepositRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/deposit`, request);
  return response;
};

export const withdraw = async (userId: UserId, request: IWithdrawalRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/withdraw`, request);
  return response;
};

export const transferTo = async (userId: UserId, request: ITransactionRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/transfer`, request);
  return response;
};

export const getAllTransactions = async (userId: UserId): Promise<MiniTransaction[]> => {
  const response =
    [...await getTransactions(userId),
    ...await getDeposits(userId),
    ...await getWithdrawals(userId),
    ]

  return response
}