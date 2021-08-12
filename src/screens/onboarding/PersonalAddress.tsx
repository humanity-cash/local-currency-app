import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Button, Header, CancelBtn, PersonalAddressForm } from 'src/shared/uielements';
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { validateAddressForm } from "src/utils/validation";
import { colors } from "src/theme/colors";

type PersonalAddressProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	content: { 
		paddingBottom: 40 
	},
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35
	},
  	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50
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
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Log out" onClick={() => props.navigation.navigate('Teaser')} />}
			/>

			<ScrollView style={ wrappingContainerBase }>
				<View style={styles.content}>
					<View style={underlineHeader}>
						<Text style={styles.headerText}>Personal address</Text>
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
						type="darkGreen"
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