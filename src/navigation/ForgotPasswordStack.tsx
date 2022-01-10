import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import ForgotPasswordNewPassword from "src/screens/authentication/ForgotPasswordNewPassword";
import ForgotPasswordEmail from "src/screens/authentication/ForgotPasswordEmail";
import ForgotPasswordSuccess from "src/screens/authentication/ForgotPasswordSuccess";
import ForgotPasswordVerification from "src/screens/authentication/ForgotPasswordVerification";

const ForgotPasswordStack = createStackNavigator();
function ForgotPasswordStackScreen(): ReactElement {
  return (
    <ForgotPasswordStack.Navigator
      screenOptions={() => ({
        headerShown: false
      })}
    >
      <ForgotPasswordStack.Screen
        name="ForgotPasswordEmail"
        component={ForgotPasswordEmail}
      />
      <ForgotPasswordStack.Screen
        name="ForgotPasswordVerification"
        component={ForgotPasswordVerification}
      />
      <ForgotPasswordStack.Screen
        name="ForgotPasswordNewCode"
        component={ForgotPasswordNewPassword}
      />
      <ForgotPasswordStack.Screen
        name="ForgotPasswordSuccess"
        component={ForgotPasswordSuccess}
      />
    </ForgotPasswordStack.Navigator>
  );
}

export const ForgotPasswordNavigator = ForgotPasswordStackScreen;
