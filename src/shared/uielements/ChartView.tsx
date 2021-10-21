import * as shape from "d3-shape";
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { LineChart } from "react-native-svg-charts";
import graphData from 'src/mocks/graphDates';
import { colors } from "src/theme/colors";
import { formatValue } from "src/utils/common";
import { GraphDataset, Growth } from "src/utils/types";

type ChartViewProps = {
	data?: GraphDataset[],
	labelsType: 'marketEntry' | 'market'
}

enum GraphSet {
	DAY,
	WEEK,
	MONTH,
	SIX_MONTH,
	YEAR,
	FIVE_YEAR
}

const buttons = [
	{ name: '1d', type: GraphSet.DAY },
	{ name: '1w', type: GraphSet.WEEK },
	{ name: '1m', type: GraphSet.MONTH },
	{ name: '6m', type: GraphSet.SIX_MONTH },
	{ name: '1y', type: GraphSet.YEAR },
	{ name: '5y', type: GraphSet.FIVE_YEAR },
];

const compareAndFilter = (set: GraphDataset[], date: Date) => {
	return set.filter(item => item.date.getTime() > date.getTime()).map(item => item.value);
}

const generateGraphData = (data: GraphDataset[], currentSet: GraphSet) => {
	const youngerThan = new Date();

	if (data.length === 0) {
		return [];
	}

	switch (currentSet) {
		case GraphSet.DAY:
			youngerThan.setDate(youngerThan.getDate() - 1);
			const set = compareAndFilter(data, youngerThan);
			if (set.length === 0) {
				return [data[data.length - 1].value, data[data.length - 1].value];
			}
			return set;
		case GraphSet.WEEK:
			youngerThan.setDate(youngerThan.getDate() - 7);
			return compareAndFilter(data, youngerThan);
		case GraphSet.MONTH:
			youngerThan.setDate(youngerThan.getDate() - 30);
			return compareAndFilter(data, youngerThan);
		case GraphSet.SIX_MONTH:
			youngerThan.setDate(youngerThan.getDate() - 180);
			return compareAndFilter(data, youngerThan);
		case GraphSet.YEAR:
			youngerThan.setDate(youngerThan.getDate() - 365);
			return compareAndFilter(data, youngerThan);
		case GraphSet.FIVE_YEAR:
			youngerThan.setDate(youngerThan.getDate() - 365 * 5);
			return compareAndFilter(data, youngerThan);
	}
}

const currentSetLabel = (currentSet: GraphSet) => {
	switch (currentSet) {
		case GraphSet.DAY:
			return '1 day';
		case GraphSet.WEEK:
			return '1 week'
		case GraphSet.MONTH:
			return '1 month'
		case GraphSet.SIX_MONTH:
			return '6 months'
		case GraphSet.YEAR:
			return '1 year'
		case GraphSet.FIVE_YEAR:
			return '5 years'
	}
}

const calculateDiff = (set: number[]) => {
	if (!set.length) {
		return {
			growth: Growth.INCREASE,
			value: 0,
			first: 0,
			last: 0,
			percent: 0
		}
	}
	const first = set[0];
	const last = set[set.length - 1];

	const diff = last - first;
	return {
		growth: diff > 0 ? Growth.INCREASE : Growth.DECRESE,
		value: Math.abs(diff),
		first,
		last,
		percent: Math.abs(diff/last * 100)
	}
}

const styles = StyleSheet.create({
	labelCell: {
		alignItems: "center",
		alignContent: "center",
		flex: 2,
		marginTop: 20
	},
	labelsHorizontal: {
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center"
	},
	labelCellText: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 16
	},
	horizontalWrapper: {
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
		borderBottomWidth: 1,
		borderBottomColor: colors.text,
		paddingVertical: 10,
		marginBottom: 20
	},
	buttonContainerActive: {
		borderBottomWidth: 3,
	},
	button: {
		textAlign: "center",
		color: colors.text,
	},
	buttonActive: {
		fontFamily: 'IBMPlexSansBold',
	}
});

const ChartView = (props: ChartViewProps) => {
	const [currentSet, setCurrentSet] = useState<GraphSet>(GraphSet.SIX_MONTH);

	const data = generateGraphData(graphData, currentSet);
	const max = Math.max.apply(null, data);
	const min = Math.min.apply(null, data);
	const diff = calculateDiff(data);
	return (
		<View>
			{props.labelsType === 'market' && (
				<View style={styles.horizontalWrapper}>
					<View style={styles.labelCell}>
						<Text h3>market value</Text>
						<Text style={styles.labelCellText}>{formatValue(diff.last)}</Text>
					</View>
					<View style={styles.labelCell}>
						<Text h3>value increase ({currentSetLabel(currentSet)})</Text>
						<View style={styles.horizontalWrapper}>
							<Text style={styles.labelCellText}>{formatValue(diff.value)}</Text>
							<Text style={[styles.labelCellText, { color: diff.growth === Growth.INCREASE ? colors.textSuccess : colors.textWarning, paddingLeft: 5}]}>
								{diff.growth === Growth.INCREASE ? '+' : '-'}{formatValue(diff.percent)}%
							</Text>
						</View>

					</View>
				</View>
			)}
			{props.labelsType === 'marketEntry' && (
				<View style={styles.horizontalWrapper}>
					<View style={styles.labelCell}>
						<Text h3>low</Text>
						<Text style={styles.labelCellText}>{formatValue(min)}</Text>
					</View>
					<View style={[styles.labelCell, { flex: 3 }]}>
						<Text h3>last trade price</Text>
						<View style={styles.labelsHorizontal}>
							<Text style={styles.labelCellText}>{formatValue(diff.last)}</Text>
							<Text style={[styles.labelCellText, { color: diff.growth === Growth.INCREASE ? colors.textSuccess : colors.textWarning, paddingLeft: 5}]}>
								{diff.growth === Growth.INCREASE ? '+' : '-'}{formatValue(diff.percent)}%
							</Text>
						</View>
					</View>
					<View style={styles.labelCell}>
						<Text h3>hight</Text>
						<Text style={styles.labelCellText}>{formatValue(max)}</Text>
					</View>
				</View>
			)}
			<LineChart
				style={{ height: 200 }}
				yMin={Math.min(0, min)}
				yMax={max}
				data={generateGraphData(graphData, currentSet)}
				curve={shape.curveNatural}
				svg={{ stroke: colors.text, strokeWidth: 1 }}
				contentInset={{ top: 40, bottom: 40 }}
			/>
			<View style={styles.horizontalWrapper}>
				{buttons.map(button => (
					<TouchableWithoutFeedback key={`button-${button.type}`} onPress={() => setCurrentSet(button.type)}>
						<View style={[styles.buttonContainer, button.type === currentSet ? styles.buttonContainerActive : {}]}>
							<Text style={[styles.button, button.type === currentSet ? styles.buttonActive : {}]}>{button.name}</Text>
						</View>
					</TouchableWithoutFeedback>
				))}
			</View>
		</View>
	)
}

export default ChartView;