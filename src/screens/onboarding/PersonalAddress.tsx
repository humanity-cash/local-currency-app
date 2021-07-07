import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Button, Header, NextBtn, PersonalAddressForm } from 'src/shared/uielements';
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { validateAddressForm } from "src/utils/validation";


type PersonalAddressProps = {
	navigation?: any
	route?: any
}

const PersonalAddressView = (props: PersonalAddressProps) => {
	const { personalDetails, updateStatus } = useUserDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const onNextPress = () => {
		const validation = validateAddressForm(personalDetails);
		setShowValidation(true);
		if (validation.valid) {
			updateStatus({ personalDetails: true });
			props.navigation.navigate('OnboardingSteps', { step: 2 });
		}
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<NextBtn text="Skip" onClick={() => props.navigation.navigate('OnboardingSteps', { step: 2 })} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>Enter your personal address</Text>
					</View>
					<PersonalAddressForm
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

const PersonalAddress = (props: PersonalAddressProps) => {
	const navigation = useNavigation();
	return <PersonalAddressView {...props} navigation={navigation} />;
}
export default PersonalAddress