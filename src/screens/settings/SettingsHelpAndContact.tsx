import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, ReactElement } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';
import { Header, Modal, ModalHeader, BackBtn, Button, AccordionCard, SearchInput } from "src/shared/uielements";
import { underlineHeader, viewBase, modalViewBase } from "src/theme/elements";
import faqList from "src/mocks/faq";
import { colors } from "src/theme/colors";
import { FaqData } from "src/utils/types";
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	container: {
		flex: 1, 
		paddingHorizontal: 10,
		marginBottom: 80
	},
	section: {
		fontSize: 16,
		marginVertical: 10
	},
	sectionHeader: {
		fontSize: 10
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
		fontFamily: "IBMPlexSansSemiBold",
		fontSize: 26,
		lineHeight: 45,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.darkGreen
	},
});

export const SettingsHelpAndContact = (): ReactElement => {

	const [searchText, setSearchText] = useState<string>("");
	const [isContacted, setIsContacted] = useState<boolean>(false);
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
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.container}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>{Translation.OTHER.HELP_CONTACT}</Text>
				</View>
				<Text style={styles.section}>{Translation.OTHER.HELP_CONTACT_DETAIL}</Text>
				<SearchInput
					label="Search"
					name="searchText"
					keyboardType="default"
					placeholder="Search help"
					value={searchText}
					onChange={onSearchChange}
				/>
				<View style={styles.faqView}>
					<Text style={styles.sectionHeader}>{Translation.LABEL.QUESTIONS_FREQUENTLY}</Text>
					{faqData.map((faq: FaqData, index: number) => (
						<AccordionCard key={`faq-card-${index}`} title={faq.title} content={faq.content} />
					))}
				</View>
			</ScrollView>
			<Button
				type="darkGreen"
				title={Translation.BUTTON.CONTACT}
				style={styles.contactBtn}
				onPress={()=>setIsContacted(true)}
			/>
			{isContacted && (
				<Modal visible={isContacted}>
					<View style={ modalViewBase }>
						<ModalHeader
							leftComponent={<BackBtn onClick={()=>setIsContacted(false)} />}
						/>
						<ScrollView style={styles.modalWrap}>
							<Text style={styles.modalHeader}>{Translation.OTHER.CONTACT}</Text>
							<Text style={styles.section}>{Translation.OTHER.CONTACT_DETAIL}</Text>
						</ScrollView>
					</View>
				</Modal>
			)}
		</View>
	);
}

export default SettingsHelpAndContact;