import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ModalConfirmPin from "src/screens/authentication/ModalConfirmPin";
import WithdrawAccount from "src/screens/wallet/WithdrawAccount";
import WithdrawCash from "src/screens/wallet/WithdrawCash";

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
