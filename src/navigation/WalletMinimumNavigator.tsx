import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ModalConfirmPin from "../views/authentication/ModalConfirmPin";
import WalletMinimumAmount from "../views/settings/WalletMinimumAmount";
import WalletMinimumSelectPayment from "../views/settings/WalletMinimumSelectPayment";
import WalletMinimumCreditCard from "../views/settings/WalletMinimumCreditCard";

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
