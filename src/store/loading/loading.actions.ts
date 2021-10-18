import { Dispatch } from 'redux'
import { LOADING_STATE_SET } from '../action-types';
import errorHandler from '../errorHandler';
import { LoadingState } from 'src/utils/types';

export const updateLoadingStatus = (state: LoadingState) => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch({
            type: LOADING_STATE_SET,
            payload: {
                loadingState: state
            },
        });
    } catch (error) {
        errorHandler(error, LOADING_STATE_SET)
    }
}
