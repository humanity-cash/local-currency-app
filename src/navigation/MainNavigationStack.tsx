import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import "react-native-gesture-handler";
import { AuthContext } from "src/auth";
import { AuthStatus, UserType } from "src/auth/types";
import { useRouteTracking } from "src/hooks";
import { CashoutNavigator } from "src/navigation/CashoutNavigator";
import { ForgotPasswordNavigator } from "src/navigation/ForgotPasswordStack";
import { BusinessBankAccountNavigator } from "src/navigation/BusinessBankAccountNavigator";
import { SignupBusinessNavigator } from "src/navigation/SignupBusinessNavigator";
import Login from "src/screens/authentication/Login";
import CashierHelp from "src/screens/cashier/CashierHelp";
import CashierHowToWork from "src/screens/cashier/CashierHowToWork";
import CashierPaymentPending from "src/screens/cashier/CashierPaymentPending";
import CashierRequest from "src/screens/cashier/CashierRequest";
import CashierRequestSuccess from "src/screens/cashier/CashierRequestSuccess";
import CashierReturn from "src/screens/cashier/CashierReturn";
import CashierReturnQRCodeScan from "src/screens/cashier/CashierReturnQRCodeScan";
import CashierReturnSuccess from "src/screens/cashier/CashierReturnSuccess";
import CashierTransactions from "src/screens/cashier/CashierTransactions";
import CashierDashboard from "src/screens/dashboard/CashierDashboard";
import BusinessTabs from "src/screens/dashboard/BusinessTabs";
import Tabs from "src/screens/dashboard/Tabs";
import BusinessCashoutPassword from "src/screens/businessCashout/BusinessCashoutPassword";
import BusinessRedemptionInProgress from "src/screens/businessCashout/BusinessRedemptionInProgress";
import BusinessLoadupPending from "src/screens/businessLoadup/BusinessLoadupPending";
import BusinessLoadupSuccess from "src/screens/businessLoadup/BusinessLoadupSuccess";
import BusinessPaymentPending from "src/screens/businessPayment/BusinessPaymentPending";
import BusinessPaymentSuccess from "src/screens/businessPayment/BusinessPaymentSuccess";
import BusinessReturn from "src/screens/businessPayment/BusinessReturn";
import BusinessPayoutPending from "src/screens/businessPayout/BusinessPayoutPending";
import BusinessPayoutQRCodeScan from "src/screens/businessPayout/BusinessPayoutQRCodeScan";
import BusinessPayoutSuccess from "src/screens/businessPayout/BusinessPayoutSuccess";
import BusinessPayoutToClient from "src/screens/businessPayout/BusinessPayoutToClient";
import BusinessPayoutToSomeone from "src/screens/businessPayout/BusinessPayoutToSomeone";
import BusinessSettingsProfile from "src/screens/businessSettings/BusinessSettingsProfile";
import BusinessSettingsBankAccount from "src/screens/businessSettings/BusinessSettingsBankAccount";
import BusinessSettingsStaticQr from "src/screens/businessSettings/BusinessSettingsStaticQr";
import BusinessSettingsTermsAndConditions from "src/screens/businessSettings/BusinessSettingsTermsAndConditions";
import BusinessSettingsSecurity from "src/screens/businessSettings/BusinessSettingsSecurity";
import ConfirmEmail from "src/screens/onboarding/ConfirmEmail";
import CreateAccount from "src/screens/onboarding/CreateAccount";
import EmailConfirmed from "src/screens/onboarding/EmailConfirmed";
import LinkBankAccount from "src/screens/onboarding/LinkBankAccount";
import LoadUp from "src/screens/onboarding/LoadUp";
import LoadUpSuccess from "src/screens/onboarding/LoadUpSuccess";
import Password from "src/screens/onboarding/Password";
import ClientAddress from "src/screens/onboarding/ClientAddress";
import ClientDetails from "src/screens/onboarding/ClientDetails";
import ClientProfile from "src/screens/onboarding/ClientProfile";
import SelectAccountType from "src/screens/onboarding/SelectAccountType";
import SelectBank from "src/screens/onboarding/SelectBank";
import Teaser from "src/screens/onboarding/Teaser";
import Verification from "src/screens/onboarding/Verification";
import VerificationHelp from "src/screens/onboarding/VerificationHelp";
import PaymentPending from "src/screens/payment/PaymentPending";
import PaymentRequest from "src/screens/payment/PaymentRequest";
import PaymentSuccess from "src/screens/payment/PaymentSuccess";
import QRCodeScan from "src/screens/payment/QRCodeScan";
import Report from "src/screens/report/Report";
import ReportSuccess from "src/screens/report/ReportSuccess";
import SettingsBankAccount from "src/screens/settings/SettingsBankAccount";
import SettingsDeleteAccount from "src/screens/settings/SettingsDeleteAccount";
import SettingsClientProfile from "src/screens/settings/SettingsClientProfile";
import SettingsSecurity from "src/screens/settings/SettingsSecurity";
import SettingsTermsAndConditions from "src/screens/settings/SettingsTermsAndConditions";
import * as Routes from "./constants";
import PaymentReceiveAmount from '../screens/payment/PaymentReceiveAmount';

const PrimaryStack = createStackNavigator();

const PrimaryStackScreen = () => {
	const {
		authStatus,
		userType,
		completedCustomerVerification,
		completedBusinessVerification,
	} = useContext(AuthContext);

	return (
		<PrimaryStack.Navigator
			screenOptions={() => ({
				headerShown: false,
			})}>
			{authStatus === AuthStatus.SignedOut ||
			authStatus === AuthStatus.Loading ? (
				<>
					<PrimaryStack.Screen
						name={Routes.TEASER}
						component={Teaser}
					/>
					<PrimaryStack.Screen
						name={Routes.LOGIN}
						component={Login}
					/>
					<PrimaryStack.Screen
						name={Routes.CREATE_ACCOUNT}
						component={CreateAccount}
					/>
					<PrimaryStack.Screen
						name={Routes.PASSWORD}
						component={Password}
					/>
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
			) : authStatus === AuthStatus.SignedIn &&
			  userType === UserType.Customer &&
			  completedCustomerVerification ? (
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
						name={Routes.PAYMENT_RECEIVE_AMOUNT}
						component={PaymentReceiveAmount}
					/>
					<PrimaryStack.Screen
						name={Routes.PAYMENT_SUCCESS}
						component={PaymentSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.PAYMENT_REQUEST}
						component={PaymentRequest}
					/>
					<PrimaryStack.Screen
						name={Routes.CASHOUT}
						component={CashoutNavigator}
					/>
					<PrimaryStack.Screen
						name={Routes.LOAD_UP}
						component={LoadUp}
					/>
					<PrimaryStack.Screen
						name={Routes.LOADUP_SUCCESS}
						component={LoadUpSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.SETTING_TERMS_CONDITIONS}
						component={SettingsTermsAndConditions}
					/>
					<PrimaryStack.Screen
						name={Routes.SETTING_CLIENT_PROFILE}
						component={SettingsClientProfile}
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
						name={Routes.LINK_BANK_ACCOUNT}
						component={LinkBankAccount}
					/>
					<PrimaryStack.Screen
						name={Routes.SELECT_BANK}
						component={SelectBank}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_BANK_ACCOUNT}
						component={BusinessBankAccountNavigator}
					/>
					{!completedBusinessVerification && (
						<PrimaryStack.Screen
							name={Routes.SIGNUP_BUSINESS}
							component={SignupBusinessNavigator}
						/>
					)}
				</>
			) : authStatus === AuthStatus.SignedIn &&
			  userType === UserType.Cashier &&
			  completedBusinessVerification ? (
				/** Cahsier screens */
				<>
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
						name={Routes.CASHIER_REQUEST_SUCCESS}
						component={CashierRequestSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.CASHIER_RETURN_QRCODE_SCAN}
						component={CashierReturnQRCodeScan}
					/>
					<PrimaryStack.Screen
						name={Routes.CASHIER_RETURN}
						component={CashierReturn}
					/>
					<PrimaryStack.Screen
						name={Routes.CASHIER_HOW_TO_WORK}
						component={CashierHowToWork}
					/>
					<PrimaryStack.Screen
						name={Routes.CASHIER_PAYMENT_PENDING}
						component={CashierPaymentPending}
					/>
					<PrimaryStack.Screen
						name={Routes.CASHIER_RETURN_SUCCESS}
						component={CashierReturnSuccess}
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
			) : authStatus === AuthStatus.SignedIn &&
			  userType === UserType.Business &&
			  completedBusinessVerification ? (
				<>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_TABS}
						component={BusinessTabs}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_PAYMENT_PENDING}
						component={BusinessPaymentPending}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_PAYMENT_SUCCESS}
						component={BusinessPaymentSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_RETURN}
						component={BusinessReturn}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_LOADUP_PENDING}
						component={BusinessLoadupPending}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_LOADUP_SUCCESS}
						component={BusinessLoadupSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_PAYOUT_CLIENT}
						component={BusinessPayoutToClient}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_PAYOUT_SOMEONE}
						component={BusinessPayoutToSomeone}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_PAYOUT_PENDING}
						component={BusinessPayoutPending}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_PAYOUT_SUCCESS}
						component={BusinessPayoutSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.PAYMENT_RECEIVE_AMOUNT}
						component={PaymentReceiveAmount}
					/>
					<PrimaryStack.Screen
						name={Routes.PAYMENT_SUCCESS}
						component={PaymentSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_PAYOUT_QR_SCAN}
						component={BusinessPayoutQRCodeScan}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_CASHOUT_PASSWORD}
						component={BusinessCashoutPassword}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_REDEMPTION_IN_PROGRESS}
						component={BusinessRedemptionInProgress}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_BANK_ACCOUNT}
						component={BusinessBankAccountNavigator}
					/>
					<PrimaryStack.Screen
						name={Routes.REPORT_SUCCESS}
						component={ReportSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_SETTINGS_PROFILE}
						component={BusinessSettingsProfile}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_SETTINGS_BANK_ACCOUNT}
						component={BusinessSettingsBankAccount}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_SETTINGS_STATIC_QR}
						component={BusinessSettingsStaticQr}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_SETTINGS_LEGAL}
						component={BusinessSettingsTermsAndConditions}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_SETTINGS_SECURITY}
						component={BusinessSettingsSecurity}
					/>
					{!completedCustomerVerification && (
						<>
							<PrimaryStack.Screen
								name={Routes.CLIENT_PROFILE}
								component={ClientProfile}
							/>
							<PrimaryStack.Screen
								name={Routes.CLIENT_DETAILS}
								component={ClientDetails}
							/>
							<PrimaryStack.Screen
								name={Routes.CLIENT_ADDRESS}
								component={ClientAddress}
							/>
						</>
					)}
				</>
			) : !completedBusinessVerification &&
			  !completedCustomerVerification ? (
				// Not Verified
				<>
					<PrimaryStack.Screen
						name={Routes.SELECT_ACCOUNT_TYPE}
						component={SelectAccountType}
					/>
					<PrimaryStack.Screen
						name={Routes.CLIENT_PROFILE}
						component={ClientProfile}
					/>
					<PrimaryStack.Screen
						name={Routes.CLIENT_DETAILS}
						component={ClientDetails}
					/>
					<PrimaryStack.Screen
						name={Routes.CLIENT_ADDRESS}
						component={ClientAddress}
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
						name={Routes.SIGNUP_BUSINESS}
						component={SignupBusinessNavigator}
					/>
					<PrimaryStack.Screen
						name={Routes.BUSINESS_BANK_ACCOUNT}
						component={BusinessBankAccountNavigator}
					/>
				</>
			) : (
				<>
					<PrimaryStack.Screen
						name={Routes.TEASER}
						component={Teaser}
					/>
					<PrimaryStack.Screen
						name={Routes.SELECT_BANK}
						component={SelectBank}
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
