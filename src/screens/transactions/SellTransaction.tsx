import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useModalStatusBar } from "src/hooks";
import { SellTransactionNavigator } from "src/navigation/SellTransactionStack";
import { Modal } from "src/shared/uielements";
import { ShareEntry } from "src/utils/types";

type SellTransactionProps = {
	navigation?: any,
	route?: any,
	share?: ShareEntry | null,
	orderId: string,
	visible?: boolean,
	onClose: () => void
}

const SellTransactionView = (props: SellTransactionProps) => {
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}
	return (
		<View>
			{props.visible && props.share && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<SellTransactionNavigator share={props.share} orderId={props.orderId} onClose={onClose} style={{ backgroundColor: 'transparent' }} />
				</Modal>
			)}
		</View>
	);
}

const SellTransaction = (props: SellTransactionProps) => {
	const navigation = useNavigation();
	return <SellTransactionView {...props} navigation={navigation}/>;
}
export default SellTransaction