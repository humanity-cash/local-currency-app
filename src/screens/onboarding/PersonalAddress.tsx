import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Button, Header, CancelBtn, PersonalAddressForm } from 'src/shared/uielements';
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import { validateAddressForm } from "src/utils/validation";

type PersonalAddressProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	bottomView: {
	  padding: 20,
  	},
});

const PersonalAddressView = (props: PersonalAddressProps) => {
	const { personalDetails, updateStatus } = useUserDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const onNextPress = () => {
		const validation = validateAddressForm(personalDetails);
		setShowValidation(true);
		if (validation.valid) {
			updateStatus({ personalDetails: true });
			props.navigation.navigate('LinkBankAccount')
		}
	}

	return (
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Tabs')} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>Personal address</Text>
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

const PersonalAddress = (props: PersonalAddressProps) => {
	const navigation = useNavigation();
	return <PersonalAddressView {...props} navigation={navigation} />;
}
export default PersonalAddress