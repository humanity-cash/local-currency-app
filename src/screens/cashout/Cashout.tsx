import React from 'react';
import { View } from 'react-native';
import { useModalStatusBar } from "src/hooks";
import { CashoutNavigator } from "src/navigation/CashoutNavigator";
import { Modal } from "src/shared/uielements";
import { Order } from "src/utils/types";

type CashoutProps = {
	navigation?: any,
	route?: any,
	order?: Order | null,
	visible?: boolean,
	onClose: () => void
}

const Cashout = (props: CashoutProps) => {
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}
	return (
		<View>
			{props.visible && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<CashoutNavigator
						onClose={onClose}
						style={{ backgroundColor: 'transparent' }}
					/>
				</Modal>
			)}
		</View>
	);
}

export default Cashout