import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Header } from "../../uielements/header/Header";
import { baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { useUserDetails } from "../../hooks/useUserDetails";
import { BackBtn } from "../../uielements/header/BackBtn";
import { PinCode } from "../../uielements/PinCode";

type PasscodeConfirmProps = {
	navigation?: any,
	route: any
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

const PasscodeConfirmView = (props: PasscodeConfirmProps) => {
	const [pinValue, setPinValue] = useState('');
	const [pinMatch, setPinMatch] = useState(true);
	const { authorization: { pinInput }, updateAuthorization, setLoggedIn } = useUserDetails();
	const [autoFocus, setAutoFocus] = useState(true);
	const isFocused = useIsFocused();

	useEffect(() => {
		setAutoFocus(isFocused);
		setPinValue(isFocused ? pinValue : '');
	},[isFocused]);

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ { ...baseHeader} }>
					{pinMatch && (<Text h1>Confirm passcode</Text>)}
					{!pinMatch && (<Text h1>No matching codes...please try again</Text>)}
				</View>
				<View style={styles.codeView}>
					<Text>Create a passcode to secure your account and use it to login</Text>
					<PinCode
						value={pinValue}
						onChange={setPinValue}
						autoFocus={autoFocus}
						length={6}
						onComplete={async receivedPin => {
							setPinValue('');
							if (pinInput === receivedPin) {
								await updateAuthorization({ pin: receivedPin });
								await setLoggedIn(true);
								setAutoFocus(false);
								props.navigation.navigate('OnboardingSteps', { step: 1 });
								setPinMatch(true);
								return;
							}
							setPinMatch(false);
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const PasscodeConfirm = (props:PasscodeConfirmProps) => {
	const navigation = useNavigation();
	return <PasscodeConfirmView {...props} navigation={navigation} />;
}
export default PasscodeConfirm