import React from "react";
import "react-native-gesture-handler";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Teaser from "../views/onboarding/Teaser";
import CreateAccount from "../views/onboarding/CreateAccount";
import Verification from "../views/onboarding/Verification";
import VerificationHelp from "../views/onboarding/VerificationHelp";
import Passcode from "../views/onboarding/Passcode";
import PasscodeConfirm from "../views/onboarding/PasscodeConfirm";
import OnboardingSteps from "../views/onboarding/OnboardingSteps";
import PersonalDetails from "../views/onboarding/PersonalDetails";
import PersonalAddress from "../views/onboarding/PersonalAddress";
import TermsEmail from "../views/onboarding/TermsEmail";
import ConfirmEmail from "../views/onboarding/ConfirmEmail";
import EmailConfirmed from "../views/onboarding/EmailConfirmed";
import Terms from "../views/onboarding/Terms";
import AddCash from "../views/onboarding/AddCash";
import SelectPayment from "../views/onboarding/SelectPayment";
import Deposit from "../views/onboarding/Deposit";
import CreditCard from "../views/onboarding/CreditCard";
import ConfirmPin from "../views/authentication/ConfirmPin";
import AddCashResult from "../views/onboarding/AddCashResult";
import Login from "../views/authentication/Login";
import Dashboard from "../views/dashboard/Dashboard";
import MarketEntryDetails from "../views/dashboard/MarketEntryDetails";
import { useRouteTracking } from "../hooks/useRouteTracking";
import Wallet from "../views/wallet/Wallet";
import SettingsTermsAndConditions from "../views/settings/SettingsTermsAndConditions";
import SettingsHelpAndContact from "../views/settings/SettingsHelpAndContact";
import ContactPhone from "../views/settings/ContactPhone";
import ContactEmail from "../views/settings/ContactEmail";
import { Settings } from "../views/settings/Settings";
import SettingsPersonalDetails from "../views/settings/SettingsPersonalDetails";
import SettingsAccountDetails from "../views/settings/SettingsAccountDetails";
import SettingsCards from "../views/settings/SettingsCards";

const PrimaryStack = createStackNavigator();

function PrimaryStackScreen() {
  return (
    <PrimaryStack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <PrimaryStack.Screen name="Teaser" component={Teaser} />
      <PrimaryStack.Screen name="Login" component={Login} />
      <PrimaryStack.Screen name="CreateAccount" component={CreateAccount} />
      <PrimaryStack.Screen name="Verification" component={Verification} />
      <PrimaryStack.Screen
        name="VerificationHelp"
        component={VerificationHelp}
      />
      <PrimaryStack.Screen name="Passcode" component={Passcode} />
      <PrimaryStack.Screen name="ConfirmPasscode" component={PasscodeConfirm} />
      <PrimaryStack.Screen name="OnboardingSteps" component={OnboardingSteps} />
      <PrimaryStack.Screen name="PersonalDetails" component={PersonalDetails} />
      <PrimaryStack.Screen name="PersonalAddress" component={PersonalAddress} />
      <PrimaryStack.Screen name="TermsEmail" component={TermsEmail} />
      <PrimaryStack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      <PrimaryStack.Screen name="EmailConfirmed" component={EmailConfirmed} />
      <PrimaryStack.Screen name="Terms" component={Terms} />
      <PrimaryStack.Screen name="AddCash" component={AddCash} />
      <PrimaryStack.Screen name="SelectPayment" component={SelectPayment} />
      <PrimaryStack.Screen name="Deposit" component={Deposit} />
      <PrimaryStack.Screen name="CreditCard" component={CreditCard} />
      <PrimaryStack.Screen name="ConfirmPin" component={ConfirmPin} />
      <PrimaryStack.Screen name="AddCashResult" component={AddCashResult} />
      <PrimaryStack.Screen name="Tabs" component={Dashboard} />
      <PrimaryStack.Screen
        name="MarketEntryDetails"
        component={MarketEntryDetails}
      />
      <PrimaryStack.Screen name="Wallet" component={Wallet} />
      <PrimaryStack.Screen
        name="SettingsTermsAndConditions"
        component={SettingsTermsAndConditions}
      />
      <PrimaryStack.Screen
        name="SettingsHelpAndContact"
        component={SettingsHelpAndContact}
      />
      <PrimaryStack.Screen name="ContactPhone" component={ContactPhone} />
      <PrimaryStack.Screen name="ContactEmail" component={ContactEmail} />
      <PrimaryStack.Screen name="Settings" component={Settings} />
      <PrimaryStack.Screen
        name="SettingsPersonalDetails"
        component={SettingsPersonalDetails}
      />
      <PrimaryStack.Screen
        name="SettingsAccountDetails"
        component={SettingsAccountDetails}
      />
      <PrimaryStack.Screen name="SettingsCards" component={SettingsCards} />
    </PrimaryStack.Navigator>
  );
}

export const MainNavigationStack = () => {
  const { currentRoute, update } = useRouteTracking();
  const ref = React.useRef<any>();
  return (
    <NavigationContainer
      ref={ref}
      onStateChange={(state) => {
        update({ current: ref?.current?.getCurrentRoute().name });
      }}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "transparent",
        },
      }}
    >
      <PrimaryStackScreen />
    </NavigationContainer>
  );
};
