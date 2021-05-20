import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { modalViewBase, baseHeader, wrappingContainerBase } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { MarketEntry, OrderType, Share } from "../../utils/types";
import { useShares } from "../../hooks/useShares";
import { BlockInput } from "../../uielements/BlockInput";
import { SettingsListItem } from "../../uielements/cards/SettingsListItem";
import { useMarketEntry } from "../../hooks/useMarketEntry";

type PickCompanyProps = {
	navigation?: any
	route?: any
	type: OrderType
}

const styles = StyleSheet.create({
	view: {
		marginTop: 10
	},
	header: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 20,
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		marginRight: 10,
		fontFamily: 'IBMPlexSansSemiBold',
	}
});

const PickCompany = (props: PickCompanyProps) => {
	const navigation = useNavigation();
	const { shares } = useShares();
	const { marketEntries } = useMarketEntry();
	const [searchPhrase, setSearchPhrase] = useState('');
	const { type, onClose } = props.route.params;

	const onValueChange = (name: any, change: any) => {
		setSearchPhrase(change);
	}

	const onSelected = (entry: Share | MarketEntry) => {
		const share = {
			quantity: 0,
			price: 0,
			type
		};

		if (type === OrderType.SELL) {
			share.price = entry.price;
			share.quantity = (entry as Share).quantity;
		}
		if (type === OrderType.BUY) {
			share.price = (entry as MarketEntry).price;
			share.quantity = (entry as MarketEntry).totalShares - (entry as MarketEntry).tradedShares;
		}
		const navigateTo = type === OrderType.BUY ? 'BuyTransactionForm' : 'SellTransactionForm';

		navigation.navigate(navigateTo, {
			orderId: 'marketEntryId' in entry ? entry.marketEntryId : entry.id,
			share,
			showBack: true
		});
	};

	const renderCompanies = () => {
		let found: any[] = [];
		if (searchPhrase !== '' && type === OrderType.BUY) {
			found = marketEntries.filter(entry => entry.name.toLowerCase().includes(searchPhrase.toLowerCase()));
		}

		if (searchPhrase !== '' && type === OrderType.SELL) {
			found = shares.filter(entry => entry.name.toLowerCase().includes(searchPhrase.toLowerCase()));
		}

		if (searchPhrase === '') {
			found = [];
		}

		return found.map(entry => (
			<SettingsListItem key={`entry-${entry.id}`} onPress={() => onSelected(entry)} name={entry.name} />
		))
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={onClose} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text style={styles.header}>Search for a company to {type === OrderType.BUY ? 'buy' : 'sell'}</Text>
					</View>
					<View style={styles.view}>
						<BlockInput
							placeholder="Company name"
							name="name"
							value={searchPhrase}
							onChange={onValueChange}
						/>
						{renderCompanies()}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

export default PickCompany