import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import BusinessProfile from "src/screens/signupBusiness/BusinessProfile";
import BusinessDetail from "src/screens/signupBusiness/BusinessDetail";
import BusinessOwnerDetail from "src/screens/signupBusiness/BusinessOwnerDetail";
import BusinessOwnerAddress from "src/screens/signupBusiness/BusinessOwnerAddress";
import BusinessInfo from "src/screens/signupBusiness/BusinessInfo";
import BusinessAddress from "src/screens/signupBusiness/BusinessAddress";
import BusinessWelcome from "src/screens/signupBusiness/BusinessWelcome";
import * as Constants from './constants';

const SignupBusinessStack = createStackNavigator()
function SignupBusinessScreen(): ReactElement {
	return (
		<SignupBusinessStack.Navigator
			screenOptions={() => ({
				headerShown: false,
			})}
		>
			<SignupBusinessStack.Screen name={Constants.BUSINESS_PROFILE} component={BusinessProfile} />
			<SignupBusinessStack.Screen name={Constants.BUSINESS_DETAIL} component={BusinessDetail} />
			<SignupBusinessStack.Screen name={Constants.BUSINESS_OWNER_DETAIL} component={BusinessOwnerDetail} />
			<SignupBusinessStack.Screen name={Constants.BUSINESS_OWNER_ADDRESS} component={BusinessOwnerAddress} />
			<SignupBusinessStack.Screen name={Constants.BUSINESS_INFO} component={BusinessInfo} />
			<SignupBusinessStack.Screen name={Constants.BUSINESS_ADDRESS} component={BusinessAddress} />
			<SignupBusinessStack.Screen name={Constants.BUSINESS_WELCOME} component={BusinessWelcome} />
		</SignupBusinessStack.Navigator>
	);
}

export const SignupBusinessNavigator = SignupBusinessScreen
