import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button'
import { BlockInput } from '../../uielements/BlockInput'
import { useUserDetails } from "../../hooks/useUserDetails";
import { Header } from "../../uielements/header/Header";
import { baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { NextBtn } from "../../uielements/header/NextBtn";
import { colors } from "../../theme/colors";

const EMAIL_VALIDATION = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

interface TermsEmailState {
	email: string
}

type TermsEmailProps = {
	navigation?: any
	route?: any
}

const TermsEmailView = (props: TermsEmailProps) => {
	const { personalDetails, updatePersonalDetails } = useUserDetails();
	const [emailValid, setEmailValid] = useState(true);
	const [state, setState] = useState<TermsEmailState>({
		email: ''
	});
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		setGoNext(emailValid && Object.keys(state).every((key) => state[key] !== ''));
	}, [state, emailValid]);

	useEffect(() => {
		setState({
			email: personalDetails.email
		});
	}, [personalDetails]);

	const onValueChange = (name: any, change: any) => {
		if (!emailValid) {
			setEmailValid(EMAIL_VALIDATION.test(change))
		}
		setState({
			...state,
			[name]: change
		} as any)
		updatePersonalDetails({ [name]: change });
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<NextBtn text="Skip" onClick={() => props.navigation.navigate('OnboardingSteps', { step: 4 })} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>We will send it to your email</Text>
					</View>
					<Text style={{ marginBottom: 20 }}>We will use email to share important documents with you, like our terms and conditions. No spam, promised.</Text>
					<View>
						<Text h3>Email address</Text>
						{!emailValid && (<Text h3 style={{ marginTop: 5, color: colors.textError}}>Please enter valid email address</Text>)}
						<BlockInput
							name="email"
							placeholder="name@example.com"
							keyboardType="email-address"
							value={state.email}
							onChange={onValueChange}
						/>
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<Button
					type="fluidDark"
					title="NEXT"
					disabled={!goNext}
					onPress={() => {
						const isEmailValid = EMAIL_VALIDATION.test(state.email);
						setEmailValid(isEmailValid);
						if (!isEmailValid) {
							return;
						}
						props.navigation.navigate('ConfirmEmail');
					}}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const TermsEmail = (props: TermsEmailProps) => {
	const navigation = useNavigation();
	return <TermsEmailView {...props} navigation={navigation} />;
}
export default TermsEmail