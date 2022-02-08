import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  ISignUpResult,
} from "amazon-cognito-identity-js";
import {
  BaseResponse,
  ChangePasswordInput,
  CognitoError,
  CognitoResponse,
  CompleteForgotPasswordInput,
  StartForgotPasswordInput,
} from "src/auth/types";
import Translation from "src/translation/en.json";
import { showToast } from "src/utils/common";
import { ToastType } from "src/utils/types";
import { SignInInput } from "./types";
import * as Utils from "./utils";

export const NOT_AUTHENTICATED: BaseResponse<undefined> = {
  success: false,
  error: "noUserAuthenticated"
};

const USERPOOL_ID = "us-west-1_VPieqTZDv";
const CLIENT_ID = "4d7cknh0r1f8mkirvcio1mmmg6";

const poolData = {
  UserPoolId: USERPOOL_ID,
  ClientId: CLIENT_ID,
};

export const userPool = new CognitoUserPool(poolData);
let currentUser: CognitoUser | null = userPool.getCurrentUser();

const getCognitoUser = (email: string): CognitoUser =>
  new CognitoUser({
    Username: email,
    Pool: userPool,
  });

export const getSession = async (): CognitoResponse<
  CognitoUserSession | undefined
> => {
  return new Promise(function (resolve) {
    //@ts-ignore
    userPool?.storage.sync(async function (err, result) {
      if (err) {
        console.log("Cognito: Error syncing to storage", err);
        return resolve({ ...NOT_AUTHENTICATED });
      } else if (result === "SUCCESS") {
        currentUser = userPool.getCurrentUser();
        if (!currentUser) return resolve({ ...NOT_AUTHENTICATED });
        currentUser.getSession(function (
          err: CognitoError,
          session: CognitoUserSession | undefined
        ) {
          if (err || !session?.isValid())
            resolve({ success: false, error: err.code });
          else resolve({ success: true, data: session });
        });
      }
    });
  });
};

export const signUp = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  data: { error: string } | ISignUpResult | undefined;
}> => {
  const attributeList: CognitoUserAttribute[] =
    Utils.buildSignUpAttributeList(email);
  return new Promise((resolve) => {
    userPool.signUp(
      email,
      password,
      attributeList,
      attributeList,
      (err: CognitoError, result: ISignUpResult | undefined) => {
        if (err) {
          showToast(ToastType.ERROR, err.code, err.message);
          resolve({ success: false, data: { error: err.code } });
        } else resolve({ success: true, data: result });
      }
    );
  });
};

export const startForgotPasswordFlow = async ({
  email,
}: StartForgotPasswordInput): CognitoResponse<unknown> => {
  currentUser = getCognitoUser(email);
  return new Promise(function (resolve) {
    if (!currentUser) {
      showToast(
        ToastType.ERROR,
        Translation.NOTIFICATIONS.ERROR,
        Translation.NOTIFICATIONS.EMAIL_NOT_REGISTERED
      );
      resolve({
        success: false,
        data: { error: Translation.NOTIFICATIONS.EMAIL_NOT_REGISTERED },
      });
    } else
      return currentUser.forgotPassword({
        onSuccess: function () {
          resolve({ success: true, data: {} });
        },
        onFailure: function (error: CognitoError) {
          showToast(ToastType.ERROR, error.code, error.message);
          resolve({ success: false, data: { error: error.code } });
        },
      });
  });
};

export const completeForgotPasswordFlow = async ({
  email,
  verificationCode,
  newPassword,
}: CompleteForgotPasswordInput): CognitoResponse<unknown> => {
  currentUser = getCognitoUser(email);
  return new Promise(function (resolve) {
    if (!currentUser) {
      showToast(
        ToastType.ERROR,
        Translation.NOTIFICATIONS.ERROR,
        Translation.NOTIFICATIONS.EMAIL_NOT_REGISTERED
      );
      resolve({
        success: false,
        data: { error: Translation.NOTIFICATIONS.EMAIL_NOT_REGISTERED },
      });
    } else
      return currentUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: function () {
          resolve({ success: true, data: {} });
        },
        onFailure: function (error: CognitoError) {
          showToast(ToastType.ERROR, error.code, error.message);
          resolve({ success: false, data: { error: error.code } });
        },
      });
  });
};

export const signIn = async ({
  email,
  password,
}: SignInInput): CognitoResponse<CognitoUserSession> => {
  currentUser = getCognitoUser(email);
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });
  return new Promise(function (resolve) {
    if (!currentUser) {
      showToast(
        ToastType.ERROR,
        Translation.NOTIFICATIONS.ERROR,
        Translation.NOTIFICATIONS.EMAIL_NOT_REGISTERED
      );
      resolve({
        success: false,
        error: Translation.NOTIFICATIONS.EMAIL_NOT_REGISTERED,
      });
    } else
      return currentUser.authenticateUser(authenticationDetails, {
        onSuccess: async function (response: CognitoUserSession) {
          resolve({ success: true, data: response });
        },
        onFailure: function (error: CognitoError) {
          if (error.code !== "UserNotConfirmedException") {
            showToast(ToastType.ERROR, error.code, error.message);
          }
          resolve({ success: false, error: error.code });
        },
      });
  });
};

export const signOut = (): void => currentUser?.signOut();

export const confirmEmailVerificationCode = async (
  email: string,
  code: string
): CognitoResponse<unknown> => {
  const cognitoUser = getCognitoUser(email);
  return new Promise((resolve) => {
    if (!cognitoUser) return resolve(NOT_AUTHENTICATED);
    cognitoUser.confirmRegistration(code, true, (err: CognitoError, result) => {
      if (err) {
        showToast(ToastType.ERROR, err.code, err.message);
        resolve({ success: false, data: { error: err.code } });
      } else resolve({ success: true, data: result });
    });
  });
};

export const resendEmailVerificationCode = async (
  email: string
): CognitoResponse<unknown> => {
  const cognitoUser = getCognitoUser(email);
  return new Promise((resolve) => {
    cognitoUser.resendConfirmationCode(function (err) {
      if (err) resolve({ success: false, data: {} });
      else resolve({ success: true, data: {} });
    });
  });
};

export const getAttributes = async (): CognitoResponse<
  CognitoUserAttribute[] | undefined
> => {
  return new Promise((resolve) => {
    if (!currentUser) resolve(NOT_AUTHENTICATED);
    else
      currentUser.getUserAttributes(
        (error: CognitoError, result: CognitoUserAttribute[] | undefined) => {
          if (error) resolve({ success: false, error: error.code });
          else resolve({ success: true, data: result });
        }
      );
  });
};

export const deleteUser = async (): CognitoResponse<string | undefined> => {
  return new Promise((resolve) => {
    if (!currentUser) return resolve(NOT_AUTHENTICATED);
    else
      currentUser.deleteUser(
        (err: CognitoError, result: string | undefined) => {
          if (err) resolve({ success: false, error: err.code });
          else resolve({ success: true, data: result });
        }
      );
  });
};

export const changePassword = async ({
  oldPassword,
  newPassword,
}: ChangePasswordInput): CognitoResponse<unknown> => {
  return new Promise(function (resolve) {
    if (!currentUser) {
      showToast(
        ToastType.ERROR,
        Translation.NOTIFICATIONS.ERROR,
        Translation.NOTIFICATIONS.EMAIL_NOT_REGISTERED
      );
      resolve({
        success: false,
        data: { error: Translation.NOTIFICATIONS.EMAIL_NOT_REGISTERED },
      });
    } else
      return currentUser.changePassword(
        oldPassword,
        newPassword,
        function (err) {
          if (err) resolve({ success: false, data: {} });
          else resolve({ success: true, data: {} });
        }
      );
  });
};
