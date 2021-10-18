import React from 'react';
import { useLoadingModal } from "src/hooks";
import { LoadingScreenTypes } from "src/utils/types";
import DataLoading from './DataLoading';
import PaymentPending from './PaymentPending';

const LoadingPage = (): JSX.Element => {
    const { details } = useLoadingModal();

    return details.screen === LoadingScreenTypes.PAYMENT_PENDING ? (
        <PaymentPending visible={details?.isLoading} />
    ) : (
        <DataLoading visible={details?.isLoading} />
    )
}

export default LoadingPage;
