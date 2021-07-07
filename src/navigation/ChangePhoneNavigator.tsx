import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ModalConfirmPin from "src/screens/authentication/ModalConfirmPin";
import ChangePhone from "src/screens/settings/ChangePhone";
import ChangePhoneVerification from "src/screens/settings/ChangePhoneVerification";

type ChangePhoneStackProps = {
	onClose: () => void,
	style?: any,
}

const ChangePhoneStack = createStackNavigator()
function ChangePhoneStackScreen(props: ChangePhoneStackProps) {
	return (
		<ChangePhoneStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<ChangePhoneStack.Screen name="ChangePhone" initialParams={props} component={ChangePhone} />
			<ChangePhoneStack.Screen name="ChangePhonePasscode" initialParams={props} component={ModalConfirmPin} />
			<ChangePhoneStack.Screen name="ChangePhoneVerification" initialParams={props} component={ChangePhoneVerification} />
		</ChangePhoneStack.Navigator>
	);
}

export const ChangePhoneNavigator = ChangePhoneStackScreen
