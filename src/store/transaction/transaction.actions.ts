import { Dispatch } from 'redux'
import { PERSONAL_TRANSACTION_LOAD_ALL, BUSINESS_TRANSACTION_LOAD_ALL } from '../action-types';
import { UserAPI } from 'src/api';
import errorHandler from '../errorHandler';

export const loadPersonalTransactions = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const transactions = await UserAPI.getTransactions(userId);

        dispatch({
            type: PERSONAL_TRANSACTION_LOAD_ALL,
            payload: {
                personalTransactions: transactions
            },
        });
    } catch (error) {
        errorHandler(error, PERSONAL_TRANSACTION_LOAD_ALL)
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
