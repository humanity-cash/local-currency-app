import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";
import { formatValue } from "src/utils/common";
import { ShareEntry } from "src/utils/types";

type WantedAndOffersChartProps = {
	wanted: ShareEntry[],
	offers: ShareEntry[]
}

const GAP_BETWEEN = 50;
const CELL_HEIGHT = 16;
const FULL_CELL = CELL_HEIGHT + 20;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginVertical: 10
	},
	grid: {
		flex: 1,
		position: "relative"
	},
	border: {
		borderRightWidth: 1,
		borderRightColor: colors.text,
		flex: 1
	},
	cell: {
		height: CELL_HEIGHT,
		width: '100%',
		position: "absolute",
		flex: 1,
		left: 0,
		flexDirection: "row"
	},
	cellSell: {
		right: 0,
		justifyContent: "flex-end"
	},
	sellMark: {
		height: CELL_HEIGHT,
		backgroundColor: colors.brown
	},
	buyMark: {
		height: CELL_HEIGHT,
		backgroundColor: colors.textSuccess,
	},
	sellText: {
		color: colors.brown,
		fontSize: 16,
		lineHeight: 16,
		paddingHorizontal: 10
	},
	buyText: {
		color: colors.textSuccess,
		fontSize: 16,
		lineHeight: 16,
		paddingHorizontal: 10
	},
	descriptionText: {
		fontSize: 10,
		lineHeight: CELL_HEIGHT,
		paddingHorizontal: 10,
		textTransform: "uppercase"
	}
})

const WantedAndOffersChart = (props: WantedAndOffersChartProps) => {
	const wantedCount = props.wanted.length;
	const offersCount = props.offers.length;

	const wantedMax = Math.max.apply(null, props.wanted.map(share => share.quantity));
	const offeredMax = Math.max.apply(null, props.offers.map(share => share.quantity));

	const offeredStart = GAP_BETWEEN * 2 + wantedCount * FULL_CELL;

	const calculateMarkWidth = (value: number, max: number) => {
		const calculated = value/max * 100;
		return calculated*0.5;
	}

	return (
		<View style={[styles.container, { height: GAP_BETWEEN * 3 + (wantedCount + offersCount) * FULL_CELL} ]}>
			<View style={[styles.grid, styles.border]}>
				<View style={[styles.cell, styles.cellSell, { top: GAP_BETWEEN }]}>
					<Text style={styles.buyText}>ASKS</Text>
				</View>
				{props.offers.map((share, index) => (
					<View key={`offer-${index}`} style={[styles.cell, styles.cellSell, { top: offeredStart + index * FULL_CELL }]}>
						<Text style={styles.descriptionText}>{share.quantity} for {formatValue(share.price)}</Text>
						<View style={[styles.sellMark, { width: `${calculateMarkWidth(share.quantity, offeredMax)}%`}]} />
					</View>
				))}
			</View>
			<View style={styles.grid}>
				{props.wanted.map((share, index) => (
					<View key={`offer-${index}`} style={[styles.cell, { top: GAP_BETWEEN + index * FULL_CELL }]}>
						<View style={[styles.buyMark, { width: `${calculateMarkWidth(share.quantity, wantedMax)}%`}]} />
						<Text style={styles.descriptionText}>{share.quantity} for {formatValue(share.price)}</Text>
					</View>
				))}
				<View style={[styles.cell, { top: offeredStart + FULL_CELL * (offersCount - 1) }]}>
					<Text style={styles.sellText}>BIDS</Text>
				</View>
			</View>
		</View>
	)
}

export default WantedAndOffersChart;