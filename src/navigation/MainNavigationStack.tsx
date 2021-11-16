import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Text } from "react-native";
import "react-native-gesture-handler";
import { UserContext } from "src/api/context";
import { AuthContext } from "src/auth";
import { AuthStatus, UserType } from "src/auth/types";
import { useRouteTracking } from "src/hooks";
import { OnboardingStack, CustomerUserStack, CashierUserStack, BusinessUserStack, NotVerifiedUserStack } from "./stacks";

const PrimaryStack = createStackNavigator();

const PrimaryStackScreen = () => {
	const { authStatus } = useContext(AuthContext);
	const { userType, user } = useContext(UserContext)
	const isVerifiedCustomer = user?.verifiedCustomer || false;
  console.log("🚀 ~ file: MainNavigationStack.tsx ~ line 18 ~ PrimaryStackScreen ~ isVerifiedCustomer", isVerifiedCustomer)
	const isVerifiedBusiness = user?.verifiedBusiness || false;
  console.log("🚀 ~ file: MainNavigationStack.tsx ~ line 20 ~ PrimaryStackScreen ~ isVerifiedBusiness", isVerifiedBusiness)
	const userNotSignedIn =
		authStatus !== AuthStatus.SignedIn;
  console.log("🚀 ~ file: MainNavigationStack.tsx ~ line 22 ~ PrimaryStackScreen ~ userNotSignedIn", userNotSignedIn)
	const notVerifiedUser = !userType || !(authStatus === AuthStatus.SignedIn);
  console.log("🚀 ~ file: MainNavigationStack.tsx ~ line 26 ~ PrimaryStackScreen ~ notVerifiedUser", notVerifiedUser)
	const customerUser =
		authStatus === AuthStatus.SignedIn
		&& userType === UserType.Customer
		&& isVerifiedCustomer;
	const businessUser =
		authStatus === AuthStatus.SignedIn
		&& userType === UserType.Business
		&& isVerifiedBusiness;
	const cashierUser =
		authStatus === AuthStatus.SignedIn
		&& userType === UserType.Cashier
		&& isVerifiedBusiness;

	return (
		<PrimaryStack.Navigator
			screenOptions={() => ({
				headerShown: false,
			})}>
			{userNotSignedIn ? (
				<>
					{OnboardingStack()}
				</>
			) : customerUser ? (
				<>
					{CustomerUserStack({ isVerifiedBusiness })}
				</>
			) : cashierUser ? (
				<>
					{CashierUserStack()}
				</>
			) : businessUser ? (
				<>
					{BusinessUserStack({ isVerifiedCustomer })}
				</>
			) : notVerifiedUser ? (
				<>
					{NotVerifiedUserStack()}
				</>
			) : (
				<>
					<PrimaryStack.Screen
						name={"DEADEND"}
						component={() => {
							return (
								<Text>Dead End</Text>
							)
						}}
					/>
				</>
			)}
		</PrimaryStack.Navigator>
	);
};

export const MainNavigationStack = (): JSX.Element => {
	const { update } = useRouteTracking();
	const ref = React.useRef<any>();
	return (
		<NavigationContainer
			ref={ref}
			onStateChange={() => {
				update({ current: ref?.current?.getCurrentRoute().name });
			}}
			theme={{
				...DefaultTheme,
				colors: {
					...DefaultTheme.colors,
					background: "transparent",
				},
			}}>
			<PrimaryStackScreen />
		</NavigationContainer>
	);
};
