import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import * as Routes from 'src/navigation/constants';
import { BackBtn, Button, CancelBtn, Header, PersonalDetailsForm } from 'src/shared/uielements';
import { colors } from "src/theme/colors";
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

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

const PersonalDetailsView = () => {
	const navigation = useNavigation()

	const onNextPress = () => {
			navigation.navigate(Routes.PERSONAL_ADDRESS);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.LOGOUT} onClick={() => navigation.navigate(Routes.TEASER)} />}
			/>

			<ScrollView style={ wrappingContainerBase }>
				<View style={styles.content}>
					<View style={underlineHeader}>
						<Text style={styles.headerText}>{Translation.PROFILE.PERSIONAL_DETAILS}</Text>
					</View>
					<PersonalDetailsForm />
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title={Translation.BUTTON.NEXT}
						disabled={false}
						onPress={onNextPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const PersonalDetails = (props: PersonalDetailsProps): ReactElement => {
	const navigation = useNavigation();
	return <PersonalDetailsView {...props} navigation={navigation} />;
}
export default PersonalDetails