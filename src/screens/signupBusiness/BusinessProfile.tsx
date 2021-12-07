import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext, UserContext } from 'src/contexts';
import * as Routes from 'src/navigation/constants';
import { BackBtn, BusinessProfileForm, Button, CancelBtn, Header } from 'src/shared/uielements';
import { colors } from "src/theme/colors";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
	buttonText: {
		color: colors.white
	},
	mainColor: {
		color: colors.purple
	},
	headerText: {
		fontSize: 32,
		color: colors.purple,
		lineHeight: 35
	},
	formView: {
		paddingBottom: 80
	},
	bottomView: {
		marginHorizontal: 20,
    	marginBottom: 20,
		backgroundColor: 'transparent'
	},
});

const BusinessProfile = (): ReactElement => {
	const navigation = useNavigation();
	const { user } = useContext(UserContext);
	const business = user?.business;
	const { signOut } = useContext(AuthContext);
	const [goNext, setGoNext] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(Boolean(business?.tag) && Boolean(business?.story));
	}, [business?.tag, business?.story]);

	const onNextPress = () => {
		navigation.navigate(Routes.BUSINESS_DETAIL);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.LOGOUT} onClick={signOut} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PROFILE.SETUP_PROFILE}</Text>
				</View>
				<View style={styles.formView}>
					<BusinessProfileForm
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<SafeAreaView style={styles.bottomView}>
					<Button
						type="purple"
						title={Translation.BUTTON.NEXT}
						disabled={!goNext}
						onPress={onNextPress}
					/>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BusinessProfile;