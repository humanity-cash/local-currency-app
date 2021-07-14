import React from 'react';
import { View } from 'react-native';
import { useModalStatusBar } from "src/hooks";
import { ChangePasscodeNavigator } from "src/navigation/ChangePasscodeNavigator";
import { Modal } from "src/shared/uielements";

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