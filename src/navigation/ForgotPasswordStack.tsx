import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import * as Routes from './constants';
import ForgotPasswordNewPassword from "src/screens/authentication/ForgotPasswordNewPassword";
import ForgotPasswordEmail from "src/screens/authentication/ForgotPasswordEmail";
import ForgotPasswordSuccess from "src/screens/authentication/ForgotPasswordSuccess";
import ForgotPasswordVerification from "src/screens/authentication/ForgotPasswordVerification";

const ForgotPasswordStack = createStackNavigator()
function ForgotPasswordStackScreen(): ReactElement {
	return (
		<ForgotPasswordStack.Navigator
			screenOptions={() => ({
				headerShown: false
			})}
		>
			<ForgotPasswordStack.Screen name={Routes.FORGOT_PASSOWRD_EMAIL} component={ForgotPasswordEmail} />
			<ForgotPasswordStack.Screen name={Routes.FORGOT_PASSWORD_VERIFICATION} component={ForgotPasswordVerification} />
			<ForgotPasswordStack.Screen name={Routes.FORGOT_PASSWORD_NEW_PASSWORD} component={ForgotPasswordNewPassword} />
			<ForgotPasswordStack.Screen name={Routes.FORGOT_PASSWORD_SUCCESS} component={ForgotPasswordSuccess} />
		</ForgotPasswordStack.Navigator>
	);
}

export const ForgotPasswordNavigator = ForgotPasswordStackScreen
