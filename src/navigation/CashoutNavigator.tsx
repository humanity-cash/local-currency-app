import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import RedemptionInProgress from "src/screens/cashout/RedemptionInProgress";

type CashoutStackProps = {
	onClose: () => void,
	style?: any,
}

const CashoutStack = createStackNavigator()
function CashoutStackScreen(props: CashoutStackProps) {
	return (
		<CashoutStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<CashoutStack.Screen name="RedemptionInProgress" initialParams={props} component={RedemptionInProgress} />
		</CashoutStack.Navigator>
	);
}

export const CashoutNavigator = CashoutStackScreen
