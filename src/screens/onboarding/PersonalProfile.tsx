import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Button, Header, CancelBtn, PersonalProfileForm } from 'src/shared/uielements';
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import { validateProfileForm } from "src/utils/validation";

type PersonalProfileProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
  	bottomView: {
		padding: 20,
	},
});

const PersonalProfileView = (props: PersonalProfileProps) => {
	const { personalDetails } = useUserDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const onNextPress = () => {
		const validation = validateProfileForm(personalDetails);
		setShowValidation(true);
		if (validation.valid) {
			props.navigation.navigate('PersonalDetails');
		}
	}

	return (
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Tabs')} />}
			/>

			<ScrollView style={{ ...wrappingContainerBase }}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>Set up your profile</Text>
					</View>
					<PersonalProfileForm
						isValid={setGoNext}
						showValidation={showValidation}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<View style={styles.bottomView}>
					<Button
						type="darkRed"
						title="NEXT"
						disabled={!goNext}
						onPress={onNextPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const PersonalProfile = (props: PersonalProfileProps) => {
	const navigation = useNavigation();
	return <PersonalProfileView {...props} navigation={navigation} />;
}
export default PersonalProfile