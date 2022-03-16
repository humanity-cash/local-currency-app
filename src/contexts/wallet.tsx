import { IWallet } from "@humanity.cash/types";
import React, { useState, useEffect, useContext } from "react";
import { DwollaAPI } from "src/api";
import { FundingSource } from 'src/api/types';
import { NavigationViewContext, ViewState } from "src/contexts/navigation";

interface PersonalFundingSource {
  availableFundingSource: FundingSource | undefined;
}

export const WalletContext = React.createContext<IState>({} as IState);

interface IState {
  customerWalletData: IWallet & PersonalFundingSource | undefined;
  businessWalletData: IWallet & PersonalFundingSource | undefined;
  updateBusinessWalletData: (dwollaId: string) => void;
  updateCustomerWalletData: (dwollaId: string) => void;
  clearWalletData: () => void;
}

export const WalletProvider: React.FunctionComponent = ({ children }) => {
  const [customerWalletData, setCustomerWalletData] = useState<
    IWallet & PersonalFundingSource | undefined
  >(undefined);
  const [businessWalletData, setBusinessWalletData] = useState<
    IWallet & PersonalFundingSource | undefined
  >(undefined);
  const { selectedView } = useContext(NavigationViewContext);

  useEffect(() => {
    if( selectedView === ViewState.Onboarding ) {
      clearWalletData()
    }
  }, [selectedView])

  const updateBusinessWalletData = async (businessDwollaId: string) => {
    if (businessDwollaId) {
      const userWallet = await DwollaAPI.loadWallet(businessDwollaId);
      const fundingSource = await DwollaAPI.loadFundingSource(businessDwollaId);
      if( selectedView !== ViewState.Onboarding ) {
        setBusinessWalletData({
          ...userWallet,
          availableFundingSource: fundingSource,
        });
      }
    }
  };

  const updateCustomerWalletData = async (customerDwollaId: string) => {
    if (customerDwollaId) {
      const userWallet = await DwollaAPI.loadWallet(customerDwollaId);
      const fundingSource = await DwollaAPI.loadFundingSource(customerDwollaId);
      if( selectedView !== ViewState.Onboarding ) {
        setCustomerWalletData({
          ...userWallet,
          availableFundingSource: fundingSource,
        });
      }
    }
  };

  const clearWalletData = () => {
    setCustomerWalletData(undefined)
    setBusinessWalletData(undefined)
  }

  const state: IState = {
    customerWalletData,
    businessWalletData,
    updateBusinessWalletData,
    updateCustomerWalletData,
    clearWalletData
  };

  return (
    <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
  );
};
