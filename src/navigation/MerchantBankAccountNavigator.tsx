import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import SelectMerchantBank from "src/screens/merchantBankAccount/SelectMerchantBank";
import LoginToMerchantBank from "src/screens/merchantBankAccount/LoginToMerchantBank";
import SelectMerchantBankAccount from "src/screens/merchantBankAccount/SelectMerchantBankAccount";
import Congratulations from "src/screens/merchantBankAccount/Congratulations";

const MerchantBankAccountStack = createStackNavigator()
function MerchantBankAccountScreen(): ReactElement {
	return (
		<MerchantBankAccountStack.Navigator
			screenOptions={() => ({
				headerShown: false
			})}
		>
			<MerchantBankAccountStack.Screen name="SelectMerchantBank" component={SelectMerchantBank} />
			<MerchantBankAccountStack.Screen name="LoginToMerchantBank" component={LoginToMerchantBank} />
			<MerchantBankAccountStack.Screen name="SelectMerchantBankAccount" component={SelectMerchantBankAccount} />
			<MerchantBankAccountStack.Screen name="Congratulations" component={Congratulations} />
		</MerchantBankAccountStack.Navigator>
	);
}

export const MerchantBankAccountNavigator = MerchantBankAccountScreen
