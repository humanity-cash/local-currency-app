import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Header, PinCode } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";


type PasscodeProps = {
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

const PasscodeView = (props: PasscodeProps) => {
	const { updateAuthorization } = useUserDetails();
	const [pinValue, setPinValue] = useState('');
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
					<Text h1>Create a passcode</Text>
				</View>
				<View style={styles.codeView}>
					<Text>Create a passcode to secure your account and use it to login</Text>
					<PinCode
						value={pinValue}
						onChange={setPinValue}
						autoFocus={autoFocus}
						length={6}
						onComplete={(pinInput) => {
							updateAuthorization({ pinInput });
							props.navigation.navigate('ConfirmPasscode')
							setAutoFocus(false)
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const Passcode = (props:PasscodeProps) => {
	const navigation = useNavigation();
	return <PasscodeView {...props} navigation={navigation} />;
}
export default Passcode