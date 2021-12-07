import { Dispatch } from 'redux';
import { TransactionsAPI } from 'src/api';
import { BUSINESS_TRANSACTION_LOAD_ALL, PERSONAL_TRANSACTION_LOAD_ALL } from '../action-types';
import errorHandler from '../errorHandler';

export const loadPersonalTransactions = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

        const [transactions, deposits, withdrawals]=
            [
                await TransactionsAPI.getTransactions(userId),
                await TransactionsAPI.getDeposits(userId),
                await TransactionsAPI.getWithdrawals(userId),
            ]
        const all = [...transactions, ...deposits, ...withdrawals]
        dispatch({
            type: PERSONAL_TRANSACTION_LOAD_ALL,
            payload: {
                personalTransactions: all
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
