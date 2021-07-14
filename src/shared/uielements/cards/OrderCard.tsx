import { AntDesign } from "@expo/vector-icons";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { formatValue } from "src/utils/common";
import { Order, OrderType, StatusType } from "src/utils/types";
import Button from "../Button";

type OrderProps = {
	order: Order,
	navigation?: any,
	onEdit: (order: Order) => void,
	onCancel: (order: Order) => void,
	onRemove: (order: Order) => void,
}

const styles = StyleSheet.create({
	mainView: {
		backgroundColor: colors.white,
		paddingTop: 20,
		marginBottom: 20
	},
	headerView: {
		flexDirection: "row",
		marginBottom: 20,
		paddingHorizontal: 20
	},
	headerName: {
		fontSize: 20,
		fontFamily: 'IBMPlexSansBold',
	},
	detailsView: {
		flexDirection: "row",
		marginBottom: 20,
		paddingHorizontal: 20
	},
	actionsView: {
		flexDirection: "row",
		flex: 1
	},
	gridView: {
		flex: 1
	},
	rightView: {
		flex: 1,
		borderLeftColor: colors.text,
		borderLeftWidth: 1,
		marginLeft: 20,
		paddingLeft: 20,
	},
	cross: {
		position: "absolute",
		top: -10,
		right: -10
	},
	boldText: {
		fontFamily: 'IBMPlexSansSemiBold',
	}
});

const OrderCardView = (props: OrderProps) => {
	const { order } = props;
	const [createdDiff, setCreatedDiff] = useState(0);
	const [expiresDiff, setExpiresDiff] = useState(0);

	useEffect(() => {
		const todayDate = moment();
		const createdDate = moment(order.created);
		const expiresDate = order.expires ? moment(order.expires) : moment().add(365, "days");

		setCreatedDiff(todayDate.diff(createdDate, 'days'));
		setExpiresDiff(expiresDate.diff(todayDate, 'days'));
	}, [order]);
	return (
		<View style={styles.mainView}>
				{(order.status !== StatusType.COMPLETE && expiresDiff > 0) && (
					<View style={styles.headerView}>
						<View style={{ flexDirection: "column", flex: 1 }}>
							{order.type === OrderType.BUY && (<Text h3>{order.status === StatusType.PARTIALLY ? 'PARTIALLY FILLED -' : ''} BUY order - {createdDiff === 0 ? 'just now' : `${createdDiff} days ago`}</Text>)}
							{order.type === OrderType.SELL && (<Text h3>{order.status === StatusType.PARTIALLY ? 'PARTIALLY FILLED -' : ''} SELL order - {createdDiff === 0 ? 'just now' : `${createdDiff} days ago`}</Text>)}
							<Text style={styles.headerName}>{order.name}</Text>
						</View>
						<View>
							<Text h3>{expiresDiff > 0 ? `Expires in ${expiresDiff} days`: `Expired ${Math.abs(expiresDiff)} days ago`}</Text>
						</View>
					</View>
				)}
				{(order.status === StatusType.COMPLETE || expiresDiff <= 0) && (
					<View style={styles.headerView}>
						<View style={{ flexDirection: "column", flex: 1 }}>
							{order.type === OrderType.BUY && (
								<Text h3>COMPLETED - BUY order</Text>
							)}
							{order.type === OrderType.SELL && (
								<Text h3>COMPLETED - SELL order</Text>
							)}
							<Text style={styles.headerName}>{order.name}</Text>
						</View>
						<View>
							<TouchableWithoutFeedback onPress={() => props.onRemove(order)}>
								<AntDesign
									style={styles.cross}
									name="close"
									size={26}
									color={colors.text}
								/>
							</TouchableWithoutFeedback>
						</View>
					</View>
				)}
			{(order.status !== StatusType.COMPLETE && expiresDiff > 0) && (
				<View>
					<View style={styles.detailsView}>
						<View style={styles.gridView}>
							<Text h3>wanted</Text>
							<Text style={styles.boldText}>{order.quantity} shares</Text>
						</View>
						<View style={styles.gridView}>
							<Text h3>ask per share</Text>
							<Text style={styles.boldText}>{formatValue(order.price)}</Text>
						</View>
						<View style={styles.gridView}>
							<Text h3>Total bid price</Text>
							<Text style={styles.boldText}>{formatValue(order.price*order.quantity)}</Text>
						</View>
					</View>
					<View style={styles.actionsView}>
						<Button
							style={{ flex: 1, height: 40, backgroundColor: order.type === OrderType.BUY ? colors.textSuccess : colors.brown }}
							type="fluidDark"
							title="Edit"
							onPress={() => props.onEdit(order)}
						/>
						<Button
							style={{ flex: 1, height: 40, backgroundColor: order.type === OrderType.BUY ? colors.textSuccess : colors.brown }}
							type="fluidDark"
							title="Cancel"
							onPress={() => props.onCancel(order)}
						/>
					</View>
				</View>
			)}
			{(order.status === StatusType.COMPLETE || expiresDiff <= 0) && (
				<View style={styles.detailsView}>
					<View style={styles.gridView}>
						<Text h3>wanted</Text>
						<Text style={styles.boldText}>{order.quantity} shares</Text>
						<Text h3 style={{ marginTop: 15 }}>My bid price</Text>
						<Text style={styles.boldText}>{formatValue(order.price)}</Text>
					</View>
					<View style={styles.rightView}>
						<Text h3>Purchase price</Text>
						<Text style={styles.boldText}>{formatValue(order.price)}</Text>
						<Text h3 style={{ marginTop: 15 }}>total purchase price</Text>
						<Text style={styles.boldText}>{formatValue(order.price*order.quantity)}</Text>
					</View>
				</View>
			)}
		</View>
	);
}

export default OrderCardView;