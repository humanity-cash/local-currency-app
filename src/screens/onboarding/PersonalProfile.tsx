import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BUTTON_TYPES } from 'src/constants';
import { AuthContext, UserContext } from "src/contexts";
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
		marginHorizontal: 20,
    	marginBottom: 20,
		backgroundColor: 'transparent'
	},
});

const PersonalProfile = (): ReactElement => {
	const navigation = useNavigation();
	const [goNext, setGoNext] = useState<boolean>(false);
	const { user } = useContext(UserContext);
	const { signOut  } = useContext(AuthContext);
	const customer = user?.customer;
	const tag = customer?.tag;

	useEffect(() => {
		setGoNext(Boolean(tag));
	}, [tag]);

	const onNextPress = () => {
		navigation.navigate(Routes.PERSONAL_DETAILS);
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.LOGOUT} onClick={signOut} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>{Translation.PROFILE.SETUP_PROFILE}</Text>
				</View>
				<ScrollView>
					<PersonalProfileForm />
				</ScrollView>
			</View>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.DARK_GREEN}
					title={Translation.BUTTON.NEXT}
					disabled={!goNext}
					onPress={onNextPress}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

export default PersonalProfile