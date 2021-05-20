import React from 'react';
import { View } from 'react-native';
import { Modal } from "../../uielements/Modal";
import { Order } from "../../utils/types";
import { AddCashTransactionNavigator } from "../../navigation/AddCashTransactionStack";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

type AddCashTransactionProps = {
	navigation?: any,
	route?: any,
	order?: Order | null,
	visible?: boolean,
	onClose: () => void
}

const AddCashTransaction = (props: AddCashTransactionProps) => {
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}
	return (
		<View>
			{props.visible && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<AddCashTransactionNavigator
						onClose={onClose}
						style={{ backgroundColor: 'transparent' }}
					/>
				</Modal>
			)}
		</View>
	);
}

export default AddCashTransaction