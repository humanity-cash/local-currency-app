import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ModalConfirmPin from "../views/authentication/ModalConfirmPin";
import ChangeEmail from "../views/settings/ChangeEmail";
import ChangeEmailConfirm from "../views/settings/ChangeEmailConfirm";
import ChangeEmailConfirmed from "../views/settings/ChangeEmailConfirmed";
import VerificationHelp from "../views/settings/VerificationHelp";

type ChangeEmailStackProps = {
	onClose: () => void,
	style?: any,
}

const ChangeEmailStack = createStackNavigator()
function ChangeEmailStackScreen(props: ChangeEmailStackProps) {
	return (
		<ChangeEmailStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<ChangeEmailStack.Screen name="ChangeEmail" initialParams={props} component={ChangeEmail} />
			<ChangeEmailStack.Screen name="ChangeEmailPasscode" initialParams={props} component={ModalConfirmPin} />
			<ChangeEmailStack.Screen name="ChangeEmailConfirm" initialParams={props} component={ChangeEmailConfirm} />
			<ChangeEmailStack.Screen name="ChangeEmailConfirmed" initialParams={props} component={ChangeEmailConfirmed} />
			<ChangeEmailStack.Screen name="VerificationHelp" initialParams={props} component={VerificationHelp} />
		</ChangeEmailStack.Navigator>
	);
}

export const ChangeEmailNavigator = ChangeEmailStackScreen
