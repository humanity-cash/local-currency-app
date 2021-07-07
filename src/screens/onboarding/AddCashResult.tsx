import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { usePaymentDetails, useUserDetails, useWallet } from "src/hooks";
import { Button, Header, NextBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { formatValue } from "src/utils/common";

type AddCashResultProps = {
	navigation?: any,
	route: any
}

const styles = StyleSheet.create({
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		textAlign: "center"
	},
	codeView: {
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	successStatusText: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		textAlign: "center",
		color: colors.textSuccess
	},
	failedStatusText: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		textAlign: "center",
		color: colors.textWarning
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	},
	image: {
		alignSelf: "center",
		width: 260,
		height: 260
	},
	imageView: {
		justifyContent: "center",
		textAlignVertical: "center",
		flex: 1
	}
});

const AddCashResultView = (props: AddCashResultProps) => {
	const { details, addCard } = usePaymentDetails();
	const { wallet: { amount }, updateAmount } = useWallet();
	const { updateStatus } = useUserDetails();

	const onSuccess = () => {
		updateAmount(amount + parseInt(details.amount));
		updateStatus({ cashAdded: true });
		addCard();
		props.navigation.navigate('OnboardingSteps', { step: 5 });
	}

	return (
		<View style={viewBase}>
			{details.status && (<Header />)}
			{!details.status && (
				<Header
					rightComponent={<NextBtn text="Skip" onClick={() => props.navigation.navigate('OnboardingSteps', { step: 5 })} />}
				/>
			)}
			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ { ...baseHeader, marginTop: 20, marginBottom: 0 } }>
					{details.status && (<Text style={styles.headerView}>Added cash to wallet</Text>)}
					{!details.status && (<Text style={styles.headerView}>Something went wrong...</Text>)}
				</View>
				<View style={styles.codeView}>
					{details.status && (<Text style={styles.successStatusText}>CHF {formatValue(parseFloat(details.amount))}</Text>)}
					{!details.status && (<Text style={styles.failedStatusText}>Payment failed</Text>)}
				</View>
				<View style={styles.imageView}>
					<Image
						source={require('../../../assets/images/onboarding4.png')}
						containerStyle={styles.image}
					/>
				</View>
			</View>
			{details.status && (
				<Button
					type="fluidDark"
					title="NEXT"
					onPress={onSuccess}
				/>
			)}
			{!details.status && (
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
				>
					<View style={styles.bottomView}>
						<TouchableOpacity onPress={() => props.navigation.navigate('VerificationHelp')}>
							<Text style={styles.bottomNavigation}>Need help?</Text>
						</TouchableOpacity>
					</View>
					<Button
						type="fluidDark"
						title="ENTER CARD DETAILS AGAIN"
						onPress={() => {
							props.navigation.navigate('CreditCard')
						}}
					/>
				</KeyboardAvoidingView>
			)}
		</View>
	);
}

const AddCashResult = (props:AddCashResultProps) => {
	const navigation = useNavigation();
	return <AddCashResultView {...props} navigation={navigation} />;
}
export default AddCashResult