import { Action } from 'redux';
import { PERSONAL_TRANSACTION_LOAD_ALL, BUSINESS_TRANSACTION_LOAD_ALL } from '../action-types';
import { ITransaction } from 'src/api/types';

export interface TransactionState {
    personalTransactions: ITransaction[],
    businessTransactions: ITransaction[],
}

interface TransactionAction extends Action {
    type: string,
    payload: {
        personalTransactions?: ITransaction[],
        businessTransactions?: ITransaction[],
    }
}

const initialState: TransactionState = {
    personalTransactions: [],
    businessTransactions: [],
}

export const transactionReducer = (state = initialState, action: TransactionAction): TransactionState => {
    switch(action.type) {
        case PERSONAL_TRANSACTION_LOAD_ALL: 
            return {
                ...state,
                ...action.payload
            };

        case BUSINESS_TRANSACTION_LOAD_ALL: 
            return {
                ...state,
                ...action.payload
            };
        default: return state;
    }
}
