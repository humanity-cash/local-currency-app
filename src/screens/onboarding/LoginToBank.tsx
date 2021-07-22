import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { BackBtn, Header, CancelBtn, BlockInput, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import listOfBanks from "src/mocks/banks";

type LoginToBankProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	imageView: {
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	image: {
		alignSelf: "center",
		width: '45%',
		height: 100
	},
	bottomView: {
		padding: 20,
	},
});

const LoginToBankView = (props: LoginToBankProps) => {
	const [accountName, setAccountName] = useState('');
	const [password, setPassword] = useState('');
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		setGoNext(accountName !== "" && password !== "");
	},[accountName, password]);

	const onValueChange = (name: string, value: string) => {
		if (name == 'accountName') {
			setAccountName(value);
		} else {
			setPassword(value);
		}
	}

	return (
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Tabs')} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1 style={{color: colors.blue}}>Log in to your bank</Text>
					<Text>By providing your Chase bank credencials to Dwolla, you're enabling Dwolla to retrieve your financial data.</Text>
				</View>
				<View style={styles.imageView}>
					<Image
						source={require('../../../assets/images/bank.png')}
						containerStyle={styles.image}
					/>
				</View>
				<View>
					<BlockInput
						placeholder="Account name"
						name="accountName"
						value={accountName}
						style={{backgroundColor: colors.azure}}
						onChange={onValueChange}
					/>
					<BlockInput
						placeholder="Password"
						name="password"
						value={password}
						style={{backgroundColor: colors.azure}}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkRed"
						style={{backgroundColor: colors.blue}}
						title="Submit"
						textStyle={{color: colors.white}}
						disabled={!goNext}
						onPress={() => props.navigation.navigate("SelectBankAccount")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const LoginToBank = (props: LoginToBankProps) => {
	const navigation = useNavigation();
	return <LoginToBankView {...props} navigation={navigation} />;
}
export default LoginToBank