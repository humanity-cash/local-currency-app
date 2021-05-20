import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SellTransactionNavigator } from "./SellTransactionStack";
import { ShareEntry, OrderType } from "../utils/types";
import PickCompany from "../views/createOrder/PickCompany";

type CreateSellOrderStackProps = {
	onClose: () => void,
	style?: any,
	marketEntryId?: string,
	showBack?: boolean,
	share?: ShareEntry
}

const CreateSellOrderStack = createStackNavigator()
function CreateSellOrderStackScreen(props: CreateSellOrderStackProps) {
	return (
		<CreateSellOrderStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			{!props.marketEntryId && (
				<CreateSellOrderStack.Screen
					name="CreateSellPickCompany"
					initialParams={{...props, type: OrderType.SELL }}
					component={PickCompany}
				/>
			)}
			<CreateSellOrderStack.Screen
				name="SellTransactionForm"
				initialParams={{
					...props,
					orderId: props.marketEntryId,
					withMarketEntry: true
				}}
				component={SellTransactionNavigator}
			/>
		</CreateSellOrderStack.Navigator>
	);
}

export const CreateSellOrderNavigator = CreateSellOrderStackScreen
