import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import RedemptionInProgress from "src/screens/cashout/RedemptionInProgress";

const CashoutStack = createStackNavigator()
function CashoutStackScreen(): ReactElement {
	return (
		<CashoutStack.Navigator
			screenOptions={() => ({
				headerShown: false
			})}
		>
			<CashoutStack.Screen name="RedemptionInProgress" component={RedemptionInProgress} />
		</CashoutStack.Navigator>
	);
}

export const CashoutNavigator = CashoutStackScreen
