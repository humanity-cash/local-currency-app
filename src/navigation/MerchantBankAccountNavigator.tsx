import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import SelectMerchantBank from "src/screens/business/bank";

const MerchantBankAccountStack = createStackNavigator();
function MerchantBankAccountScreen(): ReactElement {
  return (
    <MerchantBankAccountStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <MerchantBankAccountStack.Screen
        name="SelectMerchantBank"
        component={SelectMerchantBank}
      />
    </MerchantBankAccountStack.Navigator>
  );
}

export const MerchantBankAccountNavigator = MerchantBankAccountScreen;
