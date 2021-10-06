import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View
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
	checkboxView: {
		fontWeight: '400',
		color: colors.darkGreen,
		fontSize: 14,
	},
	checkboxContainer: {
		borderWidth: 0,
		backgroundColor: 'transparent',
	},
});

const CreateAccount = (): JSX.Element => {
	const navigation = useNavigation();
	const { signUpDetails, setSignUpDetails, setSignInDetails } = useContext(AuthContext);
	const [isSelected, setSelection] = useState(true);

	const onValueChange = (_name: never, change: string) => {
		setSignUpDetails({ email: change });
		setSignInDetails({ email: change });
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
						<Text style={styles.label}>Email Address</Text>
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
					<CheckBox
						checked={isSelected}
						title="I've read and accept the Terms & Conditions and Privacy Policy"
						textStyle={styles.checkboxView}
						containerStyle={styles.checkboxContainer}
						checkedColor={colors.darkGreen}
						onPress={() => setSelection(!isSelected)}
					/>
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
