import React from 'react';
import { View } from 'react-native';
import { useModalStatusBar } from "src/hooks";
import { WalletMinimumNavigator } from "src/navigation/WalletMinimumNavigator";
import { Modal } from "src/shared/uielements";

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