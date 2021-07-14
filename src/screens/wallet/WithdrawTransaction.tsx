import React from 'react';
import { View } from 'react-native';
import { useModalStatusBar } from "src/hooks";
import { WithdrawTransactionNavigator } from "src/navigation/WithdrawTransactionStack";
import { Modal } from "src/shared/uielements";
import { Order } from "src/utils/types";

type WithdrawTransactionProps = {
	navigation?: any,
	route?: any,
	order?: Order | null,
	visible?: boolean,
	onClose: () => void
}

const WithdrawTransaction = (props: WithdrawTransactionProps) => {
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}
	return (
		<View>
			{props.visible && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<WithdrawTransactionNavigator
						onClose={onClose}
						style={{ backgroundColor: 'transparent' }}
					/>
				</Modal>
			)}
		</View>
	);
}

export default WithdrawTransaction