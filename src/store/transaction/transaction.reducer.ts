import { Action } from 'redux';
import { CLIENT_TRANSACTION_LOAD_ALL, BUSINESS_TRANSACTION_LOAD_ALL } from '../action-types';
import { ITransaction } from 'src/api/types';

export interface TransactionState {
    clientTransactions: ITransaction[],
    businessTransactions: ITransaction[],
}

interface TransactionAction extends Action {
    type: string,
    payload: {
        clientTransactions?: ITransaction[],
        businessTransactions?: ITransaction[],
    }
}

const initialState: TransactionState = {
    clientTransactions: [],
    businessTransactions: [],
}

export const transactionReducer = (state = initialState, action: TransactionAction): TransactionState => {
    switch(action.type) {
        case CLIENT_TRANSACTION_LOAD_ALL: 
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
