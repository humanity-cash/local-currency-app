import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Button, CancelBtn, ModalHeader, PersonalAddressForm } from 'src/shared/uielements';
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { validateAddressForm } from "src/utils/validation";

type MissingPersonalAddressProps = {
	navigation?: any
	route?: any
}

const PersonalAddressView = (props: MissingPersonalAddressProps) => {
	const { personalDetails, updateStatus } = useUserDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const onNextPress = () => {
		const validation = validateAddressForm(personalDetails);
		setShowValidation(true);
		if (validation.valid) {
			updateStatus({ personalDetails: true });
			props.navigation.navigate('ListOfSteps');
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
						<Text h1>Enter your personal address</Text>
					</View>
					<PersonalAddressForm
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

const MissingPersonalAddress = (props: MissingPersonalAddressProps) => {
	const navigation = useNavigation();
	return <PersonalAddressView {...props} navigation={navigation} />;
}
export default MissingPersonalAddress