import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';
import { Header, BackBtn, AccordionCard } from "src/shared/uielements";
import { underlineHeader, viewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { AccordionEntry } from "src/utils/types";

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
	}
});

const termsAndConditions: AccordionEntry = {
  title: "Terms & Conditions",
  content: "ARTICLE 1: GENERAL"
}

const privacyPolicy: AccordionEntry = {
  title: "Privacy Policy",
  content: "Privacy Policy"
}

export const SettingsTermsAndConditions = () => {

	const navigation = useNavigation();

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.container}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>Legal</Text>
				</View>
				<View style={styles.faqView}>
					<AccordionCard title={termsAndConditions.title} content={termsAndConditions.content} />
          <AccordionCard title={privacyPolicy.title} content={privacyPolicy.content} />
				</View>
			</ScrollView>
		</View>
	);
}

export default SettingsTermsAndConditions;