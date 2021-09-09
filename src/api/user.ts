/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { getRequest, postRequest } from './base';
import { IUserRequest, IDepositRequest, IWithdrawalRequest, ITransactionRequest } from './formatters';

type UserId = string;
type AxiosPromiseResponse = AxiosResponse<any>;

// create local currency user
export const user = async (request: IUserRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users`, {request});
  return response;
};

// create deposit
export const deposit = async (userId: UserId, request: IDepositRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/deposit`, {request});
  return response;
};

export const withdrawal = async (userId: UserId, request: IWithdrawalRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/withdrawal`, {request});
  return response;
};

export const transferTo = async (userId: UserId, request: ITransactionRequest): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/transfer`, {request});
  return response;
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
export const getUser = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  const response = await getRequest(`/users/${userId}`);
  return response;
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
export const getTransactions = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  const response = await getRequest(`/users/${userId}/transfer`);
  return response;
};