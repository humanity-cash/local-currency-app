import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Button, BackBtn, Header, CancelBtn, PersonalProfileForm } from 'src/shared/uielements';
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { validateProfileForm } from "src/utils/validation";
import { colors } from "src/theme/colors";

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
			props.navigation.navigate('PersonalDetails');
		}
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Log out" onClick={() => props.navigation.navigate('Teaser')} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>Set up your profile</Text>
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