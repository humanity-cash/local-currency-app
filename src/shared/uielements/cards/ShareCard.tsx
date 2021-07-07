import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { formatValue } from "src/utils/common";
import { Growth, Share } from "src/utils/types";

type ShareProps = {
	share: Share,
	onClick: (id: string) => void
}

const styles = StyleSheet.create({
	mainView: {
		backgroundColor: colors.white,
		borderLeftColor: colors.brown,
		borderLeftWidth: 5,
		padding: 20,
		marginVertical: 10
	},
	headerView: {
		flexDirection: "row",
		marginBottom: 20
	},
	headerName: {
		flex: 1,
		fontSize: 20,
		fontFamily: 'IBMPlexSansBold',
	},
	headerChangeRate: {
		fontSize: 20,
		fontFamily: 'IBMPlexSansBold',
	},
	boldText: {
		fontFamily: 'IBMPlexSansSemiBold',
	},
	detailsView: {
		flexDirection: "row",
	},
	leftView: {
		flex: 1
	},
	rightView: {
		flex: 1,
		borderLeftColor: colors.text,
		borderLeftWidth: 1,
		marginLeft: 20,
		paddingLeft: 20,
	}
});

const ShareCardView = (props: ShareProps) => {
	const { share } = props;
	const color = share.diff === Growth.INCREASE ? colors.textSuccess: colors.textWarning;
	return (
		<TouchableWithoutFeedback onPress={() => props.onClick(share.marketEntryId)}>
			<View style={styles.mainView}>
				<View style={styles.headerView}>
					<Text style={styles.headerName}>{share.name}</Text>
					<Text style={{...styles.headerChangeRate, color }}>{share.changeRate}%</Text>
				</View>
				<View style={styles.detailsView}>
					<View style={styles.leftView}>
						<Text h3>you own</Text>
						<Text style={styles.boldText}>{share.quantity} shares</Text>
						<Text h3 style={{ marginTop: 15 }}>PERSONAL DIVIDEND-YIELD</Text>
						<Text style={{ ...styles.boldText, color }}>{share.yield}%</Text>
					</View>
					<View style={styles.rightView}>
						<Text h3>Current share price</Text>
						<Text style={styles.boldText}>{formatValue(share.price)}</Text>
						<Text h3 style={{ marginTop: 15 }}>Current total value</Text>
						<Text style={styles.boldText}>{formatValue(share.price*share.quantity)}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default ShareCardView;