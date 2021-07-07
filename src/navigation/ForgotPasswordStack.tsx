import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ForgotPasswordNewCode from "src/screens/authentication/ForgotPasswordNewCode";
import ForgotPasswordNewCodeConfirm from "src/screens/authentication/ForgotPasswordNewCodeConfirm";
import ForgotPasswordPhone from "src/screens/authentication/ForgotPasswordPhone";
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
			<ForgotPasswordStack.Screen name="ForgotPasswordPhone" initialParams={props} component={ForgotPasswordPhone} />
			<ForgotPasswordStack.Screen name="ForgotPasswordVerification" initialParams={props} component={ForgotPasswordVerification} />
			<ForgotPasswordStack.Screen name="ForgotPasswordNewCode" initialParams={props} component={ForgotPasswordNewCode} />
			<ForgotPasswordStack.Screen name="ForgotPasswordNewCodeConfirm" initialParams={props} component={ForgotPasswordNewCodeConfirm} />
			<ForgotPasswordStack.Screen name="ForgotPasswordSuccess" initialParams={props} component={ForgotPasswordSuccess} />
		</ForgotPasswordStack.Navigator>
	);
}

type ForgotPasswordStackProps = {
	onClose: () => void
}

export const ForgotPasswordNavigator = ForgotPasswordStackScreen
