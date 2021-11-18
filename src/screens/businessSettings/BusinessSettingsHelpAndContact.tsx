import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Modal, ModalHeader, BackBtn, Button, AccordionCard, SearchInput } from "src/shared/uielements";
import { underlineHeaderB, modalViewBase, viewBaseB } from "src/theme/elements";
import faqList from "src/mocks/faq";
import { colors } from "src/theme/colors";
import { AccordionEntry } from "src/utils/types";
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';

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
		marginBottom: 80
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
	contactBtn: {
		width: '90%',
		position: 'absolute',
		bottom: 45,
		left: '5%'
	},
	modalWrap: {
		paddingHorizontal: 10,
		marginBottom: 10
	},
	modalHeader: {
		color: colors.purple,
		fontSize: 26,
		lineHeight: 45,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.purple
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	}
});

export const BusinessSettingsHelpAndContact = (): JSX.Element => {

	const [searchText, setSearchText] = useState<string>("");
	const [isContacted, setIsContacted] = useState<boolean>(false);
	const [faqData, setFaqData] = useState<AccordionEntry[]>([]);
	const navigation = useNavigation();

	useEffect(() => {
		const filtered: AccordionEntry[] = faqList.filter((item: AccordionEntry) => item.title.toLowerCase().includes(searchText.toLowerCase()));
		setFaqData(filtered);
	}, [searchText]);

	const onSearchChange = (name: string, change: string) => {
		setSearchText(change);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn text="Home" onClick={() => navigation.goBack()} color={colors.purple} />}
			/>
			<ScrollView style={styles.container}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.OTHER.HELP_CONTACT}</Text>
				</View>
				<Text style={styles.section}>{Translation.OTHER.HELP_CONTACT_DETAIL}</Text>
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
					{faqData.map((faq: AccordionEntry, index: number) => (
						<AccordionCard key={`faq-card-${index}`} title={faq.title} content={faq.content} style={styles.input} />
					))}
				</View>
			</ScrollView>
			<Button
				type={BUTTON_TYPES.PURPLE}
				title={Translation.BUTTON.CONTACT}
				style={styles.contactBtn}
				onPress={()=>setIsContacted(true)}
			/>
			{isContacted && (
				<Modal visible={isContacted}>
					<SafeAreaView style={ modalViewBase }>
						<ModalHeader
							leftComponent={<BackBtn onClick={()=>setIsContacted(false)} color={colors.purple} />}
						/>
						<ScrollView style={styles.modalWrap}>
							<Text style={styles.modalHeader}>{Translation.OTHER.CONTACT}</Text>
							<Text style={styles.section}>{Translation.OTHER.CONTACT_DETAIL}</Text>
						</ScrollView>
					</SafeAreaView>
				</Modal>
			)}
		</View>
	);
}

export default BusinessSettingsHelpAndContact;