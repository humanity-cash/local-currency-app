import { Business } from "@humanity.cash/types";
import { useEffect, useState } from "react";
import { BusinessesAPI } from "src/api";

export const useBusinesses = (): Business[] => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  useEffect(() => {
    const handler = async () => {
      const response = await BusinessesAPI.getBusinesses();
      setBusinesses(response.data);
    };
    handler();
  }, []);

  return businesses;
};
