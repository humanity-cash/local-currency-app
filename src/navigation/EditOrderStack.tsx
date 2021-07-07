import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ModalConfirmPin from "src/screens/authentication/ModalConfirmPin";
import EditOrderForm from "src/screens/editOrder/EditOrderForm";
import { Order } from "src/utils/types";

type EditOrderStackProps = {
	onClose: () => void
	style?: any,
	order: Order
}

const EditOrderStack = createStackNavigator()
function EditOrderStackScreen(props: EditOrderStackProps) {
	return (
		<EditOrderStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<EditOrderStack.Screen name="EditOrderForm" initialParams={props} component={EditOrderForm} />
			<EditOrderStack.Screen name="EditOrderConfirmPin" initialParams={props} component={ModalConfirmPin} />
		</EditOrderStack.Navigator>
	);
}

export const EditOrderNavigator = EditOrderStackScreen
