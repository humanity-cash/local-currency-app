import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WithdrawCash from "../views/wallet/WithdrawCash";
import WithdrawAccount from "../views/wallet/WithdrawAccount";
import ModalConfirmPin from "../views/authentication/ModalConfirmPin";

type WithdrawTransactionProps = {
	onClose: () => void
	style?: any,
}

const WithdrawTransactionStack = createStackNavigator()
function WithdrawTransactionStackScreen(props: WithdrawTransactionProps) {
	return (
		<WithdrawTransactionStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<WithdrawTransactionStack.Screen name="WithdrawCash" initialParams={props} component={WithdrawCash} />
			<WithdrawTransactionStack.Screen name="WithdrawAccount" initialParams={props} component={WithdrawAccount} />
			<WithdrawTransactionStack.Screen name="WithdrawConfirmPin" initialParams={props} component={ModalConfirmPin} />
		</WithdrawTransactionStack.Navigator>
	);
}

export const WithdrawTransactionNavigator = WithdrawTransactionStackScreen
