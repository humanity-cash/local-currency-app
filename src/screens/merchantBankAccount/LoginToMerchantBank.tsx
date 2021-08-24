import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, ReactElement } from 'react';
import { StyleSheet, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { BackBtn, Header, CancelBtn, BlockInput, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase, underlineHeaderB } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type LoginToMerchantBankProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
        lineHeight: 32,
		color: colors.purple
	},
	bodyText: {
        color: colors.bodyText
    },
	imageView: {
		marginTop: 30,
		marginBottom: 20,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	image: {
		alignSelf: "center",
		width: '40%',
		height: 90
	},
	form: {
		paddingBottom: 40
	},
	label: {
		fontSize: 12,
		lineHeight: 14,
		color: colors.bodyText
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50
	},
});

const LoginToMerchantBankView = (props: LoginToMerchantBankProps) => {
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
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" color={colors.purple} onClick={() => props.navigation.navigate(Routes.TABS)} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.BANK_ACCOUNT.LOGIN_BANK}</Text>
				</View>
				<Text style={styles.bodyText}>{Translation.BANK_ACCOUNT.LOGIN_BANK_DETAIL}</Text>
				<View style={styles.imageView}>
					<Image
						source={require('../../../assets/images/bank1.png')}
						containerStyle={styles.image}
					/>
				</View>
				<View style={styles.form}>
					<Text style={styles.label}>{Translation.LABEL.ACCOUNT_NAME}</Text>
					<BlockInput
						name="accountName"
						placeholder="Account name"
						style={styles.input}
						value={accountName}
						onChange={onValueChange}
					/>

					<Text style={styles.label}>{Translation.LABEL.PASSWORD}</Text>
					<BlockInput
						name="password"
						placeholder="Password"
						style={styles.input}
						value={password}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						title="Submit"
						disabled={!goNext}
						onPress={() => props.navigation.navigate(Routes.SELECT_MERCHANT_BANK_ACCOUNT)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const LoginToMerchantBank = (props: LoginToMerchantBankProps): ReactElement => {
	const navigation = useNavigation();
	return <LoginToMerchantBankView {...props} navigation={navigation} />;
}
export default LoginToMerchantBank