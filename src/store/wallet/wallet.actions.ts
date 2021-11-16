import { Dispatch } from 'redux'
import { CLIENT_WALLET_LOAD, BUSINESS_WALLET_LOAD } from '../action-types';
import { UserAPI } from 'src/api';
import errorHandler from '../errorHandler';

export const loadClientWallet = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const wallet = await UserAPI.getUser(userId);

        dispatch({
            type: CLIENT_WALLET_LOAD,
            payload: {
                clientWallet: wallet
            },
        });
    } catch (error) {
        errorHandler(error, CLIENT_WALLET_LOAD);
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
    } catch (error) {
        errorHandler(error, BUSINESS_WALLET_LOAD);
    }
}
