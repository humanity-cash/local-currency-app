import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Button, BackBtn, Header, CancelBtn, PersonalProfileForm } from 'src/shared/uielements';
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { validateProfileForm } from "src/utils/validation";
import { colors } from "src/theme/colors";

import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type PersonalProfileProps = {
	navigation?: any
	route?: any
}

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

const PersonalProfileView = (props: PersonalProfileProps) => {
	const { personalDetails } = useUserDetails();
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isShowValidation, setIsShowValidation] = useState<boolean>(false);

	const onNextPress = () => {
		const validation = validateProfileForm(personalDetails);
		setIsShowValidation(true);
		if (validation.valid) {
			props.navigation.navigate(Routes.PERSONAL_DETAILS);
		}
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.LOGOUT} onClick={() => props.navigation.navigate(Routes.TEASER)} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>{Translation.PROFILE.SETUP_PROFILE}</Text>
				</View>
				<PersonalProfileForm
					isValid={setGoNext}
					showValidation={isShowValidation}
				/>
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

const PersonalProfile = (props: PersonalProfileProps): ReactElement => {
	const navigation = useNavigation();
	return <PersonalProfileView {...props} navigation={navigation} />;
}
export default PersonalProfile