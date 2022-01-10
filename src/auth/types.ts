import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import { BaseUser } from "src/api/types";

export interface CognitoCustomerAttributesUpdate {
  avatar?: string;
  tag: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  firstName?: string;
  lastName?: string;
}

/**Customer */
export interface CognitoCustomerAttributes {
  avatar: string;
  tag: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  firstName: string;
  lastName: string;
}

/**Business Update*/
export interface CognitoBusinessUpdateAttributes {
  story?: string;
  tag?: string;
  avatar?: string;
  type?: string;
  industry?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phoneNumber?: string;
}

/**Business */
export interface CognitoBusinessAttributes {
  story: string;
  tag: string;
  avatar: string;
  type: string;
  rbn: string;
  industry: string;
  ein: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber?: string;
  owner: BaseUser;
}

export interface CognitoCustomerDwollaAttributes {
  dwollaId?: string;
  resourceUri?: string;
}
export interface CustomerBasicVerification {
  avatar: string;
  tag: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  type: string;
  dwollaId?: string;
  resourceUri?: string;
}

export interface BusinessBasicVerification {
  story: string;
  tag: string;
  avatar: string;
  type: string;
  owner: {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
  };
  registeredBusinessName: string;
  website?: string;
  industry: string;
  ein: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber?: string;
  dwollaId?: string;
  resourceUri?: string;
}

export interface DwollaInfo {
  dwollaId: string;
  resourceUri: string;
}

/**Shared Update attributes input between Customer and Business */
export interface UpdateUserAttributesInput {
  user: CognitoUser;
  update: CognitoCustomerAttributes | CognitoBusinessAttributes;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ConfirmEmailVerificationCodeInput {
  code: string;
}

export enum UserType {
  NotVerified = "notVerfied",
  Customer = "customer",
  Business = "business",
  Cashier = "cashier"
}

export enum AuthStatus {
  Loading,
  SignedIn,
  SignedOut
}

export interface Session {
  username?: string;
  email?: string;
  sub?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface ForgotPassword {
  email: string;
  verificationCode: string;
  newPassword: string;
}

export interface IAuth {
  forgotPasswordDetails: ForgotPassword;
  setForgotPasswordDetails: any;
  userEmail: string;
  startForgotPasswordFlow: () => Promise<BaseResponse<unknown>>;
  completeForgotPasswordFlow: () => Promise<BaseResponse<unknown>>;
  resendEmailVerificationCode: any;
  authStatus: AuthStatus;
  signIn: (
    email?: string,
    password?: string
  ) => Promise<BaseResponse<CognitoUserSession>>;
  setSignInDetails: any;
  signInDetails: { password: string; email: string };
  signOut: any;
  signUpDetails: any;
  updateSignUpDetails: (i: Partial<SignUpInput>) => void;
  emailVerification: any;
  signUp: any;
  changePassword: any;
}

//@ts-ignore
export const defaultState: IAuth = {
  authStatus: AuthStatus.Loading,
  signInDetails: { password: "", email: "" },
  setSignInDetails: () => {
    console.log("setSigninDetails is not loaded yet");
  }
};

export type CognitoError = any;

export type BaseResponse<T> = { success: boolean; data?: T; error?: string };

export const CognitoResponse = Promise;
export type CognitoResponse<T> = Promise<BaseResponse<T>>;

export interface StartForgotPasswordInput {
  email: string;
}

export interface CompleteForgotPasswordInput {
  email: string;
  verificationCode: string;
  newPassword: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}
