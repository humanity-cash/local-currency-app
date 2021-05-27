import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ShareEntry } from "../utils/types";
import TransactionForm from "../views/transactions/TransactionForm";
import ModalConfirmPin from "../views/authentication/ModalConfirmPin";
import TransactionExpireDate from "../views/transactions/TransactionExpireDate";
import TransactionComplete from "../views/transactions/TransactionComplete";
import TransactionAddCash from "../views/transactions/TransactionAddCash";
import TransactionSelectPayment from "../views/transactions/TransactionSelectPayment";
import TransactionCreditCard from "../views/transactions/TransactionCreditCard";
import TransactionDeposit from "../views/transactions/TransactionDeposit";
import TransactionPickCard from "../views/transactions/TransactionPickCard";

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
