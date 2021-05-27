import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditOrderForm from "../views/editOrder/EditOrderForm";
import { Order } from "../utils/types";
import ModalConfirmPin from "../views/authentication/ModalConfirmPin";

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
