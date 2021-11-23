import { Dispatch } from 'redux'
import { PERSONAL_WALLET_LOAD, BUSINESS_WALLET_LOAD } from '../action-types';
import { UserAPI } from 'src/api';
import errorHandler from '../errorHandler';

export const loadPersonalWallet = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const wallet = await UserAPI.getUser(userId);
        const walletData = {
            totalBalance: wallet?.totalBalance,
            availableBalance: wallet?.availableBalance,
            userId: wallet?.userId,
            address: wallet?.address,
            createdBlock: wallet?.createdBlock,
        }
        dispatch({
            type: PERSONAL_WALLET_LOAD,
            payload: {
                personalWallet: walletData
            },
        });
    } catch (error: any) {
        errorHandler(error, PERSONAL_WALLET_LOAD);
    }
}

export const loadBusinessWallet = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const wallet = await UserAPI.getUser(userId);

        dispatch({
            type: BUSINESS_WALLET_LOAD,
            payload: {
                businessWallet: wallet
            },
        });
    } catch (error: any) {
        errorHandler(error, BUSINESS_WALLET_LOAD);
    }
}
