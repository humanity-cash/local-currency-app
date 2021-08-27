import React, { useState, ReactElement } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Header, Button, CancelBtn, BackBtn, PersonalDetailsForm } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { validateDetailsForm } from "src/utils/validation";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type BusinessOwnerDetailProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
    headerText: {
		fontSize: 32,
        lineHeight: 32,
		color: colors.purple,
	},
    bodyView: {
        paddingTop: 50,
        paddingHorizontal: 17
    },
    bodyText: {
        color: colors.bodyText
    },
	label: {
		marginTop: 30,
        color: colors.bodyText,
		fontSize: 10
    },
	input: {
		color: colors.purple,
		backgroundColor: colors.white
	},
	formView: {
		paddingBottom: 40
	},
    bottomView: {
		paddingHorizontal: 20,
        paddingBottom: 50
	},
});

const BusinessOwnerDetail = (props: BusinessOwnerDetailProps): ReactElement => {
	const {personalDetails} = useUserDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const onNextPress = () => {
		const validation = validateDetailsForm(personalDetails);
		setShowValidation(true);
		if (validation.valid) {
			props.navigation.navigate(Routes.BUSINESS_OWNER_ADDRESS);
		}
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.CLOSE} onClick={() => props.navigation.navigate(Routes.TEASER)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
                <View style={underlineHeaderB}>
                    <Text style={styles.headerText}>{Translation.PROFILE.BUSINESS_OWNER}</Text>
                </View>
				<View style={styles.formView}>
					<PersonalDetailsForm
						isValid={setGoNext}
						showValidation={showValidation}
						style={styles.input}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						title={Translation.BUTTON.NEXT}
						disabled={!goNext}
						onPress={onNextPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BusinessOwnerDetail