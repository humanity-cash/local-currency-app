import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { formatValue } from "src/utils/common";
import { OrderType, Share, ShareEntry } from "src/utils/types";

type ShareEntryCardProps = {
	entry: ShareEntry
	ownedShare?: Share,
	onClick: (entry: ShareEntry) => void
}

const styles = StyleSheet.create({
	mainView: {
		backgroundColor: colors.white,
		marginBottom: 10,
		shadowColor: colors.black,
		shadowRadius: 2,
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 1,
			height: 1
		}
	},
	boldText: {
		fontFamily: 'IBMPlexSansSemiBold',
	},
	detailsView: {
		flexDirection: "row",
	},
	gridView: {
		flex: 2,
		padding: 15,
	},
	gridWiderView: {
		flex: 3
	},
	buttonView: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1
	},
	buttonHeader: {
		color: colors.white,
		textTransform: "uppercase",
		fontSize: 16,
		lineHeight: 16,
		margin: 0,
		padding: 0
	},
	buttonDescription: {
		color: colors.white,
		textTransform: "uppercase",
		fontSize: 10,
		lineHeight: 10,
		margin: 0,
		padding: 0
	}
});

const ShareEntryCard = (props: ShareEntryCardProps) => {
	const { entry, ownedShare } = props;
	if (!entry) {
		return null;
	}

	const typeColor = entry.type === OrderType.SELL ? colors.brown : colors.textSuccess;
	const allowed = (entry.type === OrderType.SELL
		&& ownedShare && entry.quantity < ownedShare?.quantity)
		|| entry.type === OrderType.BUY;

	return (
		<View style={styles.mainView}>
			<View style={styles.detailsView}>
				<View style={styles.gridView}>
					<Text h3>{entry.type === OrderType.SELL ? 'BID price' : 'ASK price'}</Text>
					<Text style={styles.boldText}>{formatValue(entry.price)}</Text>
				</View>
				<View style={styles.gridView}>
					<Text h3>{entry.type === OrderType.SELL ? 'wanted' : 'offered'}</Text>
					<Text style={styles.boldText}>{entry.quantity} shares</Text>
				</View>
				<TouchableWithoutFeedback disabled={!allowed} onPress={() => props.onClick(entry)}>
					<View style={[{ flex: 2, padding: 5, paddingVertical: 10, backgroundColor: typeColor, opacity: allowed ? 1 : 0.5 }]}>
						{entry.type === OrderType.SELL && (
							<View style={styles.buttonView}>
								<Text style={styles.buttonHeader}>SELL NOW</Text>
								<Text style={styles.buttonDescription}>or place ask</Text>
							</View>
						)}
						{entry.type === OrderType.BUY && (
							<View style={styles.buttonView}>
								<Text style={styles.buttonHeader}>BUY THIS</Text>
								<Text style={styles.buttonDescription}>or place bid</Text>
							</View>
						)}
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
}

export default ShareEntryCard;