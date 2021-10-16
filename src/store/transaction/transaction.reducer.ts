import { Action } from 'redux';
import { TRANSACTION_LOAD_ALL } from '../action-types';
import { ITransaction } from 'src/api/types';

export interface TransactionState {
    transactions: ITransaction[]
}

interface TransactionAction extends Action {
    type: string,
    payload: {
        transactions: ITransaction[]
    }
}

const initialState: TransactionState = {
    transactions: []
}

export const transactionReducer = (state = initialState, action: TransactionAction): TransactionState => {
    switch(action.type) {
        case TRANSACTION_LOAD_ALL: 
            return action.payload;
        default: return state;
    }
}
