import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import SelectBusinessBank from "src/screens/businessBankAccount/SelectBusinessBank";

const BusinessBankAccountStack = createStackNavigator()
function BusinessBankAccountScreen(): ReactElement {
	return (
		<BusinessBankAccountStack.Navigator
			screenOptions={() => ({
				headerShown: false
			})}
		>
			<BusinessBankAccountStack.Screen name="SelectBusinessBank" component={SelectBusinessBank} />
		</BusinessBankAccountStack.Navigator>
	);
}

export const BusinessBankAccountNavigator = BusinessBankAccountScreen
