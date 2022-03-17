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

export const saveToLocalStorage = async (
  data: string,
  tag: string
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(tag, String(data));
    return true;
  } catch (e) {
    return false;
  }
};

export const getFromLocalStorage = async (tag:string): Promise<string> => {
  try {
    const value: string | null = await AsyncStorage.getItem(tag);
    if (!value) return "";
    return value;
  } catch (e) {
    return "";
  }
};