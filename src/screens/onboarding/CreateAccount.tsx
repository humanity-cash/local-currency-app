import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
	Linking
} from 'react-native';
import { CheckBox, Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import BlockInput from 'src/shared/uielements/BlockInput';
import Button from 'src/shared/uielements/Button';
import BackBtn from 'src/shared/uielements/header/BackBtn';
import Header from 'src/shared/uielements/header/Header';
import { colors } from 'src/theme/colors';
import {
	baseHeader,
	viewBase,
	wrappingContainerBase
} from 'src/theme/elements';
import { isEmailValid } from 'src/utils/validation';
import Translation from 'src/translation/en.json';
import { BERKSHARE_PRIVACY_URL, BERKSHARE_TERMS_URL } from 'src/config/env';

const styles = StyleSheet.create({
	container: {
		paddingBottom: 40,
	},
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35,
	},
	bodyText: {
		color: colors.bodyText,
	},
	form: {
		marginTop: 30,
	},
	label: {
		fontSize: 10,
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	checkboxTextView: {
		fontWeight: '400',
		paddingTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	checkboxContainer: {
		borderWidth: 0,
		backgroundColor: 'transparent',
	},
	terms: {
		flexDirection: 'row',
		paddingBottom: 30,
		width: '80%'
	},
	underlineText: {
		textDecorationLine: 'underline'
	}
});

const CreateAccount = (): JSX.Element => {
	const navigation = useNavigation();
	const { signUpDetails, updateSignUpDetails } = useContext(AuthContext);
	const [isSelected, setSelection] = useState(true);

	const onValueChange = (_name: never, change: string) => {
		updateSignUpDetails({ email: change });
	};

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={styles.container}>
					<View style={baseHeader}>
						<Text style={styles.headerText}>Create account</Text>
					</View>
					<Text style={styles.bodyText}>
						Hello! Tell us how to reach you. We will send a
						Verification code to your email.
					</Text>
					<View style={styles.form}>
						<Text style={styles.label}>{Translation.LABEL.EMAIL_ADDR}</Text>
						<BlockInput
							name='email'
							placeholder='myname@mail.com'
							value={signUpDetails.email}
							onChange={onValueChange}
							placeholderTextColor={colors.lightGreen}
						/>
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
				<View style={styles.bottomView}>
					<View style={styles.terms}>
						<CheckBox
							checked={isSelected}
							title=""
							containerStyle={styles.checkboxContainer}
							checkedColor={colors.darkGreen}
							onPress={() => setSelection(!isSelected)}
						/>
						<View style={styles.checkboxTextView}>
							<Text style={styles.bodyText}>I've read and accept the </Text>
							<Text style={styles.underlineText} onPress={()=>Linking.openURL(BERKSHARE_TERMS_URL)}>Terms & Conditions </Text>
							<Text style={styles.bodyText}>and </Text>
							<Text style={styles.underlineText} onPress={()=>Linking.openURL(BERKSHARE_PRIVACY_URL)}>Privacy Policy</Text>
						</View>
					</View>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title='NEXT'
						disabled={
							!isEmailValid(signUpDetails.email) || !isSelected
						}
						onPress={() => navigation.navigate(Routes.PASSWORD)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default CreateAccount;
