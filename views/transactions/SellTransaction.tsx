import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal } from "../../uielements/Modal";
import { ShareEntry } from "../../utils/types";
import { SellTransactionNavigator } from "../../navigation/SellTransactionStack";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

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