import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';
import { Header, Modal, ModalHeader, BackBtn, Button, FAQCard, SearchInput } from "src/shared/uielements";
import { underlineHeader, viewBase, modalViewBase } from "src/theme/elements";
import faqList from "src/mocks/faq";
import { colors } from "src/theme/colors";
import { FAQCardProps } from "src/utils/types";

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

export const SettingsHelpAndContact = () => {

	const [searchText, setSearchText] = useState<string>("");
	const [isContact, setIsContact] = useState<boolean>(false);
	const [faqData, setFaqData] = useState<FAQCardProps[]>([]);
	const navigation = useNavigation();

	useEffect(() => {
		const filtered: FAQCardProps[] = faqList.filter((item: FAQCardProps) => item.question.toLowerCase().includes(searchText.toLowerCase()));
		setFaqData(filtered);
	}, [searchText]);

	const onSearchChange = (name: any, change: any) => {
		setSearchText(change);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.container}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>Help & Contact</Text>
				</View>
				<Text style={styles.section}>We are here to help you with anything and everything on the BerkShares app.</Text>
				<SearchInput
					label="Search"
					name="searchText"
					keyboardType="default"
					placeholder="Search help"
					value={searchText}
					onChange={onSearchChange}
				/>
				<View style={styles.faqView}>
					<Text style={styles.sectionHeader}>FREQUENTLY ASKED QUESTIONS</Text>
					{faqData.map((faq: FAQCardProps, index: number) => (
						<FAQCard key={`faq-card-${index}`} question={faq.question} answer={faq.answer} />
					))}
				</View>
			</ScrollView>
			<Button
				type="darkGreen"
				title="Contact"
				style={styles.contactBtn}
				onPress={()=>setIsContact(true)}
			/>
			{isContact && (
				<Modal visible={isContact}>
					<View style={ modalViewBase }>
						<ModalHeader
							leftComponent={<BackBtn onClick={()=>setIsContact(false)} />}
						/>
						<ScrollView style={styles.modalWrap}>
							<Text style={styles.modalHeader}>Contact</Text>
							<Text style={styles.section}>If you have questions, complaints, remarks, or just like to chat, please send an email to fennie@humanity.cash or contact the Schumacher Center by calling 010 - 125 087 66.</Text>
						</ScrollView>
					</View>
				</Modal>
			)}
		</View>
	);
}

export default SettingsHelpAndContact;