import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ShareEntry } from "../utils/types";
import ModalConfirmPin from "../views/authentication/ModalConfirmPin";
import TransactionTwoFactor from "../views/transactions/TransactionTwoFactor";
import TransactionExpireDate from "../views/transactions/TransactionExpireDate";
import TransactionForm from "../views/transactions/TransactionForm";
import TransactionComplete from "../views/transactions/TransactionComplete";

type SellTransactionStackProps = {
	route?: any,
	onClose: () => void
	style?: any,
	share: ShareEntry,
	orderId: string,
	withMarketEntry?: boolean
}

const SellTransactionStack = createStackNavigator()
function SellTransactionScreen(props: SellTransactionStackProps) {
	const params = props?.route?.params || props;
	return (
		<SellTransactionStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<SellTransactionStack.Screen name="SellTransactionForm" initialParams={params} component={TransactionForm} />
			<SellTransactionStack.Screen name="SellTransactionConfirmPin" initialParams={params} component={ModalConfirmPin} />
			<SellTransactionStack.Screen name="SellTransactionTwoFactor" initialParams={params} component={TransactionTwoFactor} />
			<SellTransactionStack.Screen name="SellTransactionComplete" initialParams={params} component={TransactionComplete} />
			<SellTransactionStack.Screen name="SellTransactionExpireDate" initialParams={params} component={TransactionExpireDate} />
		</SellTransactionStack.Navigator>
	);
}

export const SellTransactionNavigator = SellTransactionScreen
