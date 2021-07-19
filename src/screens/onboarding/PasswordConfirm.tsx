import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Header, Button, BlockInput } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type PasswordConfirmProps = {
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
		padding: 20,
	},
});

const PasswordConfirmView = (props: PasswordConfirmProps) => {
	const [password, setPassword] = useState('');
	const [pinMatch, setPinMatch] = useState(true);
	const [goNext, setGoNext] = useState(false);
	const { authorization: { pinInput }, updateAuthorization, setLoggedIn } = useUserDetails();

	useEffect(() => {
		setGoNext(password !== "");
	},[password]);

	const onValueChange = (name: string, change: string) => {
		setPassword(change)
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ { ...baseHeader} }>
					{pinMatch && (<Text h1>Confirm password</Text>)}
					{!pinMatch && (<Text h1>No matching codes...please try again</Text>)}
				</View>
				<View>
					<Text style={{color: colors.darkRed, fontSize: 12, marginTop: 30}}>PASSWORD</Text>
					<BlockInput
						name="password"
						placeholder="Password"
						value={password}
						onChange={onValueChange}
						style={{backgroundColor: colors.azure}}
						placeholderTextColor={colors.darkRed}
					/>
				</View>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<View style={styles.bottomView}>
					<Button
						type="darkRed"
						title="NEXT"
						disabled={!goNext}
						style={{backgroundColor: colors.darkGreen}}
						onPress={() => props.navigation.navigate("Passcode")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const PasswordConfirm = (props:PasswordConfirmProps) => {
	const navigation = useNavigation();
	return <PasswordConfirmView {...props} navigation={navigation} />;
}
export default PasswordConfirm