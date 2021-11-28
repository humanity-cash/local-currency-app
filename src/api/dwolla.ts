import { UserId, AxiosPromiseResponse, IUserRequest, IDepositRequest, IWithdrawalRequest, ITransactionRequest, ITransaction } from './types';
import { getRequest, postRequest } from './base';
import { userData, transactionDatas, fundingSource } from './formatters';
import { delay } from 'src/utils/http';
import { Business, Customer, IDBUser, IWallet } from '@humanity.cash/types';
import { getUser} from './user';

export const iavToken = async (userId: UserId): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/users/${userId}/iav-token`, {});
  return response;
};

export const loadFundingSource = async (userId: UserId): Promise<boolean> => {
try { 
  const response = await getRequest(`/users/${userId}/funding-sources`);
  return fundingSource(response);
 } catch(err){
   console.log("error in getFundingSources", err);
   return false;
 }
};

export const webhook = async (): Promise<AxiosPromiseResponse> => {
  const response = await postRequest(`/webhook`, {});
  return response;
};

export const loadWallet = async (uId: string): Promise<IWallet> => {
  try {
    const wallet = await getUser(uId);
    const walletData = {
      totalBalance: wallet?.totalBalance,
      availableBalance: wallet?.availableBalance,
      userId: wallet?.userId,
      address: wallet?.address,
      createdTimestamp: wallet?.createdTimestamp,
      createdBlock: wallet?.createdBlock,
    }
    return walletData;
  } catch (error: any) {
    console.log("no here", error)
    return {} as IWallet;
  }
}
