import { useContext, useEffect, useState } from "react";
import { UserContext, WalletContext } from "src/contexts";

export const useBusinessWallet = (): { isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateBusinessWalletData } = useContext(WalletContext);
  const { businessDwollaId } = useContext(UserContext);

  useEffect(() => {
    const handler = async () => {
      if (businessDwollaId) {
        setIsLoading(true);
        await updateBusinessWalletData(businessDwollaId);
      }
      setIsLoading(false);
    };
    handler();
  }, [businessDwollaId]);

  return { isLoading };
};

export const useCustomerWallet = (): { isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateCustomerWalletData } = useContext(WalletContext);
  const { customerDwollaId } = useContext(UserContext);

  useEffect(() => {
    const handler = async () => {
      setIsLoading(true);
      if (customerDwollaId) {
        await updateCustomerWalletData(customerDwollaId);
      }
      setIsLoading(false);
    };
    handler();
  }, [customerDwollaId]);

  return { isLoading };
};

export const useUpdateCustomerWalletData = (): void => {
  const { customerDwollaId, user } = useContext(UserContext);
  const { customerWalletData, updateCustomerWalletData } =
    useContext(WalletContext);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (
        customerWalletData?.address !== user?.customer?.walletAddress &&
        customerDwollaId
      ) {
        updateCustomerWalletData(customerDwollaId);
      }
    }, 1500);
    if (
      customerWalletData?.address?.length &&
      customerWalletData?.address === user?.customer?.walletAddress
    ) {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [customerWalletData?.address, user?.customer?.walletAddress]);
};

export const useUpdateBusinessWalletData = (): void => {
  const { businessDwollaId, user } = useContext(UserContext);
  const { businessWalletData, updateBusinessWalletData } =
    useContext(WalletContext);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (
        businessWalletData?.address !== user?.business?.walletAddress &&
        businessDwollaId
      ) {
        updateBusinessWalletData(businessDwollaId);
      }
    }, 1500);
    if (
      businessWalletData?.address?.length &&
      businessWalletData?.address === user?.business?.walletAddress
    ) {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [businessWalletData?.address, user?.customer?.walletAddress]);
};
