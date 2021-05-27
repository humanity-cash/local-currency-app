import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal } from "../../uielements/Modal";
import { ShareEntry } from "../../utils/types";
import { BuyTransactionNavigator } from "../../navigation/BuyTransactionStack";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

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