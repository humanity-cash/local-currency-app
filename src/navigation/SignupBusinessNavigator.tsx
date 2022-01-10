import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import BusinessProfile from "src/screens/business/signup/BusinessProfile";
import BusinessDetail from "src/screens/business/signup/BusinessDetail";
import BusinessOwnerDetail from "src/screens/business/signup/BusinessOwnerDetail";
import BusinessOwnerAddress from "src/screens/business/signup/BusinessOwnerAddress";
import BusinessInfo from "src/screens/business/signup/BusinessInfo";
import BusinessAddress from "src/screens/business/signup/BusinessAddress";
import BusinessWelcome from "src/screens/business/signup/BusinessWelcome";

const SignupBusinessStack = createStackNavigator();
function SignupBusinessScreen(): ReactElement {
  return (
    <SignupBusinessStack.Navigator
      screenOptions={() => ({
        headerShown: false
      })}
    >
      <SignupBusinessStack.Screen
        name="BusinessProfile"
        component={BusinessProfile}
      />
      <SignupBusinessStack.Screen
        name="BusinessDetail"
        component={BusinessDetail}
      />
      <SignupBusinessStack.Screen
        name="BusinessOwnerDetail"
        component={BusinessOwnerDetail}
      />
      <SignupBusinessStack.Screen
        name="BusinessOwnerAddress"
        component={BusinessOwnerAddress}
      />
      <SignupBusinessStack.Screen
        name="BusinessInfo"
        component={BusinessInfo}
      />
      <SignupBusinessStack.Screen
        name="BusinessAddress"
        component={BusinessAddress}
      />
      <SignupBusinessStack.Screen
        name="BusinessWelcome"
        component={BusinessWelcome}
      />
    </SignupBusinessStack.Navigator>
  );
}

export const SignupBusinessNavigator = SignupBusinessScreen;
