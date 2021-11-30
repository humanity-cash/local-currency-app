import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import "react-native-gesture-handler";
import { useSelector } from 'react-redux';
import { NavigationViewContext, UserContext } from "src/contexts";
import { ViewState } from "src/contexts/navigation";
import { useRouteTracking } from "src/hooks";
import { AppState } from 'src/store';
import { LoadingPageState } from 'src/store/loading/loading.reducer';
import {
  BusinessLinkBankAccount, BusinessUserStack, CashierUserStack, CustomerLinkBankAccount, CustomerUserStack, LoadingStack, NotVerifiedUserStack, OnboardingStack
} from "./stacks";

const PrimaryStack = createStackNavigator();

const PrimaryStackScreen = () => {
  const { selectedView } = useContext(NavigationViewContext)
  console.log(":PrimaryStackScreen ~ selectedView", selectedView)
  const { user } = useContext(UserContext);
  const { loadingState } = useSelector((state: AppState) => state.loadingReducer) as LoadingPageState;

  return (
    <PrimaryStack.Navigator
      screenOptions={() => ({
        headerShown: false
      })}
    >
      {loadingState.isLoading ? (<>{LoadingStack()}</>)
        : selectedView === ViewState.Customer ? (
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
        ) : selectedView === ViewState.Onboarding ? (
          <>{OnboardingStack()}</>
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


  // useEffect(() => {
  //   const customerUser =
  //     (authStatus === AuthStatus.SignedIn
  //       && userType === UserType.Customer
  //       && user?.verifiedCustomer) || false;
  //   const businessUser =
  //     (authStatus === AuthStatus.SignedIn
  //       && userType === UserType.Business
  //       && user?.verifiedBusiness) || false;
  //   const cashierUser =
  //     (authStatus === AuthStatus.SignedIn &&
  //       userType === UserType.Cashier &&
  //       user?.verifiedBusiness) || false;
  //   const notVerifiedUser = !customerUser
  //     && !cashierUser
  //     && !businessUser
  //     && authStatus === AuthStatus.SignedIn
  //     && userType === UserType.NotVerified
  //   setState({ customerUser, businessUser, cashierUser, notVerifiedUser })
  // }, [
  //   authStatus, userType, user
  // ])