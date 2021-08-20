import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import RedemptionInProgress from "src/screens/cashout/RedemptionInProgress";

const CashoutStack = createStackNavigator()
function CashoutStackScreen() {
	return (
		<CashoutStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<CashoutStack.Screen name="RedemptionInProgress" component={RedemptionInProgress} />
		</CashoutStack.Navigator>
	);
}

export const CashoutNavigator = CashoutStackScreen
