import { IWallet } from '@humanity.cash/types';
import { getRequest, postRequest } from './base';
import { fundingSource } from './formatters';
import { AxiosPromiseResponse, UserId } from './types';
import { getUser } from './user';

export const iavToken = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  try {
    const response = await postRequest(`/users/${userId}/iav-token`, {});
    return response;
  } catch (err) {
    return {} as AxiosPromiseResponse;
  }
};

export const loadFundingSource = async (userId: UserId): Promise<boolean> => {
  try {
    if(!userId) return false;
    const response = await getRequest(`/users/${userId}/funding-sources`);
    return fundingSource(response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const webhook = async (): Promise<AxiosPromiseResponse> => {
  try {
    const response = await postRequest(`/webhook`, {});
    return response;
  } catch (err) {
    return {} as AxiosPromiseResponse;
  }
};

export const loadWallet = async (userId: string): Promise<IWallet> => {
  try {
    if(!userId) return {} as IWallet;
    const wallet = await getUser(userId);
    const walletData = {
      totalBalance: wallet?.totalBalance,
      availableBalance: wallet?.availableBalance,
      userId: wallet?.userId,
      address: wallet?.address,
      createdTimestamp: wallet?.createdTimestamp,
      createdBlock: wallet?.createdBlock,
    }
    return walletData;
  } catch (error: unknown) {
    console.log("Error loading wallet:", error)
    return {} as IWallet;
  }
}
