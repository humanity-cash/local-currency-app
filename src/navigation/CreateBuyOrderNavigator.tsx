import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PickCompany from "src/screens/createOrder/PickCompany";
import { OrderType, ShareEntry } from "src/utils/types";
import { BuyTransactionNavigator } from "./BuyTransactionStack";

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
