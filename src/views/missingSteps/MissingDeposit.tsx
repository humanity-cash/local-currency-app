import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button';
import { modalViewBase, baseHeader, wrappingContainerBase, modalBaseHeader } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { usePaymentDetails } from "../../hooks/usePaymentDetails";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { useWallet } from "../../hooks/useWallet";
import { useUserDetails } from "../../hooks/useUserDetails";
import { DepositView } from "../../uielements/reusable/DepositView";

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