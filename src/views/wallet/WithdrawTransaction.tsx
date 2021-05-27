import React from 'react';
import { View } from 'react-native';
import { Modal } from "../../uielements/Modal";
import { Order } from "../../utils/types";
import { WithdrawTransactionNavigator } from "../../navigation/WithdrawTransactionStack";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

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