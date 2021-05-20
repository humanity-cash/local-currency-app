import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Image, Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { dashboardHeader, viewDashboardBase } from "../../theme/elements";
import { colors } from "../../theme/colors";
import { OrderCardView } from "../../uielements/cards/OrderCard";
import MissingSteps from "../missingSteps/MissingSteps";
import { Dots } from "../../uielements/Dots";
import { useOrders } from "../../hooks/useOrders";
import { Order } from "../../utils/types";
import BottomSheet from "../../uielements/BottomSheet";
import { Button } from "../../uielements/Button";
import EditOrder from "../editOrder/EditOrder";
import { FloatingButton } from "../../uielements/FloatingButton";
import CreateBuyOrder from "../createOrder/CreateBuyOrder";
import CreateSellOrder from "../createOrder/CreateSellOrder";

type OrderStatusProps = {
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
		padding: 15,
		backgroundColor: colors.lightBg,
		minHeight: '100%'
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

const OrderStatusView = (props: OrderStatusProps) => {
	const { orders, remove } = useOrders();
	const [visibleEdit, setVisibleEdit] = useState(false);
	const [visibleRemove, setVisibleRemove] = useState(false);
	const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
	const [createSell, setCreateSell] = useState(false);
	const [createBuy, setCreateBuy] = useState(false);

	const onEdit = (order: Order) => {
		setCurrentOrder(order);
		setVisibleEdit(true);
	}

	const onCancel = (order: Order) => {
		setCurrentOrder(order);
		setVisibleRemove(true);
	}

	const onRemove = (order: Order) => {
		setCurrentOrder(order);
		setVisibleRemove(true);
	}

	const onConfirmRemove = () => {
		if (currentOrder) {
			remove(currentOrder.id);
			setVisibleRemove(false);
			setCurrentOrder(null);
		}
	}

	const onCancelRemove = () => {
		setVisibleRemove(false);
		setCurrentOrder(null);
	}

	const onEditClose = () => {
		setVisibleEdit(false);
		setCurrentOrder(null);
	}

	return (
		<View style={viewDashboardBase}>
			{orders.length !== 0 && (
				<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
					<View style={ { ...dashboardHeader, marginBottom: 0 } }>
						<Text h1 style={styles.headerView}>Order Status</Text>
						<Dots selected={1} length={3} />
					</View>
					<MissingSteps />
					<View style={styles.codeView}>
						{orders.map(order => (
							<OrderCardView
								key={`order-${order.id}`}
								order={order}
								onEdit={onEdit}
								onCancel={onCancel}
								onRemove={onRemove}
							/>
						))}
					</View>
				</ScrollView>
			)}
			{orders.length === 0 && (
				<View style={{ flex: 1 }}>
					<View style={ { ...dashboardHeader, marginBottom: 0 } }>
						<Text h1 style={styles.headerView}>Order Status</Text>
						<Dots selected={1} length={3} />
					</View>
					<MissingSteps />
					<View style={styles.imageView}>
						<Image
							source={require('../../assets/images/noorders.png')}
							containerStyle={styles.image}
						/>
						<Text style={styles.emptyListText}>No open orders</Text>
					</View>
				</View>
			)}
			<BottomSheet
				visible={visibleRemove}
				onClose={() => setVisibleRemove(false)}
				text="Are you sure?"
			>
				<View>
					<Button
						style={{ flex: 1, margin: 5, backgroundColor: colors.textWarning }}
						type="fluidDark"
						title="YES, CANCEL ORDER"
						onPress={onConfirmRemove}
					/>
					<Button
						style={{ margin: 5, backgroundColor: colors.white }}
						textStyle={{ color: colors.text }}
						type="fluidDark"
						title="CANCEL"
						onPress={onCancelRemove}
					/>
				</View>
			</BottomSheet>
			<EditOrder visible={visibleEdit} order={currentOrder} onClose={onEditClose} />
			<FloatingButton
				onBuyAction={() => setCreateBuy(true)}
				onSellAction={() => setCreateSell(true)}
			/>
			<CreateBuyOrder onClose={() => setCreateBuy(false)} visible={createBuy} />
			<CreateSellOrder onClose={() => setCreateSell(false)} visible={createSell} />
		</View>
	);
}

const OrderStatus = (props:OrderStatusProps) => {
	const navigation = useNavigation();
	return <OrderStatusView {...props} navigation={navigation} />;
}
export default OrderStatus