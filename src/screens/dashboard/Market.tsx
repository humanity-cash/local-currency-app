import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Image, Text } from "react-native-elements";
import { useMarketEntry } from "src/hooks";
import { Dots, FilterCard, FloatingButton, MarketCardView } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { dashboardHeader, viewDashboardBase } from "src/theme/elements";
import { availableFilters, filterMarketEntries } from "src/utils/filters";
import { FilterType } from "src/utils/types";
import CreateBuyOrder from "../createOrder/CreateBuyOrder";
import CreateSellOrder from "../createOrder/CreateSellOrder";

type MarketProps = {
	navigation?: any,
	route?: any
}

const styles = StyleSheet.create({
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		color: colors.white
	},
	codeView: {
		backgroundColor: colors.lightBg,
		minHeight: '100%',
		flex: 1
	},
	entriesContainer: {
		flex: 1,
		padding: 15,
		paddingTop: 0
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	},
	emptyListText: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16,
		textAlign: "center"
	},
	image: {
		alignSelf: "center",
		width: 250,
		height: 250
	},
	imageView: {
		backgroundColor: colors.lightBg,
		alignSelf: "center",
		justifyContent: "center",
		textAlign: "center",
		flex: 1,
		width: '100%'
	}
});

const MarketView = (props: MarketProps) => {
	const { marketEntries } = useMarketEntry();
	const [activeFilter, setActiveFilter] = useState<FilterType | null>(FilterType.TOP_GAINS);
	const [createSell, setCreateSell] = useState(false);
	const [createBuy, setCreateBuy] = useState(false);

	const handleFilterChange = (type: FilterType) => {
		setActiveFilter(activeFilter !== type ? type : null);
	}
	return (
		<View style={{ ...viewDashboardBase, height: '100%' }}>
			{marketEntries.length !== 0 && (
				<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
					<View style={ { ...dashboardHeader, marginBottom: 0 } }>
						<Text h1 style={styles.headerView}>Market</Text>
						<Dots selected={2} length={3} />
					</View>
					<View style={styles.codeView}>
						<View>
							<ScrollView style={{ flexGrow: 0, padding: 15 }} horizontal showsHorizontalScrollIndicator={false}>
								{availableFilters.map(filter => (
									<FilterCard
										key={filter.type}
										active={filter.type === activeFilter}
										onClick={handleFilterChange}
										name={filter.name}
										type={filter.type}
									/>
								))}
							</ScrollView>
							<View style={styles.entriesContainer}>
								{filterMarketEntries(marketEntries, activeFilter).map(entry => (
									<MarketCardView
										key={entry.id}
										entry={entry}
										onClick={(entryId) => props.navigation.navigate('MarketEntryDetails', { entryId })}
									/>
								))}
							</View>
						</View>
					</View>
				</ScrollView>
			)}
			{marketEntries.length === 0 && (
				<View style={{ flex: 1 }}>
					<View style={ { ...dashboardHeader, marginBottom: 0 } }>
						<Text h1 style={styles.headerView}>Market</Text>
						<Dots selected={2} length={3} />
					</View>
					<View style={styles.imageView}>
						<Image
							source={require('../../../assets/images/noorders.png')}
							containerStyle={styles.image}
						/>
						<Text style={styles.emptyListText}>No market entries</Text>
					</View>
				</View>
			)}
			<FloatingButton
				onBuyAction={() => setCreateBuy(true)}
				onSellAction={() => setCreateSell(true)}
			/>
			<CreateBuyOrder onClose={() => setCreateBuy(false)} visible={createBuy} />
			<CreateSellOrder onClose={() => setCreateSell(false)} visible={createSell} />
		</View>
	);
}

const Market = (props:MarketProps) => {
	const navigation = useNavigation();
	return <MarketView {...props} navigation={navigation} />;
}
export default Market