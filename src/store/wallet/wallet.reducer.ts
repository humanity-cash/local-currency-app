import { Action } from 'redux';
import { PERSONAL_WALLET_LOAD, BUSINESS_WALLET_LOAD } from '../action-types';
import { IUser } from 'src/api/types';

export interface WalletState {
    personalWallet: IUser,
    businessWallet: IUser,
}

interface WalletAction extends Action {
    type: string,
    payload: {
        personalWallet?: IUser,
        businessWallet?: IUser,
    }
}

const initialState: WalletState = {
    personalWallet: {
        totalBalance: 0,
        availableBalance: 0,
        userId: "",
        address: "",
        createdBlock: "",
    },
    businessWallet: {
        totalBalance: 0,
        availableBalance: 0,
        userId: "",
        address: "",
        createdBlock: "",
    },
}

export const walletReducer = (state = initialState, action: WalletAction): WalletState => {
    switch(action.type) {
        case PERSONAL_WALLET_LOAD: 
            return {
                ...state,
                ...action.payload
            };

        case BUSINESS_WALLET_LOAD: 
            return {
                ...state,
                ...action.payload
            };
        default: return state;
    }
}
