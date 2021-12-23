import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import "react-native-gesture-handler";
import { NavigationViewContext, UserContext } from "src/contexts";
import { ViewState } from "src/contexts/navigation";
import { useRouteTracking } from "src/hooks";
import {
  BusinessLinkBankAccount, BusinessUserStack, CashierUserStack, CustomerLinkBankAccount, CustomerUserStack, NotVerifiedUserStack, OnboardingStack
} from "./stacks";

const PrimaryStack = createStackNavigator();

const PrimaryStackScreen = () => {
  const { selectedView } = useContext(NavigationViewContext)
  const { user } = useContext(UserContext);

  return (
    <PrimaryStack.Navigator
      screenOptions={() => ({
        headerShown: false
      })}
    >
      {selectedView === ViewState.Customer ? (
        <>{CustomerUserStack({ isVerifiedBusiness: user?.verifiedBusiness || false })}</>
      ) : selectedView === ViewState.Cashier ? (
        <>{CashierUserStack()}</>
      ) : selectedView === ViewState.Business ? (
        <>{BusinessUserStack({ isVerifiedCustomer: user?.verifiedCustomer || false })}</>
      ) : selectedView === ViewState.CustomerLinkBank ? (
        <>{CustomerLinkBankAccount()}</>
      ) : selectedView === ViewState.BusinessLinkBank ? (
        <>{BusinessLinkBankAccount()}</>
      ) : selectedView === ViewState.NotVerified ? (
        <>{NotVerifiedUserStack()}</>
      ) : <>{OnboardingStack()}</>}
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
