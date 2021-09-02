import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { BackBtn, Header, CancelBtn, SearchInput } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase, underlineHeader } from "src/theme/elements";
import listOfBanks from "src/mocks/banks";
import { Bank } from "src/utils/types";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
        lineHeight: 32
	},
    bodyView: {
        paddingTop: 50,
        paddingHorizontal: 17
    },
	bankItem: {
		width: '48%',
		height: 100,
		marginBottom: 10,
		backgroundColor: colors.card,
		justifyContent: 'center',
		alignItems: 'center'
	},
	bankView: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	image: {
		width: '50%',
		height: 80
	},
});

const SelectBank = (): JSX.Element => {
	const navigation = useNavigation();
	const [searchPhrase, setSearchPhrase] = useState('');
	const [bank, setBank] = useState('');

	useEffect(() => {
		if (bank !== '') {
			navigation.navigate(Routes.LOGIN_BANK)
		}
	},[bank]);

	const onValueChange = (name: string, change: string) => {
		setSearchPhrase(change);
	}

	const renderBanks = () => {
		let found: Bank[] = [];
		if (searchPhrase !== '') {
			found = listOfBanks.filter(entry => entry.name.toLowerCase().includes(searchPhrase.toLowerCase()));
		}

		if (searchPhrase === '') {
			found = listOfBanks;
		}

		return found.map((entry, i) => (
			<View style={styles.bankItem} key={i}>
				<TouchableWithoutFeedback onPress={() => setBank(entry.id)} >
					<Image
						source={require('../../../assets/images/bank2.png')}
						containerStyle={styles.image}
					/>
				</TouchableWithoutFeedback>
			</View>
			
		))
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => navigation.navigate(Routes.TABS)} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<View style={underlineHeader}>
						<Text style={styles.headerText}>{Translation.BANK_ACCOUNT.SELECT_BANK}</Text>
					</View>
					<SearchInput
						label="Search"
						name="searchText"
						keyboardType="default"
						placeholder="Search help"
						value={searchPhrase}
						onChange={onValueChange}
					/>
				</View>
				<View style={styles.bankView}>
					{renderBanks()}
				</View>
			</ScrollView>
		</View>
	);
}

export default SelectBank