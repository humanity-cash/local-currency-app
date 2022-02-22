import React, { useState } from "react";

export const NavigationViewContext = React.createContext<IState>({} as IState);

export enum ViewState {
  Cashier = "Cashier",
  Business = "Business",
  Customer = "Customer",
  NotVerified = "NotVerified",
  CustomerLinkBank = "CustomerLinkBank",
  BusinessLinkBank = "BusinessLinkBank",
  Onboarding = "Onboarding",
}

interface IState {
  selectedView: ViewState;
  updateSelectedView: (u: ViewState) => void;
}

export const NavigationProvider: React.FunctionComponent = ({ children }) => {
  const [selectedView, setSelectedView] = useState<ViewState>(
    ViewState.Onboarding
  );
  const updateSelectedView = (u: ViewState) => setSelectedView(u);

  const state: IState = {
    selectedView,
    updateSelectedView,
  };

  return (
    <NavigationViewContext.Provider value={state}>
      {children}
    </NavigationViewContext.Provider>
  );
};
