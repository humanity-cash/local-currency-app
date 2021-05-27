import React from 'react';
import { View } from 'react-native';
import { Modal } from "../../uielements/Modal";
import { ChangeEmailNavigator } from "../../navigation/ChangeEmailNavigator";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

type SettingsChangeEmailProps = {
	visible?: boolean,
	onClose: () => void
}

const SettingsChangeEmail = (props: SettingsChangeEmailProps) => {
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}
	return (
		<View>
			{props.visible && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<ChangeEmailNavigator onClose={onClose} />
				</Modal>
			)}
		</View>
	);
}

export default SettingsChangeEmail