import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WalletSelectPayment from "../views/wallet/WalletSelectPayment";
import WalletAddCash from "../views/wallet/WalletAddCash";
import ModalConfirmPin from "../views/authentication/ModalConfirmPin";
import WalletCreditCard from "../views/wallet/WalletCreditCard";
import WalletDeposit from "../views/wallet/WalletDeposit";
import WalletPickCard from "../views/wallet/WalletPickCard";

type AddCashTransactionProps = {
	onClose: () => void
	style?: any,
}

const AddCashTransactionStack = createStackNavigator()
function AddCashTransactionStackScreen(props: AddCashTransactionProps) {
	return (
		<AddCashTransactionStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<AddCashTransactionStack.Screen name="WalletAddCash" initialParams={props} component={WalletAddCash} />
			<AddCashTransactionStack.Screen name="WalletSelectPayment" initialParams={props} component={WalletSelectPayment} />
			<AddCashTransactionStack.Screen name="WalletPickCard" initialParams={props} component={WalletPickCard} />
			<AddCashTransactionStack.Screen name="WalletCreditCard" initialParams={props} component={WalletCreditCard} />
			<AddCashTransactionStack.Screen name="WalletDeposit" initialParams={props} component={WalletDeposit} />
			<AddCashTransactionStack.Screen name="WalletConfirmPin" initialParams={props} component={ModalConfirmPin} />
		</AddCashTransactionStack.Navigator>
	);
}

export const AddCashTransactionNavigator = AddCashTransactionStackScreen
