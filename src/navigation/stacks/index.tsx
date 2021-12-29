import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import "react-native-gesture-handler";
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
import CashierDashboard from "src/screens/cashier/dashboard";
import BusinessDrawer from "src/screens/business/drawer";
import CustomerDrawer from "src/screens/customer/drawer";
import MerchantReturn from "src/screens/business/payment/MerchantReturn";
import MerchantPayoutPending from "src/screens/business/drawer/sendToSomeone/MerchantPayoutPending";
import MerchantPayoutSuccess from "src/screens/business/drawer/sendToSomeone/MerchantPayoutSuccess";
import MerchantPayoutToPersonal from "src/screens/business/drawer/sendToSomeone/MerchantPayoutToPersonal";
import MerchantPayoutToSomeone from "src/screens/business/drawer/sendToSomeone/MerchantPayoutToSomeone";
import MerchantSettingsBankAccount from "src/screens/business/drawer/settings/MerchantSettingsBankAccount";
import MerchantSettingsProfile from "src/screens/business/drawer/settings/MerchantSettingsProfile";
import MerchantSettingsSecurity from "src/screens/business/drawer/settings/MerchantSettingsSecurity";
import MerchantSettingsStaticQr from "src/screens/business/drawer/settings/MerchantSettingsStaticQr";
import MerchantSettingsTermsAndConditions from "src/screens/business/drawer/settings/MerchantSettingsTermsAndConditions";
import ConfirmEmail from "src/screens/onboarding/ConfirmEmail";
import CreateAccount from "src/screens/onboarding/CreateAccount";
import EmailConfirmed from "src/screens/onboarding/EmailConfirmed";
import CustomerWelcome from "src/screens/customer/signup/CustomerWelcome";
import { LoadUpSuccess } from "src/views";
import Password from "src/screens/onboarding/Password";
import PersonalAddress from "src/screens/customer/signup/PersonalAddress";
import PersonalDetails from "src/screens/customer/signup/PersonalDetails";
import PersonalProfile from "src/screens/customer/signup/PersonalProfile";
import SelectAccountType from "src/screens/onboarding/SelectAccountType";
import SelectBank from "src/screens/customer/bank";
import Teaser from "src/screens/onboarding/Teaser";
import Verification from "src/screens/onboarding/Verification";
import VerificationHelp from "src/screens/onboarding/VerificationHelp";
import PaymentRequest from "src/screens/customer/payment/PaymentRequest";
import PaymentSuccess from "src/screens/customer/payment/PaymentSuccess";
import Report from "src/screens/report/Report";
import ReportSuccess from "src/screens/report/ReportSuccess";
import SettingsBankAccount from "src/screens/customer/drawer/settings/SettingsBankAccount";
import SettingsDeleteAccount from "src/screens/customer/drawer/settings/SettingsDeleteAccount";
import SettingsPersonalProfile from "src/screens/customer/drawer/settings/SettingsPersonalProfile";
import SettingsSecurity from "src/screens/customer/drawer/settings/SettingsSecurity";
import SettingsTermsAndConditions from "src/screens/customer/drawer/settings/SettingsTermsAndConditions";
import * as Routes from "../constants";
import SelectMerchantBank from "src/screens/business/bank";
import BusinessWelcome from "src/screens/business/signup/BusinessWelcome";
import CustomerTransactions from "src/screens/customer/transactions";
import { PaymentsModule } from "src/modules";

const PrimaryStack = createStackNavigator();

export const CustomerUserStack = ({ isVerifiedBusiness }: { isVerifiedBusiness: boolean }) => {
	return (
		<>
			<PrimaryStack.Screen name={Routes.TABS} component={CustomerDrawer} />
			<PrimaryStack.Screen
				name={Routes.QRCODE_SCAN}
				component={PaymentsModule.Send}
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
				name={Routes.LOADUP_SUCCESS}
				component={LoadUpSuccess}
			/>
			<PrimaryStack.Screen
				name={Routes.LOAD_UP}
				component={PaymentsModule.Loadup}
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
			name={Routes.MY_TRANSACTIONS}
			component={CustomerTransactions}
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
				name={Routes.SELECT_BANK}
				component={SelectBank}
			/>
			{!isVerifiedBusiness && (
				<PrimaryStack.Screen
					name={Routes.SIGNUP_BUSINESS}
					component={SignupBusinessNavigator}
				/>
			)}
		</>
	)
}

export const OnboardingStack = () => {

	return (
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
			<PrimaryStack.Screen
				name={Routes.VERIFICATION}
				component={Verification}
			/>
			<PrimaryStack.Screen
				name={Routes.VERIFICATION_HELP}
				component={VerificationHelp}
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
				name={Routes.LINK_BANK_ACCOUNT}
				component={CustomerWelcome}
			/>
			<PrimaryStack.Screen
				name={Routes.SELECT_BANK}
				component={SelectBank}
			/>
			<PrimaryStack.Screen
				name={Routes.FORGOT_PASSWORD}
				component={ForgotPasswordNavigator}
			/>
		</>
	)
}

export const CashierUserStack = () => {

	return (
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
	)
}

export const BusinessUserStack = ({ isVerifiedCustomer }: { isVerifiedCustomer: boolean}) => {

	return (
		<>
			<PrimaryStack.Screen
				name={Routes.MERCHANT_TABS}
				component={BusinessDrawer}
			/>
			<PrimaryStack.Screen
				name={Routes.PAYMENT_FAILED}
				component={PaymentSuccess}
			/>
			<PrimaryStack.Screen
				name={Routes.PAYMENT_SUCCESS}
				component={PaymentSuccess}
			/>
			<PrimaryStack.Screen
				name={Routes.MERCHANT_RETURN}
				component={MerchantReturn}
			/>
			<PrimaryStack.Screen
				name={Routes.CASHOUT}
				component={CashoutNavigator}
			/>
			<PrimaryStack.Screen
				name={Routes.LOADUP_SUCCESS}
				component={LoadUpSuccess}
			/>
			<PrimaryStack.Screen
				name={Routes.LOAD_UP}
				component={PaymentsModule.Loadup}
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
				name={Routes.MERCHANT_PAYOUT_QR_SCAN}
				component={PaymentsModule.SendFixedAmount}
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
			<PrimaryStack.Screen
				name={Routes.SETTING_BANK_ACCOUNT}
				component={SettingsBankAccount}
			/>
			<PrimaryStack.Screen
				name={Routes.SETTING_DELETE_ACCOUNT}
				component={SettingsDeleteAccount}
			/>
			<PrimaryStack.Screen
				name={Routes.SELECT_MERCHANT_BANK_ACCOUNT}
				component={SelectMerchantBank}
			/>
			{!isVerifiedCustomer && (
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
	)
}

export const NotVerifiedUserStack = () => {

	return (
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
				component={CustomerWelcome}
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
	)
}

export const CustomerLinkBankAccount = () => {

	return (
		<>
			<PrimaryStack.Screen
				name={Routes.LINK_BANK_ACCOUNT}
				component={CustomerWelcome}
			/>
			<PrimaryStack.Screen
				name={Routes.SELECT_BANK}
				component={SelectBank}
			/>
		</>
	)
}

export const BusinessLinkBankAccount = () => {

	return (
		<>
			<PrimaryStack.Screen
				name={Routes.BUSINESS_WELCOME}
				component={BusinessWelcome}
			/>
			<PrimaryStack.Screen
				name={Routes.MERCHANT_BANK_ACCOUNT}
				component={SelectMerchantBank}
			/>
		</>
	)
}




{/* <PrimaryStack.Screen name={'TouchId'} component={TouchId} /> */}

{/* <PrimaryStack.Screen
			name='ConfirmPassword'
			component={PasswordConfirm}
		/> */}