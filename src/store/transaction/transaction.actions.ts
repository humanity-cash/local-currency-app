import { Dispatch } from 'redux'
import { CLIENT_TRANSACTION_LOAD_ALL, BUSINESS_TRANSACTION_LOAD_ALL } from '../action-types';
import { UserAPI } from 'src/api';
import errorHandler from '../errorHandler';

export const loadClientTransactions = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const transactions = await UserAPI.getTransactions(userId);

        dispatch({
            type: CLIENT_TRANSACTION_LOAD_ALL,
            payload: {
                clientTransactions: transactions
            },
        });
    } catch (error) {
        errorHandler(error, CLIENT_TRANSACTION_LOAD_ALL)
    }
}

export const loadBusinessTransactions = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const transactions = await UserAPI.getTransactions(userId);

        dispatch({
            type: BUSINESS_TRANSACTION_LOAD_ALL,
            payload: {
                businessTransactions: transactions
            },
        });
    } catch (error) {
        errorHandler(error, BUSINESS_TRANSACTION_LOAD_ALL)
    }
}
