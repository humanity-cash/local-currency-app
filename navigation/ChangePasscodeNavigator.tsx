import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ModalConfirmPin from "../views/authentication/ModalConfirmPin";
import ChangePasscodeNew from "../views/settings/ChangePasscodeNew";
import ChangePasscodeNewConfirm from "../views/settings/ChangePasscoreNewConfirm";
import ChangePasscodeCurrent from "../views/settings/ChangePasscodeCurrent";
import ChangePasscodeSuccess from "../views/settings/ChangePasscodeSuccess";

type ChangePasscodeStackProps = {
	onClose: () => void,
	style?: any,
}

const ChangePasscodeStack = createStackNavigator()
function ChangePasscodeStackScreen(props: ChangePasscodeStackProps) {
	return (
		<ChangePasscodeStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<ChangePasscodeStack.Screen name="ChangePasscodeCurrent" initialParams={props} component={ChangePasscodeCurrent} />
			<ChangePasscodeStack.Screen name="ChangePasscodeNew" initialParams={props} component={ChangePasscodeNew} />
			<ChangePasscodeStack.Screen name="ChangePasscodeNewConfirm" initialParams={props} component={ChangePasscodeNewConfirm} />
			<ChangePasscodeStack.Screen name="ChangePasscodeSuccess" initialParams={props} component={ChangePasscodeSuccess} />
		</ChangePasscodeStack.Navigator>
	);
}

export const ChangePasscodeNavigator = ChangePasscodeStackScreen
