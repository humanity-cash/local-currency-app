import React from 'react';
import { View } from 'react-native';
import { Modal } from "../../uielements/Modal";
import { ChangePhoneNavigator } from "../../navigation/ChangePhoneNavigator";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

type SettingsChangePhoneProps = {
	visible?: boolean,
	onClose: () => void
}

const SettingsChangePhone = (props: SettingsChangePhoneProps) => {
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}
	return (
		<View>
			{props.visible && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<ChangePhoneNavigator onClose={onClose} />
				</Modal>
			)}
		</View>
	);
}

export default SettingsChangePhone