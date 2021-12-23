import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import { Text } from 'react-native-elements';
import { Header, BackBtn } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { colors } from "src/theme/colors";
import { Entypo } from '@expo/vector-icons';
import { FontFamily } from "src/theme/elements";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		color: colors.purple,
		lineHeight: 40
	},
	accordionView:  {
		color: colors.purple,
		backgroundColor: colors.white
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
	link: "https://docs.google.com/document/d/1f2lD1L1J1G78aMKuQGzfMQrfsari31_X5kIURksPmIA/edit#"
}

const privacyPolicy: any = {
	title: "Privacy Policy",
	link: "https://berkshares.org/about/privacy-policy/"
}
  
export const MerchantSettingsTermsAndConditions = (): ReactElement => {

	const navigation = useNavigation();

	const openTerms = () => {
		Linking.openURL(termsAndConditions.link)
	}

	const openPrivacy = () => {
		Linking.openURL(privacyPolicy.link)
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} color={colors.purple} />}
			/>
			<ScrollView style={styles.container}>
				<View style={ underlineHeaderB }>
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

export default MerchantSettingsTermsAndConditions;