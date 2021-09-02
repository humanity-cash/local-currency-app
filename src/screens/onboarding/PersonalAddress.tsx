import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useState, useContext } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { useUserDetails } from "src/hooks";
import { BackBtn, Button, Header, CancelBtn, PersonalAddressForm } from 'src/shared/uielements';
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { validateAddressForm } from "src/utils/validation";
import { colors } from "src/theme/colors";

import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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
	const { signOut } = useContext(AuthContext);
	const { personalDetails, updateStatus } = useUserDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const onNextPress = () => {
		const validation = validateAddressForm(personalDetails);
		setShowValidation(true);
		if (validation.valid) {
			updateStatus({ personalDetails: true });
			props.navigation.navigate(Routes.LINK_BANK_ACCOUNT)
		}
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.LOGOUT} onClick={signOut} />}
			/>

			<ScrollView style={ wrappingContainerBase }>
				<View style={styles.content}>
					<View style={underlineHeader}>
						<Text style={styles.headerText}>{Translation.PROFILE.PERSIONAL_DETAILS}</Text>
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
						title={Translation.BUTTON.NEXT}
						disabled={!goNext}
						onPress={onNextPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const PersonalAddress = (props: PersonalAddressProps): ReactElement => {
	const navigation = useNavigation();
	return <PersonalAddressView {...props} navigation={navigation} />;
}
export default PersonalAddress