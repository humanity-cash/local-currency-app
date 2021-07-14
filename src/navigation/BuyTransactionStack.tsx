import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ModalConfirmPin from "src/screens/authentication/ModalConfirmPin";
import TransactionAddCash from "src/screens/transactions/TransactionAddCash";
import TransactionComplete from "src/screens/transactions/TransactionComplete";
import TransactionCreditCard from "src/screens/transactions/TransactionCreditCard";
import TransactionDeposit from "src/screens/transactions/TransactionDeposit";
import TransactionExpireDate from "src/screens/transactions/TransactionExpireDate";
import TransactionForm from "src/screens/transactions/TransactionForm";
import TransactionPickCard from "src/screens/transactions/TransactionPickCard";
import TransactionSelectPayment from "src/screens/transactions/TransactionSelectPayment";
import { ShareEntry } from "src/utils/types";

type BuyTransactionStackProps = {
	route?: any,
	onClose: () => void
	style?: any,
	share: ShareEntry,
	orderId: string,
	withMarketEntry?: boolean
}

const BuyTransactionStack = createStackNavigator()
function BuyTransactionScreen(props: BuyTransactionStackProps) {
	const params = props?.route?.params || props;
	return (
		<BuyTransactionStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<BuyTransactionStack.Screen name="BuyTransactionForm" initialParams={params} component={TransactionForm} />
			<BuyTransactionStack.Screen name="BuyTransactionConfirmPin" initialParams={params} component={ModalConfirmPin} />
			<BuyTransactionStack.Screen name="BuyTransactionComplete" initialParams={params} component={TransactionComplete} />
			<BuyTransactionStack.Screen name="BuyTransactionExpireDate" initialParams={params} component={TransactionExpireDate} />
			<BuyTransactionStack.Screen name="BuyTransactionAddCash" initialParams={params} component={TransactionAddCash} />
			<BuyTransactionStack.Screen name="BuyTransactionSelectPayment" initialParams={params} component={TransactionSelectPayment} />
			<BuyTransactionStack.Screen name="BuyTransactionPickCard" initialParams={params} component={TransactionPickCard} />
			<BuyTransactionStack.Screen name="BuyTransactionCreditCard" initialParams={params} component={TransactionCreditCard} />
			<BuyTransactionStack.Screen name="BuyTransactionDeposit" initialParams={params} component={TransactionDeposit} />
		</BuyTransactionStack.Navigator>
	);
}

export const BuyTransactionNavigator = BuyTransactionScreen
