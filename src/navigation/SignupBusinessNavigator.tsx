import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import BusinessProfile from "src/screens/signupBusiness/BusinessProfile";
import BusinessDetail from "src/screens/signupBusiness/BusinessDetail";
import BusinessOwnerDetail from "src/screens/signupBusiness/BusinessOwnerDetail";
import BusinessOwnerAddress from "src/screens/signupBusiness/BusinessOwnerAddress";
import BusinessInfo from "src/screens/signupBusiness/BusinessInfo";
import BusinessAddress from "src/screens/signupBusiness/BusinessAddress";
import BusinessWelcome from "src/screens/signupBusiness/BusinessWelcome";

const SignupBusinessStack = createStackNavigator()
function SignupBusinessScreen(): ReactElement {
	return (
		<SignupBusinessStack.Navigator
			screenOptions={() => ({
				headerShown: false,
			})}
		>
			<SignupBusinessStack.Screen name="BusinessProfile" component={BusinessProfile} />
			<SignupBusinessStack.Screen name="BusinessDetail" component={BusinessDetail} />
			<SignupBusinessStack.Screen name="BusinessOwnerDetail" component={BusinessOwnerDetail} />
			<SignupBusinessStack.Screen name="BusinessOwnerAddress" component={BusinessOwnerAddress} />
			<SignupBusinessStack.Screen name="BusinessInfo" component={BusinessInfo} />
			<SignupBusinessStack.Screen name="BusinessAddress" component={BusinessAddress} />
			<SignupBusinessStack.Screen name="BusinessWelcome" component={BusinessWelcome} />
		</SignupBusinessStack.Navigator>
	);
}

export const SignupBusinessNavigator = SignupBusinessScreen
