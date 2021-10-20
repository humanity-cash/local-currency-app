import { Dispatch } from 'redux'
import { PERSONAL_FUNDING_SOURCE_LOAD, BUSINESS_FUNDING_SOURCE_LOAD } from '../action-types';
import { UserAPI } from 'src/api';
import errorHandler from '../errorHandler';

export const loadPersonalFundingSource = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const fundingSource = await UserAPI.getFundingSources(userId);

        dispatch({
            type: PERSONAL_FUNDING_SOURCE_LOAD,
            payload: {
                personalFundingSource: fundingSource
            },
        });
    } catch (error) {
        errorHandler(error, PERSONAL_FUNDING_SOURCE_LOAD);
    }
}

export const loadBusinessFundingSource = (userId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const fundingSource = await UserAPI.getFundingSources(userId);

        dispatch({
            type: BUSINESS_FUNDING_SOURCE_LOAD,
            payload: {
                businessFundingSource: fundingSource
            },
        });
    } catch (error) {
        errorHandler(error, BUSINESS_FUNDING_SOURCE_LOAD);
    }
}
