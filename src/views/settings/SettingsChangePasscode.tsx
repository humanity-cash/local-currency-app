import React from 'react';
import { View } from 'react-native';
import { Modal } from "../../uielements/Modal";
import { ChangePasscodeNavigator } from "../../navigation/ChangePasscodeNavigator";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

type SettingsChangePasscodeProps = {
	visible?: boolean,
	onClose: () => void
}

const SettingsChangePasscode = (props: SettingsChangePasscodeProps) => {
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}
	return (
		<View>
			{props.visible && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<ChangePasscodeNavigator onClose={onClose} />
				</Modal>
			)}
		</View>
	);
}

export default SettingsChangePasscode