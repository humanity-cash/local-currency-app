import { CognitoUserSession } from "amazon-cognito-identity-js";
import React, { useContext, useEffect, useState } from "react";
import { UserAPI } from "src/api";
import * as userController from "src/auth/cognito";
import { signInInitialState, signUpInitialState } from "src/auth/consts";
import {
  getLatestSelectedAccountType,
  saveTokenToLocalStorage,
} from "src/auth/localStorage";
import {
  AuthStatus,
  BaseResponse,
  ChangePasswordInput,
  defaultState,
  ForgotPassword,
  IAuth,
  SignUpInput,
  UserType,
} from "src/auth/types";
import { NavigationViewContext, ViewState } from "./navigation";
import { UserContext } from "./user";

export const AuthContext = React.createContext(defaultState);

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);
  const { updateUserData, updateUserType } = useContext(UserContext);
  const { updateSelectedView } = useContext(NavigationViewContext);
  const [userEmail, setUserEmail] = useState<string>("");
  const [signInDetails, setSignInDetails] = useState(signInInitialState);
  const [signUpDetails, setSignUpDetails] =
    useState<SignUpInput>(signUpInitialState);

  const [forgotPasswordDetails, setForgotPasswordDetails] =
    useState<ForgotPassword>({
      email: "",
      verificationCode: "",
      newPassword: "",
    });

  const updateAuthStatus = async (newStatus: AuthStatus) => {
    setAuthStatus(newStatus);
  };

  const updateSignUpDetails = (i: Partial<SignUpInput>): void => {
    setSignUpDetails((pv: SignUpInput) => ({ ...pv, ...i }));
  };
  const getSessionInfo = async () => {
    try {
      updateAuthStatus(AuthStatus.Loading);
      const response: BaseResponse<CognitoUserSession | undefined> =
        await userController.getSession();
      if (response.success && response.data && response.data.isValid()) {
        //@ts-ignore
        await saveUserToken(response);
        const email = response.data.getIdToken().decodePayload().email;
        setUserEmail(email);
        updateAuthStatus(AuthStatus.SignedIn);
      } else {
        updateAuthStatus(AuthStatus.SignedOut);
      }
    } catch (err) {
      updateAuthStatus(AuthStatus.SignedOut);
    }
  };

  const saveUserToken = async (
    i: BaseResponse<CognitoUserSession | undefined>
  ) => {
    // const jwtToken = i?.data?.getIdToken().getJwtToken() || "";
    const jwtToken = i?.data?.getAccessToken().getJwtToken() || "";
    await saveTokenToLocalStorage(jwtToken);
  };

  useEffect(() => {
    const loadCachedAuth = async () => {
      try {
        updateAuthStatus(AuthStatus.Loading);
        const response: BaseResponse<CognitoUserSession | undefined> =
          await userController.getSession();
        if (response.success && response.data && response.data.isValid()) {
          const email = response.data.getIdToken().decodePayload().email;
          await saveUserToken(response);
          setUserEmail(email);
          const user = await UserAPI.getUserByEmail(email);
          if (!Object.keys(user).length) {
            updateUserType(UserType.NotVerified, email);
            updateSelectedView(ViewState.NotVerified);
            updateAuthStatus(AuthStatus.SignedOut);
            return response;
          } else {
            const latestType = await getLatestSelectedAccountType(email);
            if (latestType === UserType.Business)
              updateSelectedView(ViewState.Business);
            else if (latestType === UserType.Customer)
              updateSelectedView(ViewState.Customer);
            else if (user.verifiedBusiness)
              updateSelectedView(ViewState.Business);
            else if (user.verifiedCustomer)
              updateSelectedView(ViewState.Customer);
            updateAuthStatus(AuthStatus.SignedIn);
            updateUserData(user);
            updateUserType(latestType as UserType, email);
          }
        } else {
          updateAuthStatus(AuthStatus.SignedOut);
        }
      } catch (err) {
        updateAuthStatus(AuthStatus.SignedOut);
      }
    };

    loadCachedAuth();
  }, []);

  const confirmEmailVerification = (verificationCode: string) => {
    const email =
      signUpDetails?.email?.toLowerCase() ||
      signInDetails?.email?.toLowerCase();
    return userController.confirmEmailVerificationCode(email, verificationCode);
  };

  const resendEmailVerificationCode = async (email = signUpDetails.email) =>
    userController.resendEmailVerificationCode(email.toLowerCase());

  const signUp = async () => {
    const response = await userController.signUp(
      signUpDetails.email.toLowerCase(),
      signUpDetails.password
    );
    return response;
  };

  const signIn = async (
    email = signInDetails.email,
    password = signInDetails.password
  ) => {
    updateAuthStatus(AuthStatus.Loading);
    const response: BaseResponse<CognitoUserSession> =
      await userController.signIn({ email: email.toLowerCase(), password });
    if (response?.success) {
      await getSessionInfo();
      const user = await UserAPI.getUserByEmail(email);
      if (!user) {
        updateUserType(UserType.NotVerified, email);
        updateSelectedView(ViewState.NotVerified);
        return response;
      } else {
        const latestType = await getLatestSelectedAccountType(email);
        updateUserData(user);
        const newType = 
          latestType == UserType.Cashier && user?.verifiedBusiness
            ? UserType.Business
            : (!latestType || latestType !== UserType.NotVerified)
              ? (latestType as UserType)
              : user?.verifiedCustomer
                ? UserType.Customer
                : UserType.Business
        updateUserType(newType, email);
        if (newType === UserType.Business)
          updateSelectedView(ViewState.Business);
        else if (newType === UserType.Customer)
          updateSelectedView(ViewState.Customer);
        else if (newType === UserType.NotVerified)
          updateSelectedView(ViewState.NotVerified);
      }
    } else {
      updateAuthStatus(AuthStatus.SignedOut);
    }
    return response;
  };

  const startForgotPasswordFlow = async (): Promise<BaseResponse<unknown>> => {
    const { email } = forgotPasswordDetails;
    const response: BaseResponse<unknown> =
      await userController.startForgotPasswordFlow({
        email: email.toLowerCase(),
      });
    return response;
  };

  const completeForgotPasswordFlow = async (vCode: string): Promise<
    BaseResponse<unknown>
  > => {
    const { email, newPassword } = forgotPasswordDetails;
    const response: BaseResponse<unknown> =
      await userController.completeForgotPasswordFlow({
        email,
        verificationCode: vCode,
        newPassword,
      });
    return response;
  };

  const changePassword = async (i: ChangePasswordInput) => {
    const { oldPassword, newPassword } = i;
    const response: BaseResponse<unknown> = await userController.changePassword(
      {
        oldPassword,
        newPassword,
      }
    );
    return response;
  };

  const signOut = () => {
    updateAuthStatus(AuthStatus.SignedOut);
    updateUserData({});
    setUserEmail("");
    setSignInDetails({ email: "", password: "" });
    setSignUpDetails({ email: "", password: "", confirmPassword: "" });
    updateUserType(UserType.NotVerified, userEmail);
    userController.signOut();
    updateSelectedView(ViewState.Onboarding);
  };

  const actions = {
    setForgotPasswordDetails,
    signIn,
    signOut,
    signUp,
    setSignInDetails,
    updateSignUpDetails,
    startForgotPasswordFlow,
    completeForgotPasswordFlow,
    resendEmailVerificationCode,
    changePassword,
    emailVerification: confirmEmailVerification,
  };

  const state: IAuth = {
    ...actions,
    forgotPasswordDetails,
    authStatus,
    signInDetails,
    signUpDetails,
    userEmail,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
