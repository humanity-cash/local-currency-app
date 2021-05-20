import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { modalViewBase, baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { usePaymentDetails } from "../../hooks/usePaymentDetails";
import { Button } from "../../uielements/Button";
import { colors } from "../../theme/colors";
import { useUserDetails } from "../../hooks/useUserDetails";
import { useWallet } from "../../hooks/useWallet";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { MODAL_SCREEN_OFFSET } from "../../uielements/Modal";
import { formatValue } from "../../utils/common";

type MissingAddCashResultProps = {
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

const MissingAddCashResultView = (props: MissingAddCashResultProps) => {
	const { details } = usePaymentDetails();
	const { wallet, updateAmount } = useWallet();
	const { updateStatus } = useUserDetails();

	const onSuccess = () => {
		updateAmount(wallet.amount + parseFloat(details.amount));
		updateStatus({ cashAdded: true })
		props.navigation.navigate('ListOfSteps');
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
			/>
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
						source={require('../../assets/images/onboarding4.png')}
						containerStyle={styles.image}
					/>
				</View>
			</View>
			{details.status && (
				<Button
					type="fluidDark"
					title="Next"
					onPress={onSuccess}
				/>
			)}
			{!details.status && (
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
					keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
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

const MissingAddCashResult = (props:MissingAddCashResultProps) => {
	const navigation = useNavigation();
	return <MissingAddCashResultView {...props} navigation={navigation} />;
}
export default MissingAddCashResult