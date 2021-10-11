import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { formatValue } from "src/utils/common";
import { MarketEntry, Share } from "src/utils/types";

type ShareProps = {
	share: Share | null | undefined,
	marketEntry: MarketEntry
}

const styles = StyleSheet.create({
	mainView: {
		backgroundColor: colors.white,
		borderLeftColor: colors.brown,
		borderLeftWidth: 5,
		padding: 10,
		paddingTop: 15
	},
	boldText: {
		fontFamily: 'IBMPlexSansSemiBold',
	},
	detailsView: {
		flexDirection: "row",
		marginBottom: 15,
		padding: 5
	},
	gridView: {
		flex: 2
	},
	gridWiderView: {
		flex: 3
	}
});

const OwnedShareCard = (props: ShareProps) => {
	const { share, marketEntry } = props;
	if (!share) {
		return null;
	}

	const calculatePercentage = () => {
		const value = ((1 - share.price/marketEntry.price) * 100);
		const growth = value > 0 ? 'raise' : 'loss';
		return {
			value: formatValue(Math.abs(value)),
			growth
		}
	}

	const percentage = calculatePercentage();
	const diffColor = percentage.growth === 'raise' ? colors.textSuccess : colors.textWarning;
	return (
		<View style={styles.mainView}>
			<View style={styles.detailsView}>
				<View style={styles.gridView}>
					<Text h3>you own</Text>
					<Text style={styles.boldText}>{share.quantity} shares</Text>
				</View>
				<View style={styles.gridView}>
					<Text h3>bought for</Text>
					<Text style={styles.boldText}>{formatValue(share.price)}</Text>
				</View>
				<View style={styles.gridWiderView}>
					<Text h3>current share price</Text>
					<View style={{ flexDirection: "row" }}>
						<Text style={styles.boldText}>{formatValue(marketEntry.price)}</Text>
						<Text style={{ ...styles.boldText, color: diffColor, marginLeft: 10 }}>
							{percentage.growth === 'raise' ? '+' : '-'}{percentage.value}%
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default OwnedShareCard;