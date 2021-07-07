import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Header, PinCode } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import ForgotPassword from "./ForgotPassword";

type ConfirmPinProps = {
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
	}
});

const ConfirmPinView = (props: ConfirmPinProps) => {
	const [pinValue, setPinValue] = useState('');
	const [pinMatch, setPinMatch] = useState(true);
	const { authorization: { pin } } = useUserDetails();
	const [autoFocus, setAutoFocus] = useState(true);
	const isFocused = useIsFocused();

	useEffect(() => {
		setAutoFocus(isFocused);
		setPinValue(isFocused ? pinValue : '');
	},[isFocused]);

	const { redirectTo, redirectParams = {} } = props.route.params;
	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ { ...baseHeader, marginTop: 20, marginBottom: 0 } }>
					{pinMatch && (<Text style={styles.headerView}>Confirm with your passcode</Text>)}
					{!pinMatch && (<Text style={styles.headerView}>Wrong passcode... Please try again</Text>)}
				</View>
				<View style={styles.codeView}>
					<PinCode
						value={pinValue}
						onChange={setPinValue}
						autoFocus={autoFocus}
						length={6}
						onComplete={async receivedPin => {
							setPinValue('');
							if (pin === receivedPin) {
								setAutoFocus(false);
								props.navigation.navigate(redirectTo, redirectParams);
								setPinMatch(true);
								return;
							}
							setPinMatch(false);
						}}
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

const ConfirmPin = (props:ConfirmPinProps) => {
	const navigation = useNavigation();
	return <ConfirmPinView {...props} navigation={navigation} />;
}
export default ConfirmPin