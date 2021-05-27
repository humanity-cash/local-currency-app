import React from 'react';
import { View } from 'react-native';
import { Modal } from "../../uielements/Modal";
import { WalletMinimumNavigator } from "../../navigation/WalletMinimumNavigator";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

type SettingsWalletMinimumProps = {
	visible?: boolean,
	onClose: () => void
}

const SettingsWalletMinimum = (props: SettingsWalletMinimumProps) => {
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}
	return (
		<View>
			{props.visible && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<WalletMinimumNavigator onClose={onClose} />
				</Modal>
			)}
		</View>
	);
}

export default SettingsWalletMinimum