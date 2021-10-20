import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';
import { Header, BackBtn, AccordionCard } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB } from "src/theme/elements";
import { AccordionEntry } from "src/utils/types";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';

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
	}
});

const termsAndConditions: AccordionEntry = {
  title: "Terms & Conditions",
  content: "ARTICLE 1: GENERAL \n\nSection 1: Name -  The name of the corporation will be BerkShares, Inc., a non-profit corporation organized under the laws of the Commonwealth of Massachusetts.\n" +
  "Section 2: Area - The corporation will focus its activities in the Berkshire Region.\n" + 
  "Section 3: Offices - The principal office of the corporation will be at 140 Jug End Road, South Egremont, Massachusetts 01258 (mailing address: P O Box 125, Great Barrington, MA 01230) or at some other physical location as determined by the Board of Trustees."
}

const privacyPolicy: AccordionEntry = {
  title: "Privacy Policy",
  content: "Privacy Policy"
}

export const MerchantSettingsTermsAndConditions = (): ReactElement => {

	const navigation = useNavigation();

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
					<AccordionCard title={termsAndConditions.title} content={termsAndConditions.content} style={styles.accordionView} />
          			<AccordionCard title={privacyPolicy.title} content={privacyPolicy.content} style={styles.accordionView} />
				</View>
			</ScrollView>
		</View>
	);
}

export default MerchantSettingsTermsAndConditions;