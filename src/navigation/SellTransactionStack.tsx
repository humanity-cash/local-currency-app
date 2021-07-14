import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ModalConfirmPin from "src/screens/authentication/ModalConfirmPin";
import TransactionComplete from "src/screens/transactions/TransactionComplete";
import TransactionExpireDate from "src/screens/transactions/TransactionExpireDate";
import TransactionForm from "src/screens/transactions/TransactionForm";
import TransactionTwoFactor from "src/screens/transactions/TransactionTwoFactor";
import { ShareEntry } from "src/utils/types";

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
