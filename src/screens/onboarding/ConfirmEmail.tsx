import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Header, NextBtn } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";


type ConfirmEmailProps = {
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

const ConfirmEmailView = (props: ConfirmEmailProps) => {
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
			props.navigation.navigate("EmailConfirmed");
		}
	}, [emailVerified]);
	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<NextBtn text="Skip" onClick={() => props.navigation.navigate('OnboardingSteps', { step: 4 })} />}
			/>

			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ { ...baseHeader} }>
					<Text h1>Confirm your email address</Text>
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

const ConfirmEmail = (props:ConfirmEmailProps) => {
	const navigation = useNavigation();
	return <ConfirmEmailView {...props} navigation={navigation} />;
}
export default ConfirmEmail