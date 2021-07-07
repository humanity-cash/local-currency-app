import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useModalStatusBar } from "src/hooks";
import { EditOrderNavigator } from "src/navigation/EditOrderStack";
import { Modal } from "src/shared/uielements";
import { Order } from "src/utils/types";

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