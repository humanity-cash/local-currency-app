import { Action } from 'redux';
import { CLIENT_FUNDING_SOURCE_LOAD, BUSINESS_FUNDING_SOURCE_LOAD } from '../action-types';

export interface FundingSourceState {
    clientFundingSource: boolean,
    businessFundingSource: boolean,
}

interface FundingSourceAction extends Action {
    type: string,
    payload: {
        clientFundingSource?: boolean,
        businessFundingSource?: boolean,
    }
}

const initialState: FundingSourceState = {
    clientFundingSource: true,
    businessFundingSource: true,
}

export const fundingSourceReducer = (state = initialState, action: FundingSourceAction): FundingSourceState => {
    switch(action.type) {
        case CLIENT_FUNDING_SOURCE_LOAD: 
            return {
                ...state,
                ...action.payload
            };

        case BUSINESS_FUNDING_SOURCE_LOAD: 
            return {
                ...state,
                ...action.payload
            };
        default: return state;
    }
}
