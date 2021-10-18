import { Action } from 'redux';
import { LOADING_STATE_SET } from '../action-types';
import { LoadingState, LoadingScreenTypes } from 'src/utils/types';

export interface LoadingPageState {
    loadingState: LoadingState
}

interface LoadingAction extends Action {
    type: string,
    payload: {
        loadingState: LoadingState
    }
}

const initialState: LoadingPageState = {
    loadingState: {
        screen: LoadingScreenTypes.PAYMENT_PENDING,
        isLoading: false
    }
}

export const loadingReducer = (state = initialState, action: LoadingAction): LoadingPageState => {
    switch(action.type) {
        case LOADING_STATE_SET: 
            return {
                ...state,
                ...action.payload
            };

        default: return state;
    }
}
