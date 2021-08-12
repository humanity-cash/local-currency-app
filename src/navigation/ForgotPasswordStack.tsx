import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ForgotPasswordNewPassword from "src/screens/authentication/ForgotPasswordNewPassword";
import ForgotPasswordEmail from "src/screens/authentication/ForgotPasswordEmail";
import ForgotPasswordSuccess from "src/screens/authentication/ForgotPasswordSuccess";
import ForgotPasswordVerification from "src/screens/authentication/ForgotPasswordVerification";

const ForgotPasswordStack = createStackNavigator()
function ForgotPasswordStackScreen(props: ForgotPasswordStackProps) {
	return (
		<ForgotPasswordStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<ForgotPasswordStack.Screen name="ForgotPasswordEmail" initialParams={props} component={ForgotPasswordEmail} />
			<ForgotPasswordStack.Screen name="ForgotPasswordVerification" initialParams={props} component={ForgotPasswordVerification} />
			<ForgotPasswordStack.Screen name="ForgotPasswordNewCode" initialParams={props} component={ForgotPasswordNewPassword} />
			<ForgotPasswordStack.Screen name="ForgotPasswordSuccess" initialParams={props} component={ForgotPasswordSuccess} />
		</ForgotPasswordStack.Navigator>
	);
}

type ForgotPasswordStackProps = {
	onClose: () => void
}

export const ForgotPasswordNavigator = ForgotPasswordStackScreen
