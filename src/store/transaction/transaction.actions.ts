import { Dispatch } from 'redux'
import { TRANSACTION_LOAD_ALL } from '../action-types';
import { UserAPI } from 'src/api';
import errorHandler from '../errorHandler';

export const loadTransactions = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const transactions = await UserAPI.getTransactions(userId);

        dispatch({
            type: TRANSACTION_LOAD_ALL,
            payload: {
                transactions: transactions
            },
        });
    } catch (error) {
        errorHandler(error, TRANSACTION_LOAD_ALL)
    }
}
