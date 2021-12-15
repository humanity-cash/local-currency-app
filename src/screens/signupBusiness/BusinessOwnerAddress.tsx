import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useContext } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext, UserContext } from "src/contexts";
import * as Routes from 'src/navigation/constants';
import { BackBtn, Button, CancelBtn, Header } from "src/shared/uielements";
import { BusinessOwnerAddressForm } from 'src/shared/uielements/reusable';
import { colors } from "src/theme/colors";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

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
		paddingBottom: 120
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

const BusinessOwnerAddress = (): ReactElement => {
	const navigation = useNavigation();
	const { signOut } = useContext(AuthContext);
	const onNextPress = () => {
		navigation.navigate(Routes.BUSINESS_INFO)
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.LOGOUT} onClick={signOut} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PROFILE.BUSINESS_OWNER}</Text>
				</View>
				<View style={styles.formView}>
					<BusinessOwnerAddressForm style={styles.input} />
				</View>
			</ScrollView>
			
			<SafeAreaView style={styles.bottomView}>
				<Button
					type="purple"
					title={Translation.BUTTON.NEXT}
					disabled={false}
					onPress={onNextPress}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

export default BusinessOwnerAddress