import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Image, Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { dashboardHeader, viewDashboardBase } from "../../theme/elements";
import { colors } from "../../theme/colors";
import { ShareCardView } from "../../uielements/cards/ShareCard";
import { Dots } from "../../uielements/Dots";
import { useShares } from "../../hooks/useShares";
import { ChartView } from "../../uielements/ChartView";
import { FloatingButton } from "../../uielements/FloatingButton";
import CreateBuyOrder from "../createOrder/CreateBuyOrder";
import CreateSellOrder from "../createOrder/CreateSellOrder";

type PortfolioProps = {
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
		flex: 1,
		backgroundColor: colors.lightBg,
		minHeight: '100%'
	},
	contentView: {
		padding: 10
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

const PortfolioView = (props: PortfolioProps) => {
	const { shares } = useShares();
	const [createSell, setCreateSell] = useState(false);
	const [createBuy, setCreateBuy] = useState(false);
	return (
		<View style={viewDashboardBase}>
			{shares.length !== 0 && (
				<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
					<View style={ { ...dashboardHeader, marginBottom: 0 } }>
						<Text h1 style={styles.headerView}>Portfolio</Text>
						<Dots selected={0} length={3} />
					</View>
					<View style={styles.codeView}>
						<ChartView labelsType='market' />
						<View style={styles.contentView}>
							{shares.map(share => (
								<ShareCardView
									key={`share-${share.id}`}
									share={share}
									onClick={(entryId) => props.navigation.navigate('MarketEntryDetails', { entryId })}
								/>
							))}
						</View>
					</View>
				</ScrollView>
			)}
			{shares.length === 0 && (
				<View style={{ flex: 1 }}>
					<View style={ { ...dashboardHeader, marginBottom: 0 } }>
						<Text h1 style={styles.headerView}>Portfolio</Text>
						<Dots selected={0} length={3} />
					</View>
					<View style={styles.imageView}>
						<Image
							source={require('../../assets/images/noorders.png')}
							containerStyle={styles.image}
						/>
						<Text style={styles.emptyListText}>You have no shares</Text>
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

const Portfolio = (props:PortfolioProps) => {
	const navigation = useNavigation();
	return <PortfolioView {...props} navigation={navigation} />;
}
export default Portfolio