import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from "react-native-elements";
import { useShares } from "src/hooks";
import { Button, Dots } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { dashboardHeader, viewDashboardBase } from "src/theme/elements";
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
				<View style={{ flex: 1 }}>
					<View style={ { ...dashboardHeader, marginBottom: 0 } }>
						<Text h1 style={styles.headerView}>User</Text>
						<Dots selected={0} length={3} />
					</View>
					<View style={styles.imageView}>
							<Button type="fluidDark" onPress={() => console.log('heeloworld')} title="Create User"/>
							<Button type="fluidDark" onPress={() => console.log('heeloworld')} title="Login User"/>
							<Button type="fluidDark" onPress={() => alert('you taped me')} title="KYC"/>
							<Button type="fluidDark" onPress={() => alert('you taped me')} title="Create Transaction"/>
							<Button type="fluidDark" onPress={() => alert('you taped me')} title="Transactions History"/>
					</View>
				</View>
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
