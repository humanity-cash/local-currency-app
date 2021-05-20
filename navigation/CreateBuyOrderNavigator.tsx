import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PickCompany from "../views/createOrder/PickCompany";
import { BuyTransactionNavigator } from "./BuyTransactionStack";
import { OrderType, ShareEntry } from "../utils/types";

type CreateBuyOrderStackProps = {
	onClose: () => void,
	style?: any,
	marketEntryId?: string,
	showBack?: boolean,
	share?: ShareEntry
}

const CreateBuyOrderStack = createStackNavigator()
function CreateBuyOrderStackScreen(props: CreateBuyOrderStackProps) {
	return (
		<CreateBuyOrderStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			{!props.marketEntryId && (
				<CreateBuyOrderStack.Screen
					name="CreateBuyPickCompany"
					initialParams={{...props, type: OrderType.BUY }}
					component={PickCompany}
				/>
			)}
			<CreateBuyOrderStack.Screen
				name="BuyTransactionForm"
				initialParams={{
					...props,
					orderId: props.marketEntryId,
					withMarketEntry: true
				}}
				component={BuyTransactionNavigator}
			/>
		</CreateBuyOrderStack.Navigator>
	);
}

export const CreateBuyOrderNavigator = CreateBuyOrderStackScreen
