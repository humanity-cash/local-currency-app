import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Button, CancelBtn, ModalHeader, PersonalDetailsForm } from 'src/shared/uielements';
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { validateDetailsForm } from "src/utils/validation";

type MissingPersonalDetailsProps = {
	navigation?: any
	route?: any
}

const PersonalDetailsView = (props: MissingPersonalDetailsProps) => {
	const { personalDetails } = useUserDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const onNextPress = () => {
		const validation = validateDetailsForm(personalDetails);
		setShowValidation(true);
		if (validation.valid) {
			props.navigation.navigate('MissingPersonalAddress');
		}
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<ScrollView style={{ ...wrappingContainerBase }}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>Enter your personal details</Text>
					</View>
					<PersonalDetailsForm
						isValid={setGoNext}
						showValidation={showValidation}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
			>
				<Button
					type="fluidDark"
					title="NEXT"
					disabled={!goNext}
					onPress={onNextPress}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const MissingPersonalDetails = (props: MissingPersonalDetailsProps) => {
	const navigation = useNavigation();
	return <PersonalDetailsView {...props} navigation={navigation} />;
}
export default MissingPersonalDetails