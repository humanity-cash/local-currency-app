import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button'
import { BlockInput } from '../../uielements/BlockInput'
import { SelectionProps, SelectModal } from '../../uielements/SelectModal'
import { useUserDetails } from "../../hooks/useUserDetails";
import countries from '../../mocks/countries'
import { modalViewBase, baseHeader, wrappingContainerBase, modalBaseHeader } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { colors } from "../../theme/colors";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { MODAL_SCREEN_OFFSET } from "../../uielements/Modal";
import { validateDetailsForm } from "../../utils/validation";
import { PersonalDetailsForm } from "../../uielements/reusable/PersonalDetailsForm";

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