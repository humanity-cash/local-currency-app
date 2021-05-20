import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal } from "../../uielements/Modal";
import { EditOrderNavigator } from "../../navigation/EditOrderStack";
import { Order } from "../../utils/types";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

type EditOrderProps = {
	navigation?: any,
	route?: any,
	order?: Order | null,
	visible?: boolean,
	onClose: () => void
}

const EditOrder = (props: EditOrderProps) => {
	const navigation = useNavigation();
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}
	return (
		<View>
			{props.visible && props.order && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<EditOrderNavigator order={props.order} onClose={onClose} style={{ backgroundColor: 'transparent' }} />
				</Modal>
			)}
		</View>
	);
}

export default EditOrder