import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import "react-native-gesture-handler";
import { UserContext, AuthContext, WalletContext } from "src/contexts";
import { AuthStatus, UserType } from "src/auth/types";
import { useRouteTracking } from "src/hooks";
import {
  OnboardingStack,
  CustomerUserStack,
  CashierUserStack,
  BusinessUserStack,
  NotVerifiedUserStack,
  LoadingStack,
} from "./stacks";

const PrimaryStack = createStackNavigator();

const PrimaryStackScreen = () => {
  const { authStatus } = useContext(AuthContext);
  const { isLoading: isWalletLoading, walletData } = useContext(WalletContext);
  const { userType, user, isLoading: isUserLoading } = useContext(UserContext);
  const isVerifiedCustomer = user?.verifiedCustomer || false;
  const isVerifiedBusiness = user?.verifiedBusiness || false;
  const userNotSignedIn = authStatus !== AuthStatus.SignedIn;
  const isLoading = authStatus === AuthStatus.Loading || isUserLoading ;
  console.log("🚀 ~ file: MainNavigationStack.tsx ~ line 27 ~ PrimaryStackScreen ~ isUserLoading", isUserLoading)
  console.log("🚀 ~ file: MainNavigationStack.tsx ~ line 27 ~ PrimaryStackScreen ~ isLoading", isLoading)
    console.log("🚀 ~ file: MainNavigationStack.tsx ~ line 32 ~ PrimaryStackScreen ~ authStatus", authStatus)
  const userIdInWallet =  walletData?.userId;
  const customerUser =
    authStatus === AuthStatus.SignedIn
    && userType === UserType.Customer
    && isVerifiedCustomer;
  const businessUser =
    authStatus === AuthStatus.SignedIn
    && userType === UserType.Business
    && isVerifiedBusiness;
  const cashierUser =
    authStatus === AuthStatus.SignedIn &&
    userType === UserType.Cashier &&
    isVerifiedBusiness;
  const notVerifiedUser = !customerUser
    && !cashierUser
    && !businessUser
    && authStatus === AuthStatus.SignedIn
    && userType === UserType.NotVerified
    //@ts-ignore
    && user !== 'initial'

  return (
    <PrimaryStack.Navigator
      screenOptions={() => ({
        headerShown: false
      })}
    >
      {isLoading ? (<>{LoadingStack()}</>) : userNotSignedIn ? (
        <>{OnboardingStack()}</>
      ) : customerUser ? (
        <>{CustomerUserStack({ isVerifiedBusiness })}</>
      ) : cashierUser ? (
        <>{CashierUserStack()}</>
      ) : businessUser ? (
        <>{BusinessUserStack({ isVerifiedCustomer })}</>
      )
        : notVerifiedUser ? (
          <>{NotVerifiedUserStack()}</>
        ) : (
          <>{LoadingStack()}</>
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
          background: "transparent"
        }
      }}
    >
      <PrimaryStackScreen />
    </NavigationContainer>
  );
};
