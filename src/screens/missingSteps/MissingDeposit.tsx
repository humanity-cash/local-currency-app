import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { usePaymentDetails, useUserDetails, useWallet } from "src/hooks";
import { BackBtn, Button, CancelBtn, DepositView, ModalHeader } from "src/shared/uielements";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

type MissingDepositProps = {
	navigation?: any
	route?: any
}

const MissingDepositView = (props: MissingDepositProps) => {
	const { details, update } = usePaymentDetails();
	const { wallet, updateAmount } = useWallet();
	const { updateStatus } = useUserDetails();

	useEffect(() => {
		update({ type: 'deposit' });
	}, []);

	const onSuccess = () => {
		updateAmount(wallet.amount + parseInt(details.amount));
		updateStatus({ cashAdded: true });
		props.navigation.navigate('ListOfSteps');
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

const MissingDeposit = (props: MissingDepositProps) => {
	const navigation = useNavigation();
	return <MissingDepositView {...props} navigation={navigation} />;
}
export default MissingDeposit