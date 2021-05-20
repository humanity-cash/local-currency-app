import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import moment from 'moment';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button';
import { Header } from "../../uielements/header/Header";
import { baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { NextBtn } from "../../uielements/header/NextBtn";
import { PersonalDetailsForm } from "../../uielements/reusable/PersonalDetailsForm";
import { useUserDetails } from "../../hooks/useUserDetails";
import { validateDetailsForm } from "../../utils/validation";

type PersonalDetailsProps = {
	navigation?: any
	route?: any
}

const PersonalDetailsView = (props: PersonalDetailsProps) => {
	const { personalDetails } = useUserDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const onNextPress = () => {
		const validation = validateDetailsForm(personalDetails);
		setShowValidation(true);
		if (validation.valid) {
			props.navigation.navigate('PersonalAddress');
		}
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<NextBtn text="Skip" onClick={() => props.navigation.navigate('OnboardingSteps', { step: 2 })} />}
			/>

			<ScrollView style={{ ...wrappingContainerBase }}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>Enter your personal details</Text>
					</View>
					<PersonalDetailsForm
						isValid={setGoNext}
						showValidation={showValidation}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<Button
					type="fluidDark"
					title="NEXT"
					disabled={!goNext}
					onPress={onNextPress}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const PersonalDetails = (props: PersonalDetailsProps) => {
	const navigation = useNavigation();
	return <PersonalDetailsView {...props} navigation={navigation} />;
}
export default PersonalDetails