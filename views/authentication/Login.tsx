import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { Header } from "../../uielements/header/Header";
import { baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { useUserDetails } from "../../hooks/useUserDetails";
import { PinCode } from "../../uielements/PinCode";
import ForgotPassword from "./ForgotPassword";
import * as LocalAuthentication from "expo-local-authentication";

type LoginProps = {
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
		flex: 1
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	},
	image: {
		alignSelf: "center",
		width: 180,
		height: 180,
	},
	imageView: {
		justifyContent: "center",
		textAlignVertical: "center",
		flex: 1
	}
});

const LoginView = (props: LoginProps) => {
	const { personalDetails: { firstname }, authorization: { pin, touchID } } = useUserDetails();
	const [autoFocus, setAutoFocus] = useState<boolean>(true);
	const [pinMatch, setPinMatch] = useState(true);
	const [pinValue, setPinValue] = useState("");
	const isFocused = useIsFocused();

	useEffect(() => {
		async function askFingerprint() {
			if (isFocused && touchID) {
				const data = await LocalAuthentication.authenticateAsync({
					disableDeviceFallback: true,
					cancelLabel: 'Close'
				});
				if (data.success) {
					setAutoFocus(false);
					props.navigation.navigate('Tabs');
				}
			}
		}
		askFingerprint();

		setAutoFocus(isFocused);
		setPinValue(isFocused ? pinValue : '');
	}, [isFocused, touchID]);

	return (
		<View style={viewBase}>
			<Header />

			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ { ...baseHeader, marginBottom: 0 } }>
					{pinMatch && (<Text style={styles.headerView}>Hi {firstname}, enter your passcode</Text>)}
					{!pinMatch && (<Text style={styles.headerView}>Hmm wrong passcode... try again</Text>)}
				</View>
				<View style={styles.codeView}>
					<PinCode
						value={pinValue}
						onChange={setPinValue}
						autoFocus={autoFocus}
						length={6}
						onComplete={(receivedPin) => {
							setPinValue('');
							if (pin === receivedPin) {
								setAutoFocus(false);
								props.navigation.navigate('Tabs');
								setPinMatch(true);
								return;
							}
							setPinMatch(false);
						}}
					/>
				</View>
				<View style={styles.imageView}>
					<Image
						source={require('../../assets/images/teaser.png')}
						containerStyle={styles.image}
					/>
				</View>
			</View>

			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<ForgotPassword />
			</KeyboardAvoidingView>
		</View>
	);
}

const Login = (props:LoginProps) => {
	const navigation = useNavigation();
	return <LoginView {...props} navigation={navigation} />;
}
export default Login