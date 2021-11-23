import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState, RefObject, createRef } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { BackBtn, BlockInput, Button, Header } from 'src/shared/uielements';
import { colors } from 'src/theme/colors';
import {
	baseHeader,
	viewBaseWhite,
	wrappingContainerBase
} from 'src/theme/elements';
import { isPasswordValid } from 'src/utils/validation';
import Translation from 'src/translation/en.json';
import { useDispatch } from 'react-redux';
import { showLoadingProgress, hideLoadingProgress } from '../../store/loading/loading.actions';
import { LoadingScreenTypes } from 'src/utils/types';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35,
	},
	inlineView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bodyText: {
		color: colors.bodyText,
	},
	errorText: {
		color: colors.mistakeRed,
		fontSize: 12,
		lineHeight: 14,
	},
	form: {
		marginTop: 30,
	},
	label: {
		fontSize: 12,
		lineHeight: 14,
		color: colors.bodyText,
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20,
	},
});

const Password = (): JSX.Element => {
	const navigation = useNavigation();
	const { setSignUpDetails, signUpDetails, signUp } = useContext(AuthContext);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
	const conPwRef: RefObject<TextInput> = createRef()
	const dispatch = useDispatch()

	useEffect(() => {
		if (
			isPasswordValid(signUpDetails.password) &&
			isPasswordValid(signUpDetails.confirmPassword)
		) {
			if (signUpDetails.password === signUpDetails.confirmPassword) {
				setIsValidPassword(true);
			}
		}
	}, [signUpDetails.confirmPassword, signUpDetails.password]);

	const onValueChange = (
		name: 'password' | 'confirmPassword',
		change: string
	) => {
		setSignUpDetails({
			...signUpDetails,
			[name]: change,
		});
	};

	return (
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.EMAIL_VERIFICATION.CREATE_PASSWORD}</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>
						{Translation.EMAIL_VERIFICATION.CREATE_PASSWORD_DETAIL}
					</Text>
					<View style={styles.form}>
						<Text style={styles.label}>PASSWORD</Text>
						<Text style={styles.label}>
							{Translation.LABEL.PASSWORD_REG}
						</Text>
						<BlockInput
							name='password'
							placeholder='Password'
							value={signUpDetails.password}
							secureTextEntry={true}
							onChange={onValueChange}
							returnKeyType='next'
							onSubmitEditing={()=>{
								conPwRef.current?.focus()			
							}}
						/>

						<View style={styles.inlineView}>
							<Text style={styles.label}>Confirm password</Text>
							{!isValidPassword && (
								<Text style={styles.errorText}>No match</Text>
							)}
						</View>
						<BlockInput
							reff={conPwRef}
							name='confirmPassword'
							placeholder='confirm password'
							value={signUpDetails.confirmPassword}
							secureTextEntry={true}
							onChange={onValueChange}
						/>
					</View>
				</View>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
				<SafeAreaView style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title='NEXT'
						disabled={!isValidPassword}
						onPress={async () => {
							dispatch(showLoadingProgress(LoadingScreenTypes.LOADING_DATA))
							const response = await signUp();
							dispatch(hideLoadingProgress())
							if (response.success) {
								navigation.navigate(Routes.VERIFICATION);
							}
						}}
					/>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Password;
