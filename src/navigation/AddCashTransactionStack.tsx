import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ModalConfirmPin from "src/screens/authentication/ModalConfirmPin";
import WalletAddCash from "src/screens/wallet/WalletAddCash";
import WalletCreditCard from "src/screens/wallet/WalletCreditCard";
import WalletDeposit from "src/screens/wallet/WalletDeposit";
import WalletPickCard from "src/screens/wallet/WalletPickCard";
import WalletSelectPayment from "src/screens/wallet/WalletSelectPayment";

type AddCashTransactionProps = {
	onClose: () => void
	style?: any,
}

const AddCashTransactionStack = createStackNavigator();

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
