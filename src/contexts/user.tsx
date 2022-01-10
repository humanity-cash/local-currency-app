import { IDBUser } from "@humanity.cash/types";
import React, { useEffect, useState } from "react";
import { saveUserTypeToStorage } from "../auth/localStorage";
import { UserType } from "../auth/types";

export const UserContext = React.createContext<IState>({} as IState);

interface IState {
  isLoading: boolean;
  updateBusinessData: (u: any) => void;
  updateUserType: (i: UserType, userEmail: string) => void;
  updateUserData: (u: any) => void;
  updateCustomerData: (u: any) => void;
  user: IDBUser | undefined;
  businessDwollaId: string;
  customerDwollaId: string;
  userType: UserType;
}

export const UserProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<IDBUser>({} as IDBUser);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userType, setUserType] = useState<UserType>("" as UserType);
  const [customerDwollaId, setCustomerDwollaId] = useState("");
  const [businessDwollaId, setBusinessDwollaId] = useState("");

  const updateUserData = (uData: any) => setUser({ ...uData });
  const updateCustomerData = (u: any) => {
    setUser((pv: IDBUser) => ({ ...pv, customer: { ...pv.customer, ...u } }));
  };
  const updateBusinessData = (u: any) => {
    setUser((pv: IDBUser) => ({ ...pv, business: { ...pv.business, ...u } }));
  };
  const updateUserType = (newType: UserType, userEmail: string): void => {
    setUserType(newType);
    saveUserTypeToStorage(userEmail, newType);
  };

  useEffect(() => {
    setLoading(true);
    setBusinessDwollaId(user?.business?.dwollaId || "");
    setCustomerDwollaId(user?.customer?.dwollaId || "");
    setLoading(false);
  }, [user]);

  const state: IState = {
    user,
    isLoading,
    userType,
    updateUserType,
    updateCustomerData,
    updateBusinessData,
    businessDwollaId,
    customerDwollaId,
    updateUserData
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
