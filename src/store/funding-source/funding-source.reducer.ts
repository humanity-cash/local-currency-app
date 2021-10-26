import { Action } from 'redux';
import { PERSONAL_FUNDING_SOURCE_LOAD, BUSINESS_FUNDING_SOURCE_LOAD } from '../action-types';

export interface FundingSourceState {
    personalFundingSource: boolean,
    businessFundingSource: boolean,
}

interface FundingSourceAction extends Action {
    type: string,
    payload: {
        personalFundingSource?: boolean,
        businessFundingSource?: boolean,
    }
}

const initialState: FundingSourceState = {
    personalFundingSource: true,
    businessFundingSource: true,
}

export const fundingSourceReducer = (state = initialState, action: FundingSourceAction): FundingSourceState => {
    switch(action.type) {
        case PERSONAL_FUNDING_SOURCE_LOAD: 
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
