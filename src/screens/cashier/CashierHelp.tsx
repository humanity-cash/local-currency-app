import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';
import { Header, BackBtn, AccordionCard, SearchInput } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB } from "src/theme/elements";
import faqList from "src/mocks/faq";
import { colors } from "src/theme/colors";
import { FaqData } from "src/utils/types";
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	container: {
		flex: 1, 
		paddingHorizontal: 10,
		paddingBottom: 80
	},
	section: {
		fontSize: 16,
		marginVertical: 10,
		color: colors.bodyText
	},
	sectionHeader: {
		fontSize: 10,
		color: colors.purple
	},
	faqView: {
		paddingBottom: 30, 
		paddingTop: 10
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	}
});

export const CashierSettingsHelpAndContact = (): JSX.Element => {

	const [searchText, setSearchText] = useState<string>("");
	const [faqData, setFaqData] = useState<FaqData[]>([]);
	const navigation = useNavigation();

	useEffect(() => {
		const filtered: FaqData[] = faqList.filter((item: FaqData) => item.title.toLowerCase().includes(searchText.toLowerCase()));
		setFaqData(filtered);
	}, [searchText]);

	const onSearchChange = (name: string, change: string) => {
		setSearchText(change);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} color={colors.purple} />}
			/>
			<ScrollView style={styles.container}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.CASHIER.HELP}</Text>
				</View>
				<Text style={styles.section}>{Translation.CASHIER.HELP_DETAIL}</Text>
				<SearchInput
					label="Search"
					name="searchText"
					keyboardType="default"
					placeholder="Search help"
					value={searchText}
					style={styles.input}
					textColor={colors.greyedPurple}
					onChange={onSearchChange}
				/>
				<View style={styles.faqView}>
					<Text style={styles.sectionHeader}>{Translation.LABEL.QUESTIONS_FREQUENTLY}</Text>
					{faqData.map((faq: FaqData, index: number) => (
						<AccordionCard key={`faq-card-${index}`} title={faq.title} content={faq.content} style={styles.input} textColor={colors.purple} />
					))}
				</View>
			</ScrollView>
		</View>
	);
}

export default CashierSettingsHelpAndContact;