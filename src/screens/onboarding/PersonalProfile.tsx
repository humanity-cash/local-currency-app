import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { BackBtn, Button, CancelBtn, Header, PersonalProfileForm } from 'src/shared/uielements';
import { colors } from "src/theme/colors";
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';


const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35
	},
	bottomView: {
		paddingHorizontal: 20,
    	paddingBottom: 50,
		backgroundColor: 'transparent'
	},
});

const PersonalProfile = (): ReactElement => {
	const navigation = useNavigation()
	const [isShowValidation, setIsShowValidation] = useState<boolean>(false);

	const onNextPress = () => {
		// const validation = validateProfileForm(personalDetails);
		// setIsShowValidation(true);
		// if (validation.valid) {
			navigation.navigate(Routes.PERSONAL_DETAILS);
		// }
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.LOGOUT} onClick={() => props.navigation.navigate(Routes.TEASER)} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>{Translation.PROFILE.SETUP_PROFILE}</Text>
				</View>
				<PersonalProfileForm
					// isValid={setGoNext}
					// showValidation={isShowValidation}
				/>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.NEXT}
						disabled={false}
						onPress={onNextPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default PersonalProfile