import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SelectMerchantBank from "src/screens/merchantBankAccount/SelectMerchantBank";
import LoginToMerchantBank from "src/screens/merchantBankAccount/LoginToMerchantBank";
import SelectMerchantBankAccount from "src/screens/merchantBankAccount/SelectMerchantBankAccount";
import Congratulations from "src/screens/merchantBankAccount/Congratulations";

type MerchantBankAccountNavigatorProps = {
	route?: any
}

const MerchantBankAccountStack = createStackNavigator()
function MerchantBankAccountScreen(props: MerchantBankAccountNavigatorProps) {
	const params = props?.route?.params || props;
	return (
		<MerchantBankAccountStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<MerchantBankAccountStack.Screen name="SelectMerchantBank" initialParams={params} component={SelectMerchantBank} />
			<MerchantBankAccountStack.Screen name="LoginToMerchantBank" initialParams={params} component={LoginToMerchantBank} />
			<MerchantBankAccountStack.Screen name="SelectMerchantBankAccount" initialParams={params} component={SelectMerchantBankAccount} />
			<MerchantBankAccountStack.Screen name="Congratulations" initialParams={params} component={Congratulations} />
		</MerchantBankAccountStack.Navigator>
	);
}

export const MerchantBankAccountNavigator = MerchantBankAccountScreen
