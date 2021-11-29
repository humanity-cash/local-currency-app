import { Dispatch } from 'redux'
import { PERSONAL_TRANSACTION_LOAD_ALL, BUSINESS_TRANSACTION_LOAD_ALL } from '../action-types';
import { TransactionsAPI, UserAPI } from 'src/api';
import errorHandler from '../errorHandler';

export const loadPersonalTransactions = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const transactions = await TransactionsAPI.getTransactions(userId);

        dispatch({
            type: PERSONAL_TRANSACTION_LOAD_ALL,
            payload: {
                personalTransactions: transactions
            },
        });
    } catch (error: any) {
        errorHandler(error, PERSONAL_TRANSACTION_LOAD_ALL)
    }
}

export const loadBusinessTransactions = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const transactions = await TransactionsAPI.getTransactions(userId);

        dispatch({
            type: BUSINESS_TRANSACTION_LOAD_ALL,
            payload: {
                businessTransactions: transactions
            },
        });
    } catch (error: any) {
        errorHandler(error, BUSINESS_TRANSACTION_LOAD_ALL)
    }
}
