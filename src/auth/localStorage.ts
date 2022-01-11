import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "src/auth/types";

export const saveUserTypeToStorage = async (
  email: string,
  value: UserType
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(`@accType_${email}`, String(value));
    return true;
  } catch (e) {
    return false;
  }
};

export const getLatestSelectedAccountType = async (
  email: string
): Promise<string> => {
  try {
    const value: string | null = await AsyncStorage.getItem(
      `@accType_${email}`
    );
    if (!value) return "";
    return value;
  } catch (e) {
    return "";
  }
};

export const saveTokenToLocalStorage = async (
 token: string,
): Promise<boolean> => {
 try {
  await AsyncStorage.setItem(`@token`, String(token));
  return true;
 } catch (e) {
  return false;
 }
};

export const getTokenFromLocalStorage = async (
): Promise<string> => {
 try {
  const value: string | null = await AsyncStorage.getItem(
   `@token`
  );
  if (!value) return "";
  return value;
 } catch (e) {
  return "";
 }
};
