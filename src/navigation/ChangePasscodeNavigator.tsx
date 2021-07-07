import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ChangePasscodeCurrent from "src/screens/settings/ChangePasscodeCurrent";
import ChangePasscodeNew from "src/screens/settings/ChangePasscodeNew";
import ChangePasscodeSuccess from "src/screens/settings/ChangePasscodeSuccess";
import ChangePasscodeNewConfirm from "src/screens/settings/ChangePasscoreNewConfirm";

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
