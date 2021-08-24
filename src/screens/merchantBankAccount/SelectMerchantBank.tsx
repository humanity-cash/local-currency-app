import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, ReactElement } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { BackBtn, Header, CancelBtn, SearchInput } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBaseB, wrappingContainerBase, underlineHeaderB } from "src/theme/elements";
import listOfBanks from "src/mocks/banks";
import { Bank } from "src/utils/types";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type SelectMerchantBankProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
        lineHeight: 32,
		color: colors.purple
	},
    bodyView: {
        paddingTop: 50,
        paddingHorizontal: 17
    },
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	bankItem: {
		width: '48%',
		height: 100,
		marginBottom: 10,
		backgroundColor: colors.white,
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

const SelectMerchantBankView = (props: SelectMerchantBankProps) => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [bank, setBank] = useState('');

	useEffect(() => {
		if (bank !== '') {
			props.navigation.navigate(Routes.LOGIN_MERCHANT_BANK)
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
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => props.navigation.navigate(Routes.MERCHANT_TABS)} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<View style={underlineHeaderB}>
						<Text style={styles.headerText}>{Translation.BANK_ACCOUNT.SELECT_BANK}</Text>
					</View>
					<SearchInput
						label="Search"
						name="searchText"
						keyboardType="default"
						placeholder="Search help"
						style={styles.input}
						textColor={colors.greyedPurple}
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

const SelectMerchantBank = (props: SelectMerchantBankProps): ReactElement => {
	const navigation = useNavigation();
	return <SelectMerchantBankView {...props} navigation={navigation} />;
}
export default SelectMerchantBank