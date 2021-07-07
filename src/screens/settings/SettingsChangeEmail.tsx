import React from 'react';
import { View } from 'react-native';
import { useModalStatusBar } from "src/hooks";
import { ChangeEmailNavigator } from "src/navigation/ChangeEmailNavigator";
import { Modal } from "src/shared/uielements";

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