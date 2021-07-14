import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useModalStatusBar } from "src/hooks";
import { BuyTransactionNavigator } from "src/navigation/BuyTransactionStack";
import { Modal } from "src/shared/uielements";
import { ShareEntry } from "src/utils/types";

type BuyTransactionProps = {
	navigation?: any,
	route?: any,
	share?: ShareEntry | null,
	orderId: string,
	visible?: boolean,
	onClose: () => void
}

const BuyTransactionView = (props: BuyTransactionProps) => {
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}
	return (
		<View>
			{props.visible && props.share && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<BuyTransactionNavigator share={props.share} orderId={props.orderId} onClose={onClose} style={{ backgroundColor: 'transparent' }} />
				</Modal>
			)}
		</View>
	);
}

const BuyTransaction = (props: BuyTransactionProps) => {
	const navigation = useNavigation();
	return <BuyTransactionView {...props} navigation={navigation}/>;
}
export default BuyTransaction