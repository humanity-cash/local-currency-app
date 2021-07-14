import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ModalConfirmPin from "src/screens/authentication/ModalConfirmPin";
import WalletMinimumAmount from "src/screens/settings/WalletMinimumAmount";
import WalletMinimumCreditCard from "src/screens/settings/WalletMinimumCreditCard";
import WalletMinimumSelectPayment from "src/screens/settings/WalletMinimumSelectPayment";

type WalletMinimumStackProps = {
	onClose: () => void,
	style?: any,
}

const WalletMinimumStack = createStackNavigator()
function WalletMinimumStackScreen(props: WalletMinimumStackProps) {
	return (
		<WalletMinimumStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<WalletMinimumStack.Screen name="WalletMinimum" initialParams={props} component={WalletMinimumAmount} />
			<WalletMinimumStack.Screen name="WalletSelectPayment" initialParams={props} component={WalletMinimumSelectPayment} />
			<WalletMinimumStack.Screen name="WalletCreditCard" initialParams={props} component={WalletMinimumCreditCard} />
			<WalletMinimumStack.Screen name="WalletConfirmPin" initialParams={props} component={ModalConfirmPin} />
		</WalletMinimumStack.Navigator>
	);
}

export const WalletMinimumNavigator = WalletMinimumStackScreen
