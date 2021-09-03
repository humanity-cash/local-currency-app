import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { AuthContext, AuthStatus } from "src/auth";
import { useRouteTracking } from "src/hooks";
import { CashoutNavigator } from "src/navigation/CashoutNavigator";
import { ForgotPasswordNavigator } from "src/navigation/ForgotPasswordStack";
import { SignupBusinessNavigator } from "src/navigation/SignupBusinessNavigator";

import Login from "src/screens/authentication/Login";
import Tabs from "src/screens/dashboard/Tabs";
import ConfirmEmail from "src/screens/onboarding/ConfirmEmail";
import BankLinkSuccess from "src/screens/onboarding/BankLinkSuccess";
import CreateAccount from "src/screens/onboarding/CreateAccount";
import EmailConfirmed from "src/screens/onboarding/EmailConfirmed";
import LinkBankAccount from "src/screens/onboarding/LinkBankAccount";
import LoginToBank from "src/screens/onboarding/LoginToBank";
import Password from "src/screens/onboarding/Password";
import PersonalAddress from "src/screens/onboarding/PersonalAddress";
import PersonalDetails from "src/screens/onboarding/PersonalDetails";
import PersonalProfile from "src/screens/onboarding/PersonalProfile";
import SelectAccountType from "src/screens/onboarding/SelectAccountType";
import SelectBank from "src/screens/onboarding/SelectBank";
import SelectBankAccount from "src/screens/onboarding/SelectBankAccount";
import Teaser from "src/screens/onboarding/Teaser";
import TermsEmail from "src/screens/onboarding/TermsEmail";
import LoadUp from "src/screens/onboarding/LoadUp";
import LoadUpSuccess from "src/screens/onboarding/LoadUpSuccess";
import Verification from "src/screens/onboarding/Verification";
import VerificationHelp from "src/screens/onboarding/VerificationHelp";
import PaymentPending from "src/screens/payment/PaymentPending";
import PaymentSuccess from "src/screens/payment/PaymentSuccess";
import QRCodeScan from "src/screens/payment/QRCodeScan";
import SettingsBankAccount from "src/screens/settings/SettingsBankAccount";
import SettingsDeleteAccount from "src/screens/settings/SettingsDeleteAccount";
import SettingsPersonalProfile from "src/screens/settings/SettingsPersonalProfile";
import SettingsSecurity from "src/screens/settings/SettingsSecurity";
import SettingsTermsAndConditions from "src/screens/settings/SettingsTermsAndConditions";

import MerchantTabs from "src/screens/dashboard/MerchantTabs";

import CashierDashboard from "src/screens/dashboard/CashierDashboard";
import CashierHelp from "src/screens/cashier/CashierHelp";
import CashierRequest from "src/screens/cashier/CashierRequest";
import CashierTransactions from "src/screens/cashier/CashierTransactions";
import CashierPaymentSuccess from "src/screens/cashier/CashierPaymentSuccess";
import Report from "src/screens/report/Report";
import ReportSuccess from "src/screens/report/ReportSuccess";

import * as Routes from './constants';

const PrimaryStack = createStackNavigator();

const PrimaryStackScreen = () => {
  const { authStatus } = useContext(AuthContext)

  return (
		<PrimaryStack.Navigator
			screenOptions={() => ({
				headerShown: false,
			})}>
			{authStatus === AuthStatus.SignedOut ? (
				<>
					<PrimaryStack.Screen name={Routes.TEASER} component={Teaser} />
					<PrimaryStack.Screen name={Routes.LOGIN} component={Login} />
					<PrimaryStack.Screen
						name={Routes.CREATE_ACCOUNT}
						component={CreateAccount}
					/>
					<PrimaryStack.Screen name={Routes.PASSWORD} component={Password} />
					{/* <PrimaryStack.Screen
						name='ConfirmPassword'
						component={PasswordConfirm}
					/> */}
					<PrimaryStack.Screen
						name={Routes.VERIFICATION}
						component={Verification}
					/>
					<PrimaryStack.Screen
						name={Routes.VERIFICATION_HELP}
						component={VerificationHelp}
					/>
					{/* <PrimaryStack.Screen name={'TouchId'} component={TouchId} /> */}
					<PrimaryStack.Screen
						name={Routes.PERSONAL_PROFILE}
						component={PersonalProfile}
					/>
					<PrimaryStack.Screen
						name={Routes.PERSONAL_DETAILS}
						component={PersonalDetails}
					/>
					<PrimaryStack.Screen
						name={Routes.PERSONAL_ADDRESS}
						component={PersonalAddress}
					/>
					<PrimaryStack.Screen
						name={Routes.TERMS_EMAIL}
						component={TermsEmail}
					/>
					<PrimaryStack.Screen
						name={Routes.CONFIRM_EMAIL}
						component={ConfirmEmail}
					/>
					<PrimaryStack.Screen
						name={Routes.EMAIL_CONFIRMED}
						component={EmailConfirmed}
					/>
					<PrimaryStack.Screen
						name={Routes.FORGOT_PASSWORD}
						component={ForgotPasswordNavigator}
					/>
				</>
			) : (
				<>

					<PrimaryStack.Screen name={Routes.TABS} component={Tabs} />
					<PrimaryStack.Screen
						name={Routes.QRCODE_SCAN}
						component={QRCodeScan}
					/>
					<PrimaryStack.Screen
						name={Routes.PAYMENT_PENDING}
						component={PaymentPending}
					/>
					<PrimaryStack.Screen
						name={Routes.PAYMENT_SUCCESS}
						component={PaymentSuccess}
					/>
					{/* <PrimaryStack.Screen
						name='PaymentRequest'
						component={Request}
					/> */}
					<PrimaryStack.Screen
						name={Routes.CASHOUT}
						component={CashoutNavigator}
					/>
					<PrimaryStack.Screen name={Routes.LOAD_UP} component={LoadUp} />
					<PrimaryStack.Screen
						name={Routes.LOADUP_SUCCESS}
						component={LoadUpSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.SETTING_TERMS_CONDITIONS}
						component={SettingsTermsAndConditions}
					/>
					<PrimaryStack.Screen
						name={Routes.SETTING_PERSONAL_PROFILE}
						component={SettingsPersonalProfile}
					/>
					<PrimaryStack.Screen
						name={Routes.SETTING_SECURITY}
						component={SettingsSecurity}
					/>
					<PrimaryStack.Screen
						name={Routes.SETTING_BANK_ACCOUNT}
						component={SettingsBankAccount}
					/>
					<PrimaryStack.Screen
						name={Routes.SETTING_DELETE_ACCOUNT}
						component={SettingsDeleteAccount}
					/>
					<PrimaryStack.Screen
						name={Routes.SELECT_ACCOUNT_TYPE}
						component={SelectAccountType}
					/>
					<PrimaryStack.Screen
						name={Routes.LINK_BANK_ACCOUNT}
						component={LinkBankAccount}
					/>
					<PrimaryStack.Screen
						name={Routes.SELECT_BANK}
						component={SelectBank}
					/>
					<PrimaryStack.Screen
						name={Routes.LOGIN_BANK}
						component={LoginToBank}
					/>
					<PrimaryStack.Screen
						name={Routes.SELECT_BANK_ACCOUNT}
						component={SelectBankAccount}
					/>
					<PrimaryStack.Screen
						name={Routes.BANK_LINK_SUCCESS}
						component={BankLinkSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.SIGNUP_BUSINESS}
						component={SignupBusinessNavigator}
					/>

					<PrimaryStack.Screen
						name={Routes.MERCHANT_TABS}
						component={MerchantTabs}
					/>

					<PrimaryStack.Screen
						name={Routes.CASHIER_DASHBOARD}
						component={CashierDashboard}
					/>
					<PrimaryStack.Screen
						name={Routes.CASHIER_HELP}
						component={CashierHelp}
					/>
					<PrimaryStack.Screen
						name={Routes.CASHIER_REQUEST}
						component={CashierRequest}
					/>
					<PrimaryStack.Screen
						name={Routes.CASHIER_TRANSACTIONS}
						component={CashierTransactions}
					/>
					<PrimaryStack.Screen
						name={Routes.CASHIER_PAYMENT_SUCCESS}
						component={CashierPaymentSuccess}
					/>

					<PrimaryStack.Screen
						name={Routes.REPORT}
						component={Report}
					/>
					<PrimaryStack.Screen
						name={Routes.REPORT_SUCCESS}
						component={ReportSuccess}
					/>
				</>
			)}
		</PrimaryStack.Navigator>
  );
}

export const MainNavigationStack = (): JSX.Element => {
  const { update } = useRouteTracking();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      }}
    >
      <PrimaryStackScreen />
    </NavigationContainer>
  );
};
