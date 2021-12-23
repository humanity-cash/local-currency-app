import React from 'react';
import DataLoading from './DataLoading';
import PaymentPending from './PaymentPending';

const LoadingPage = ({ visible = false, isPayment = false, isData = false }): JSX.Element => {
	return (
		<>
			<PaymentPending visible={isPayment && visible} />
			<DataLoading visible={isData && visible} />
		</>
	)
}

export default LoadingPage;
