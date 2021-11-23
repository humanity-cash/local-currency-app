import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { Button, BackBtn, Header, CancelBtn, BusinessProfileForm } from 'src/shared/uielements';
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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
	bottomButton: {
		width: '90%',
		position: 'absolute',
		bottom: 45,
		left: '5%'
	},
	bottomView: {
		marginHorizontal: 20,
    	marginBottom: 20
	},
});

const BusinessProfile = (): ReactElement => {
	const navigation = useNavigation()
	const { signOut, buisnessBasicVerification } = useContext(AuthContext);
	const [goNext, setGoNext] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(buisnessBasicVerification.tag !== "");
	}, [buisnessBasicVerification.tag]);

	const onNextPress = () => {
		navigation.navigate(Routes.BUSINESS_DETAIL);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.LOGOUT} onClick={signOut} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PROFILE.SETUP_PROFILE}</Text>
				</View>
				<ScrollView>
					<View style={styles.formView}>
						<BusinessProfileForm
						/>
					</View>
				</ScrollView>
			</View>
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