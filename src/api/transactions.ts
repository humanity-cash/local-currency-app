import { UserId, AxiosPromiseResponse, IDepositRequest, IWithdrawalRequest, ITransactionRequest, ITransaction } from './types';
import { getRequest, postRequest } from './base';
import { userData, transactionDatas, fundingSource } from './formatters';
import { delay } from 'src/utils/http';
import { Business, Customer, IDBUser, IWallet } from '@humanity.cash/types';


export const getDeposits = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  const response = await getRequest(`/users/${userId}/deposit`);
  return response;
};

export const getWithdrawals = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  const response = await getRequest(`/users/${userId}/withdrawal`);
  return response;
};

export const getTransactions = async (userId: UserId): Promise<ITransaction[]> => {
  const response = await getRequest(`/users/${userId}/transfer`);
  return transactionDatas(response);
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