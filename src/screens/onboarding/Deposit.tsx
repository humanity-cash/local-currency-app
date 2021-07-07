import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { usePaymentDetails, useUserDetails, useWallet } from "src/hooks";
import { BackBtn, Button, DepositView as DepositViewComponent, Header, NextBtn } from 'src/shared/uielements';
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

type DepositProps = {
	navigation?: any
	route?: any
}

const DepositView = (props: DepositProps) => {
	const { details, update } = usePaymentDetails();
	const { wallet: { amount }, updateAmount } = useWallet();
	const { updateStatus } = useUserDetails();

	useEffect(() => {
		update({ type: 'deposit' });
	}, []);

	const onSuccess = () => {
		updateAmount(amount + parseInt(details.amount));
		updateStatus({ cashAdded: true })
		props.navigation.navigate('OnboardingSteps', { step: 5 });
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<NextBtn text="Skip" onClick={() => props.navigation.navigate('OnboardingSteps', { step: 5 })} />}
			/>

			<ScrollView style={{ ...wrappingContainerBase, paddingBottom: 20, marginBottom: 20 }}>
				<View style={{...baseHeader, marginBottom: 0 }}>
					<Text h1>Direct deposit</Text>
				</View>
				<Text>Transfer CHF 10,00 from your own bank to the account below to add it to your Cash Wallet. This usually takes about 2 days.</Text>
				<DepositViewComponent />
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

const Deposit = (props: DepositProps) => {
	const navigation = useNavigation();
	return <DepositView {...props} navigation={navigation} />;
}
export default Deposit