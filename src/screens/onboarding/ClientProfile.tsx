import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { BackBtn, Button, CancelBtn, Header, ClientProfileForm } from 'src/shared/uielements';
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

const ClientProfile = (): ReactElement => {
	const navigation = useNavigation();
	const [goNext, setGoNext] = useState<boolean>(false);
	const { signOut, customerBasicVerificationDetails } = useContext(AuthContext);

	useEffect(() => {
		setGoNext(customerBasicVerificationDetails.tag !== "");
	}, [customerBasicVerificationDetails.tag]);

	const onNextPress = () => {
		navigation.navigate(Routes.CLIENT_DETAILS);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.LOGOUT} onClick={signOut} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>{Translation.PROFILE.SETUP_PROFILE}</Text>
				</View>
				<ScrollView>
					<ClientProfileForm />
				</ScrollView>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.NEXT}
						disabled={!goNext}
						onPress={onNextPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default ClientProfile