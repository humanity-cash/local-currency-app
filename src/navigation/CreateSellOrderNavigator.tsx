import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PickCompany from "src/screens/createOrder/PickCompany";
import { OrderType, ShareEntry } from "src/utils/types";
import { SellTransactionNavigator } from "./SellTransactionStack";

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
