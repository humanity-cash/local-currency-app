// import ConfirmPin from "./authentication/ConfirmPin";
import Login from "./authentication/Login";
import Dashboard from "./dashboard/Dashboard";
import Tabs from "./dashboard/Tabs";
import MerchantDictionary from "./merchant/MerchantDictionary";
import ConfirmEmail from "./onboarding/ConfirmEmail";
import Congratulations from "./onboarding/Congratulations";
import CreateAccount from "./onboarding/CreateAccount";
import CreditCard from "./onboarding/CreditCard";
import Deposit from "./onboarding/Deposit";
import EmailConfirmed from "./onboarding/EmailConfirmed";
import LinkBankAccount from './onboarding/LinkBankAccount';
import LoginToBank from "./onboarding/LoginToBank";
import Passcode from "./onboarding/Passcode";
import Password from "./onboarding/Password";
import PasswordConfirm from "./onboarding/PasswordConfirm";
import PersonalAddress from "./onboarding/PersonalAddress";
import PersonalDetails from "./onboarding/PersonalDetails";
import SelectAccountType from "./onboarding/SelectAccountType";
import SelectBank from "./onboarding/SelectBank";
import SelectBankAccount from "./onboarding/SelectBankAccount";
import SelectPayment from "./onboarding/SelectPayment";
import Teaser from "./onboarding/Teaser";
import TermsEmail from "./onboarding/TermsEmail";
import TopUp from "./onboarding/TopUp";
import TopUpSuccess from "./onboarding/TopUpSuccess";
import TouchId from "./onboarding/TouchId";
import Verification from "./onboarding/Verification";
import VerificationHelp from "./onboarding/VerificationHelp";
import { default as PaymentPending, default as PaymentSuccess } from "./payment/PaymentPending";
import PaymentRequest from "./payment/PaymentRequest";
import QRCodeScan from "./payment/QRCodeScan";

export {
	Teaser, CreateAccount, Verification, VerificationHelp, Password, PasswordConfirm, Passcode, TouchId,
	PersonalDetails, PersonalAddress, TermsEmail, ConfirmEmail, EmailConfirmed, TopUp, TopUpSuccess, SelectPayment,
	Deposit, CreditCard, Login, Dashboard, LinkBankAccount, SelectBank, LoginToBank,
	SelectBankAccount, Congratulations, SelectAccountType, Tabs, QRCodeScan, PaymentPending, PaymentSuccess, PaymentRequest, MerchantDictionary
};

