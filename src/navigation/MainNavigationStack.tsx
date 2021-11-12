import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import "react-native-gesture-handler";
import { AuthContext } from "src/auth";
import { AuthStatus, UserType } from "src/auth/types";
import { useRouteTracking } from "src/hooks";
import { CashoutNavigator } from "src/navigation/CashoutNavigator";
import { ForgotPasswordNavigator } from "src/navigation/ForgotPasswordStack";
import { MerchantBankAccountNavigator } from "src/navigation/MerchantBankAccountNavigator";
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
import MerchantTabs from "src/screens/dashboard/MerchantTabs";
import Tabs from "src/screens/dashboard/Tabs";
import MerchantCashoutPassword from "src/screens/merchantCashout/MerchantCashoutPassword";
import MerchantRedemptionInProgress from "src/screens/merchantCashout/MerchantRedemptionInProgress";
import MerchantLoadupPending from "src/screens/merchantLoadup/MerchantLoadupPending";
import MerchantLoadupSuccess from "src/screens/merchantLoadup/MerchantLoadupSuccess";
import MerchantPaymentPending from "src/screens/merchantPayment/MerchantPaymentPending";
import MerchantPaymentSuccess from "src/screens/merchantPayment/MerchantPaymentSuccess";
import MerchantReturn from "src/screens/merchantPayment/MerchantReturn";
import MerchantPayoutPending from "src/screens/merchantPayout/MerchantPayoutPending";
import MerchantPayoutQRCodeScan from "src/screens/merchantPayout/MerchantPayoutQRCodeScan";
import MerchantPayoutSuccess from "src/screens/merchantPayout/MerchantPayoutSuccess";
import MerchantPayoutToPersonal from "src/screens/merchantPayout/MerchantPayoutToPersonal";
import MerchantPayoutToSomeone from "src/screens/merchantPayout/MerchantPayoutToSomeone";
import MerchantSettingsProfile from "src/screens/merchantSettings/MerchantSettingsProfile";
import MerchantSettingsBankAccount from "src/screens/merchantSettings/MerchantSettingsBankAccount";
import MerchantSettingsStaticQr from "src/screens/merchantSettings/MerchantSettingsStaticQr";
import MerchantSettingsTermsAndConditions from "src/screens/merchantSettings/MerchantSettingsTermsAndConditions";
import MerchantSettingsSecurity from "src/screens/merchantSettings/MerchantSettingsSecurity";
import ConfirmEmail from "src/screens/onboarding/ConfirmEmail";
import CreateAccount from "src/screens/onboarding/CreateAccount";
import EmailConfirmed from "src/screens/onboarding/EmailConfirmed";
import LinkBankAccount from "src/screens/onboarding/LinkBankAccount";
import LoadUp from "src/screens/onboarding/LoadUp";
import LoadUpSuccess from "src/screens/onboarding/LoadUpSuccess";
import Password from "src/screens/onboarding/Password";
import PersonalAddress from "src/screens/onboarding/PersonalAddress";
import PersonalDetails from "src/screens/onboarding/PersonalDetails";
import PersonalProfile from "src/screens/onboarding/PersonalProfile";
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
import SettingsPersonalProfile from "src/screens/settings/SettingsPersonalProfile";
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
						name={Routes.LINK_BANK_ACCOUNT}
						component={LinkBankAccount}
					/>
					<PrimaryStack.Screen
						name={Routes.SELECT_BANK}
						component={SelectBank}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_BANK_ACCOUNT}
						component={MerchantBankAccountNavigator}
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
						name={Routes.MERCHANT_TABS}
						component={MerchantTabs}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_PAYMENT_PENDING}
						component={MerchantPaymentPending}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_PAYMENT_SUCCESS}
						component={MerchantPaymentSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_RETURN}
						component={MerchantReturn}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_LOADUP_PENDING}
						component={MerchantLoadupPending}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_LOADUP_SUCCESS}
						component={MerchantLoadupSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_PAYOUT_PERSONAL}
						component={MerchantPayoutToPersonal}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_PAYOUT_SOMEONE}
						component={MerchantPayoutToSomeone}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_PAYOUT_PENDING}
						component={MerchantPayoutPending}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_PAYOUT_SUCCESS}
						component={MerchantPayoutSuccess}
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
						name={Routes.MERCHANT_PAYOUT_QR_SCAN}
						component={MerchantPayoutQRCodeScan}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_CASHOUT_PASSWORD}
						component={MerchantCashoutPassword}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_REDEMPTION_IN_PROGRESS}
						component={MerchantRedemptionInProgress}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_BANK_ACCOUNT}
						component={MerchantBankAccountNavigator}
					/>
					<PrimaryStack.Screen
						name={Routes.REPORT_SUCCESS}
						component={ReportSuccess}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_SETTINGS_PROFILE}
						component={MerchantSettingsProfile}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_SETTINGS_BANK_ACCOUNT}
						component={MerchantSettingsBankAccount}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_SETTINGS_STATIC_QR}
						component={MerchantSettingsStaticQr}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_SETTINGS_LEGAL}
						component={MerchantSettingsTermsAndConditions}
					/>
					<PrimaryStack.Screen
						name={Routes.MERCHANT_SETTINGS_SECURITY}
						component={MerchantSettingsSecurity}
					/>
					{!completedCustomerVerification && (
						<>
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
						name={Routes.MERCHANT_BANK_ACCOUNT}
						component={MerchantBankAccountNavigator}
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
