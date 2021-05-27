import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button';
import { modalViewBase, baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { DepositView } from "../../uielements/reusable/DepositView";

type WalletDepositProps = {
	navigation?: any
	route?: any
}

const WalletDepositView = (props: WalletDepositProps) => {
	const onSuccess = () => {
		props.route.params.onClose();
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={{...baseHeader, marginBottom: 0 }}>
						<Text h1>Direct deposit</Text>
					</View>
					<Text>Transfer CHF 10,00 from your own bank to the account below to add it to your Cash Wallet. This usually takes about 2 days.</Text>
					<DepositView />
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<Button
					type="fluidDark"
					title="DONE"
					onPress={onSuccess}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const WalletDeposit = (props: WalletDepositProps) => {
	const navigation = useNavigation();
	return <WalletDepositView {...props} navigation={navigation} />;
}
export default WalletDeposit