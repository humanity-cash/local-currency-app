import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, BackBtn } from "src/shared/uielements";
import { underlineHeader, viewBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { colors } from "src/theme/colors";
import { Entypo } from '@expo/vector-icons';
import { FontFamily } from "src/theme/elements";
import { BERKSHARE_TERMS_URL, BERKSHARE_PRIVACY_URL } from 'src/config/env';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	container: {
		flex: 1, 
		padding: 10
	},
	faqView: {
		paddingBottom: 30, 
		paddingTop: 10
	},
	buttonView: {
		flexDirection: "row",
		backgroundColor: colors.inputBg,
	},
	buttonText: {
		flex: 1,
		fontFamily: FontFamily.bold,
		fontSize: 16
	},
	buttonIcon: {
		flexDirection: "row",
		alignItems: "center"
	},
	buttonContainer: {
		backgroundColor: colors.inputBg,
		padding: 20,
		marginBottom: 5
	},
});

const termsAndConditions: any = {
  title: "Terms & Conditions",
  link: BERKSHARE_TERMS_URL
}

const privacyPolicy: any = {
  title: "Privacy Policy",
  link: BERKSHARE_PRIVACY_URL
}

export const SettingsTermsAndConditions = (): ReactElement => {

	const navigation = useNavigation();

	const openTerms = () => {
		Linking.openURL(termsAndConditions.link)
	}

	const openPrivacy = () => {
		Linking.openURL(privacyPolicy.link)
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.container}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>{Translation.OTHER.LEGAL}</Text>
				</View>
				<View style={styles.faqView}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={openTerms}>
							<View style={styles.buttonView}>
								<Text style={styles.buttonText}>{termsAndConditions.title}</Text>
								<View style={styles.buttonIcon}>
									<Entypo 
										name="chevron-right" 
										size={16} 
										color={colors.text} 
									/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={openPrivacy}>
							<View style={styles.buttonView}>
								<Text style={styles.buttonText}>{privacyPolicy.title}</Text>
								<View style={styles.buttonIcon}>
									<Entypo 
										name="chevron-right" 
										size={16} 
										color={colors.text} 
									/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

export default SettingsTermsAndConditions;