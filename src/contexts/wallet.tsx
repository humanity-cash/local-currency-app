import { IWallet } from "@humanity.cash/types";
import React, { useState } from "react";
import { DwollaAPI } from "src/api";
import { FundingSource } from 'src/api/types';

interface PersonalFundingSource {
  availableFundingSource: FundingSource | undefined;
}

export const WalletContext = React.createContext<IState>({} as IState);

interface IState {
  customerWalletData: IWallet & PersonalFundingSource;
  businessWalletData: IWallet & PersonalFundingSource;
  updateBusinessWalletData: (dwollaId: string) => void;
  updateCustomerWalletData: (dwollaId: string) => void;
}

export const WalletProvider: React.FunctionComponent = ({ children }) => {
  const [customerWalletData, setCustomerWalletData] = useState<
    IWallet & PersonalFundingSource
  >({
    totalBalance: 0,
    createdTimestamp: "",
    availableBalance: 0,
    userId: "",
    address: "",
    createdBlock: "",
    availableFundingSource: undefined,
  });
  const [businessWalletData, setBusinessWalletData] = useState<
    IWallet & PersonalFundingSource
  >({
    totalBalance: 0,
    createdTimestamp: "",
    availableBalance: 0,
    userId: "",
    address: "",
    createdBlock: "",
    availableFundingSource: undefined,
  });

  const updateBusinessWalletData = async (businessDwollaId: string) => {
    if (businessDwollaId) {
      const userWallet = await DwollaAPI.loadWallet(businessDwollaId);
      const fundingSource = await DwollaAPI.loadFundingSource(businessDwollaId);
      setBusinessWalletData({
        ...userWallet,
        availableFundingSource: fundingSource,
      });
    }
  };

  const updateCustomerWalletData = async (customerDwollaId: string) => {
    if (customerDwollaId) {
      const userWallet = await DwollaAPI.loadWallet(customerDwollaId);
      const fundingSource = await DwollaAPI.loadFundingSource(customerDwollaId);
      setCustomerWalletData({
        ...userWallet,
        availableFundingSource: fundingSource,
      });
    }
  };

  const state: IState = {
    customerWalletData,
    businessWalletData,
    updateBusinessWalletData,
    updateCustomerWalletData,
  };

  return (
    <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
  );
};
