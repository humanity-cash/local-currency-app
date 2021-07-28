import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Button, Header, CancelBtn, PersonalDetailsForm } from 'src/shared/uielements';
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import { validateDetailsForm } from "src/utils/validation";
import { colors } from "src/theme/colors";

type PersonalDetailsProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
  	bottomView: {
		padding: 20,
	},
});

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
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Tabs')} />}
			/>

			<ScrollView style={{ ...wrappingContainerBase }}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>Personal details</Text>
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

const PersonalDetails = (props: PersonalDetailsProps) => {
	const navigation = useNavigation();
	return <PersonalDetailsView {...props} navigation={navigation} />;
}
export default PersonalDetails