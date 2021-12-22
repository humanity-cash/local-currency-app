import Login from "./authentication/Login";
import Dashboard from "./dashboard/Dashboard";
import Tabs from "./dashboard/Tabs";
import MerchantDictionary from "./merchant/MerchantDictionary";
import ConfirmEmail from "./onboarding/ConfirmEmail";
import CreateAccount from "./onboarding/CreateAccount";
import EmailConfirmed from "./onboarding/EmailConfirmed";
import LinkBankAccount from './onboarding/LinkBankAccount';
import Password from "./onboarding/Password";
import PersonalAddress from "./onboarding/PersonalAddress";
import PersonalDetails from "./onboarding/PersonalDetails";
import SelectAccountType from "./onboarding/SelectAccountType";
import SelectBank from "./onboarding/SelectBank";
import Teaser from "./onboarding/Teaser";
import LoadUp from "./onboarding/LoadUp";
import LoadUpSuccess from "./onboarding/LoadUpSuccess";
import Verification from "./onboarding/Verification";
import VerificationHelp from "./onboarding/VerificationHelp";
import { default as PaymentPending, default as PaymentSuccess } from "./payment/PaymentPending";
import PaymentRequest from "./payment/PaymentRequest";
import QRCodeScan from "./payment/QRCodeScan";

export {
	Teaser, CreateAccount, Verification, VerificationHelp, Password,
	PersonalDetails, PersonalAddress, ConfirmEmail, EmailConfirmed, LoadUp, LoadUpSuccess,
	Login, Dashboard, LinkBankAccount, SelectBank, SelectAccountType, Tabs, QRCodeScan,
	PaymentPending, PaymentSuccess, PaymentRequest, MerchantDictionary
};

