import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ForgotPasswordPhone from "../views/authentication/ForgotPasswordPhone";
import ForgotPasswordVerification from "../views/authentication/ForgotPasswordVerification";
import ForgotPasswordNewCode from "../views/authentication/ForgotPasswordNewCode";
import ForgotPasswordNewCodeConfirm from "../views/authentication/ForgotPasswordNewCodeConfirm";
import ForgotPasswordSuccess from "../views/authentication/ForgotPasswordSuccess";
import { View } from "react-native";

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
