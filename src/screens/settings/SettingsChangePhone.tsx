import React from 'react';
import { View } from 'react-native';
import { useModalStatusBar } from "src/hooks";
import { ChangePhoneNavigator } from "src/navigation/ChangePhoneNavigator";
import { Modal } from "src/shared/uielements";

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