import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, CancelBtn, ModalHeader } from "src/shared/uielements";
import { baseHeader, modalBaseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";


type ChangeEmailConfirmProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	codeView: {
		flex: 1
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	}
});

const ChangeEmailConfirm = (props: ChangeEmailConfirmProps) => {
	const navigation = useNavigation();
	const [noCodeReceived, setNoCodeReceived] = useState(false);
	const { personalDetails: { email, emailVerified }, updatePersonalDetails } = useUserDetails();

	useEffect(() => {
		updatePersonalDetails({ emailVerified: false });
	}, [noCodeReceived]);

	useEffect(() => {
		setTimeout(() => {
			if (!emailVerified) {
				updatePersonalDetails({ emailVerified: true });
			}
		}, 6000);
	}, [noCodeReceived, emailVerified]);

	useEffect(() => {
		if (emailVerified) {
			navigation.navigate("ChangeEmailConfirmed");
		}
	}, [emailVerified]);
	return (
		<View style={viewBase}>
			<ModalHeader
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
			/>

			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ { ...baseHeader} }>
					<Text style={modalBaseHeader}>Confirm your email address</Text>
				</View>
				<View style={styles.codeView}>
					{!noCodeReceived && (<Text>We just sent an email to {email} with a verification link. Please click the link to verify your email address. Check your spam folder if you can’t find our email.</Text>)}
					{noCodeReceived && (<Text>We just sent another email to {email} with a verification link.</Text>)}
				</View>
			</View>
			{!noCodeReceived && (
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
				>
					<View style={styles.bottomView}>
						<TouchableOpacity onPress={() => {
							setNoCodeReceived(true);
						}}>
							<Text style={styles.bottomNavigation}>Resend verification email</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			)}
			{noCodeReceived && (
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
				>
					<View style={styles.bottomView}>
						<TouchableOpacity onPress={() => props.navigation.navigate('VerificationHelp')}>
							<Text style={styles.bottomNavigation}>Need help?</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			)}
		</View>
	);
}

export default ChangeEmailConfirm