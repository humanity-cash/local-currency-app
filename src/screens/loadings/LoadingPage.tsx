import React from 'react';
import { LoadingScreenTypes } from "src/utils/types";
import DataLoading from './DataLoading';
import PaymentPending from './PaymentPending';
import { LoadingPageState } from 'src/store/loading/loading.reducer';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';

const LoadingPage = (): JSX.Element => {
    const { loadingState } = useSelector((state: AppState) => state.loadingReducer) as LoadingPageState;

    return loadingState.screen === LoadingScreenTypes.PAYMENT_PENDING ? (
        <PaymentPending visible={loadingState?.isLoading} />
    ) : (
            <DataLoading visible={loadingState.isLoading} />
    )
}

export default LoadingPage;
