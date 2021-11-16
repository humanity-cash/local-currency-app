import { Action } from 'redux';
import { CLIENT_WALLET_LOAD, BUSINESS_WALLET_LOAD } from '../action-types';
import { IUser } from 'src/api/types';

export interface WalletState {
    clientWallet: IUser,
    businessWallet: IUser,
}

interface WalletAction extends Action {
    type: string,
    payload: {
        clientWallet?: IUser,
        businessWallet?: IUser,
    }
}

const initialState: WalletState = {
    clientWallet: {
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
        case CLIENT_WALLET_LOAD: 
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
