/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { getRequest, postRequest } from './base';

type UserId = string;
type AxiosPromiseResponse = AxiosResponse<any>;

export const create = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/user`, {userId});
  return response;
};

export const getSingle = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  const response = await getRequest(`/users?id=${userId}`);
  return response;
};

export const getAll = async (): Promise<AxiosPromiseResponse> => {
  const response = await getRequest(`/users`);
  return response;
};

export const deposit = async (userId: UserId, amount: number): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users?id=${userId}`, {amount});
  return response;
};

export const transferTo = async (userId: UserId, toUserId: UserId, amount: number): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users?id=${userId}`, {amount, toUserId});
  return response;
};