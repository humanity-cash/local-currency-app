import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import "react-native-gesture-handler";
import { useRouteTracking } from "src/hooks";
import ConfirmPin from "src/screens/authentication/ConfirmPin";
import Login from "src/screens/authentication/Login";
import TopUp from "src/screens/onboarding/TopUp";
import TopUpSuccess from "src/screens/onboarding/TopUpSuccess";
import ConfirmEmail from "src/screens/onboarding/ConfirmEmail";
import CreateAccount from "src/screens/onboarding/CreateAccount";
import CreditCard from "src/screens/onboarding/CreditCard";
import Deposit from "src/screens/onboarding/Deposit";
import EmailConfirmed from "src/screens/onboarding/EmailConfirmed";
import Password from "src/screens/onboarding/Password";
import PasswordConfirm from "src/screens/onboarding/PasswordConfirm";
import Passcode from "src/screens/onboarding/Passcode";
import TouchId from "src/screens/onboarding/TouchId";
import PersonalAddress from "src/screens/onboarding/PersonalAddress";
import PersonalDetails from "src/screens/onboarding/PersonalDetails";
import PersonalProfile from "src/screens/onboarding/PersonalProfile";
import SelectPayment from "src/screens/onboarding/SelectPayment";
import Teaser from "src/screens/onboarding/Teaser";
import TermsEmail from "src/screens/onboarding/TermsEmail";
import Verification from "src/screens/onboarding/Verification";
import VerificationHelp from "src/screens/onboarding/VerificationHelp";
import { Settings } from "src/screens/settings/Settings";
import SettingsSecurity from "src/screens/settings/SettingsSecurity";
import SettingsPersonalProfile from "src/screens/settings/SettingsPersonalProfile";
import SettingsTermsAndConditions from "src/screens/settings/SettingsTermsAndConditions";
import SettingsBankAccount from "src/screens/settings/SettingsBankAccount";
import SettingsDeleteAccount from "src/screens/settings/SettingsDeleteAccount";
import SelectAccountType from "src/screens/onboarding/SelectAccountType";
import LinkBankAccount from "src/screens/onboarding/LinkBankAccount";
import SelectBank from "src/screens/onboarding/SelectBank";
import LoginToBank from "src/screens/onboarding/LoginToBank";
import SelectBankAccount from "src/screens/onboarding/SelectBankAccount";
import Congratulations from "src/screens/onboarding/Congratulations";
import Tabs from "src/screens/dashboard/Tabs";
import QRCodeScan from "src/screens/payment/QRCodeScan";
import PaymentPending from "src/screens/payment/PaymentPending";
import PaymentSuccess from "src/screens/payment/PaymentSuccess";
import Request from "src/screens/payment/Request";
import { ForgotPasswordNavigator } from "src/navigation/ForgotPasswordStack";
import { CashoutNavigator } from "src/navigation/CashoutNavigator";

import { SignupBusinessNavigator } from 'src/navigation/SignupBusinessNavigator';
import { MerchantBankAccountNavigator } from 'src/navigation/MerchantBankAccountNavigator';

import MerchantTabs from "src/screens/dashboard/MerchantTabs";
import MerchantPaymentPending from "src/screens/merchantPayment/MerchantPaymentPending";
import MerchantPaymentSuccess from "src/screens/merchantPayment/MerchantPaymentSuccess";
import MerchantReturn from "src/screens/merchantPayment/MerchantReturn";

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
      <PrimaryStack.Screen name="VerificationHelp" component={VerificationHelp} />
      <PrimaryStack.Screen name="Password" component={Password} />
      <PrimaryStack.Screen name="ConfirmPassword" component={PasswordConfirm} />
      <PrimaryStack.Screen name="Passcode" component={Passcode} />
      <PrimaryStack.Screen name="TouchId" component={TouchId} />
      <PrimaryStack.Screen name="PersonalProfile" component={PersonalProfile} />
      <PrimaryStack.Screen name="PersonalDetails" component={PersonalDetails} />
      <PrimaryStack.Screen name="PersonalAddress" component={PersonalAddress} />
      <PrimaryStack.Screen name="TermsEmail" component={TermsEmail} />
      <PrimaryStack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      <PrimaryStack.Screen name="EmailConfirmed" component={EmailConfirmed} />
      <PrimaryStack.Screen name="TopUp" component={TopUp} />
      <PrimaryStack.Screen name="TopUpSuccess" component={TopUpSuccess} />
      <PrimaryStack.Screen name="SelectPayment" component={SelectPayment} />
      <PrimaryStack.Screen name="Deposit" component={Deposit} />
      <PrimaryStack.Screen name="CreditCard" component={CreditCard} />
      <PrimaryStack.Screen name="ConfirmPin" component={ConfirmPin} />
      <PrimaryStack.Screen name="SettingsTermsAndConditions" component={SettingsTermsAndConditions} />
      <PrimaryStack.Screen name="Settings" component={Settings} />
      <PrimaryStack.Screen name="SettingsPersonalProfile" component={SettingsPersonalProfile} />
      <PrimaryStack.Screen name="SettingsSecurity" component={SettingsSecurity} />
      <PrimaryStack.Screen name="SettingsBankAccount" component={SettingsBankAccount} />
      <PrimaryStack.Screen name="SettingsDeleteAccount" component={SettingsDeleteAccount} />
      <PrimaryStack.Screen name="SelectAccountType" component={SelectAccountType} />
      <PrimaryStack.Screen name="LinkBankAccount" component={LinkBankAccount} />
      <PrimaryStack.Screen name="SelectBank" component={SelectBank} />
      <PrimaryStack.Screen name="LoginToBank" component={LoginToBank} />
      <PrimaryStack.Screen name="SelectBankAccount" component={SelectBankAccount} />
      <PrimaryStack.Screen name="Congratulations" component={Congratulations} />
      <PrimaryStack.Screen name="Tabs" component={Tabs} />
      <PrimaryStack.Screen name="QRCodeScan" component={QRCodeScan} />
      <PrimaryStack.Screen name="PaymentPending" component={PaymentPending} />
      <PrimaryStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
      <PrimaryStack.Screen name="PaymentRequest" component={Request} />
      <PrimaryStack.Screen name="ForgotPassword" component={ForgotPasswordNavigator} />
      <PrimaryStack.Screen name="Cashout" component={CashoutNavigator} />

      <PrimaryStack.Screen name="MerchantTabs" component={MerchantTabs} />
      <PrimaryStack.Screen name="MerchantPaymentPending" component={MerchantPaymentPending} />
      <PrimaryStack.Screen name="MerchantPaymentSuccess" component={MerchantPaymentSuccess} />
      <PrimaryStack.Screen name="MerchantReturn" component={MerchantReturn} />

      <PrimaryStack.Screen name="SignupBusiness" component={SignupBusinessNavigator} />
      <PrimaryStack.Screen name="MerchantBankAccount" component={MerchantBankAccountNavigator} />
      
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
