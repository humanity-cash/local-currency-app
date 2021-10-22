import { Dispatch } from 'redux'
import { LOADING_STATE_SET } from '../action-types';
import errorHandler from '../errorHandler';
import { LoadingState, LoadingScreenTypes } from 'src/utils/types';
import { useDispatch } from 'react-redux';

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

export const showLoadingProgress = (type: LoadingScreenTypes) => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch({
            type: LOADING_STATE_SET,
            payload: {
                loadingState: {
                    screen: type,
                    isLoading: true
                }
            },
        });
    } catch (error) {
        errorHandler(error, LOADING_STATE_SET)
    }
}

export const hideLoadingProgress = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch({
            type: LOADING_STATE_SET,
            payload: {
                loadingState: {
                    screen: LoadingScreenTypes.ANY,
                    isLoading: false
                }
            },
        });
    } catch (error) {
        errorHandler(error, LOADING_STATE_SET)
    }
}