import React from 'react';
import { View } from 'react-native';
import { useModalStatusBar } from "src/hooks";
import { AddCashTransactionNavigator } from "src/navigation/AddCashTransactionStack";
import { Modal } from "src/shared/uielements";
import { Order } from "src/utils/types";

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