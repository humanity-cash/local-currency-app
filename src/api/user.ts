import { UserId, AxiosPromiseResponse, IUserRequest, IDepositRequest, IWithdrawalRequest, ITransactionRequest, ITransaction, IUser, INotificationResponse } from './types';
import { getRequest, postRequest, deleteRequest } from './base';
import { userData, transactionDatas, fundingSource } from './formatters';
import { notificationDatas } from './formatters/user-form';

// create local currency user
export const user = async (request: IUserRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users`, request);
  return response;
};

// create deposit
export const deposit = async (userId: UserId, request: IDepositRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/deposit`, request);
  return response;
};

export const withdraw = async (userId: UserId, request: IWithdrawalRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/withdraw`, request);
  return response;
};

export const iavToken = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/iav-token`, {});
  return response;
};

export const getFundingSources = async (userId: UserId): Promise<boolean> => {
  const response = await getRequest(`/users/${userId}/funding-sources`);
  return fundingSource(response);
};

export const transferTo = async (userId: UserId, request: ITransactionRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/transfer`, request);
  return response;
};

export const getNotifications = async (userId: UserId): Promise<INotificationResponse[]> => {
  const response = await getRequest(`/users/${userId}/notifications`);
  return notificationDatas(response);
};

export const deleteNotification = async (userId: UserId, notificationId: string): Promise<void> => {
  await deleteRequest(`/users/${userId}/notifications/${notificationId}`, {});
};

// Receive webhooks from Dwolla
export const webhook = async (): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/webhook`, {});
  return response;
};

export const health = async (): Promise<AxiosPromiseResponse> => {
  const response = await getRequest(`/health`);
  return response;
};

// Retrieve user information and balances
export const getUser = async (userId: UserId): Promise<IUser> => {
  const response = await getRequest(`/users/${userId}`);
  return userData(response);
};

// Get all deposits for a single user
export const getDeposits = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  const response = await getRequest(`/users/${userId}/deposit`);
  return response;
};

// Get all withdrawal for a single user
export const getWithdrawals = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  const response = await getRequest(`/users/${userId}/withdrawal`);
  return response;
};

// Retrieve transactions for a user
export const getTransactions = async (userId: UserId): Promise<ITransaction[]> => {
  const response = await getRequest(`/users/${userId}/transfer`);
  return transactionDatas(response);
};
