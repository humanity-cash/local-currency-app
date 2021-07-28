import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Header, BlockInput, Button } from "src/shared/uielements";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type PasswordProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	codeView: {
		flex: 1
	},
	bottomView: {
		padding: 20,
	},
});

const PasswordView = (props: PasswordProps) => {
	const { updateAuthorization } = useUserDetails();
	const [password, setPassword] = useState('');
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		setGoNext(password !== "");
	},[password]);

	const onValueChange = (name: any, change: any) => {
		setPassword(change);
	};

	return (
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ { ...baseHeader} }>
					<Text h1 h1Style={{color: colors.blue}}>Create a Password</Text>
				</View>
				<View>
					<Text>Create a password to secure your account</Text>
					<Text style={{color: colors.darkRed, fontSize: 12, marginTop: 10}}>PASSWORD</Text>
					<BlockInput
						name="password"
						placeholder="Password"
						value={password}
						onChange={onValueChange}
						style={{backgroundColor: colors.azure}}
						placeholderTextColor={colors.darkRed}
					/>
					<Text style={{color: colors.darkRed, fontSize: 10, lineHeight: 10}}>AT LEAST 8 CHARACTERS, 1 CAPITCAL, 1 LOWER AND 1 SYMBOL</Text>
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
						onPress={() => props.navigation.navigate("ConfirmPassword")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const Password = (props:PasswordProps) => {
	const navigation = useNavigation();
	return <PasswordView {...props} navigation={navigation} />;
}
export default Password