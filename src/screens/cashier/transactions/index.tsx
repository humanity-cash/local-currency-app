import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  viewBaseB,
  wrappingContainerBase,
  baseHeader,
} from "src/theme/elements";
import { CancelBtn } from "src/shared/uielements";
import Translation from "src/translation/en.json";
import { WalletContext, UserContext } from "src/contexts";
import { TransactionList } from "src/views";
import { styles } from "./style";

const CashierTransactions = (): JSX.Element => {
  const navigation = useNavigation();
  const { businessDwollaId } = useContext(UserContext);
  const { businessWalletData } = useContext(WalletContext);

  return (
    <View style={viewBaseB}>
      <Header
        rightComponent={
          <CancelBtn
            text={Translation.BUTTON.CLOSE}
            color={colors.purple}
            onClick={() => navigation.goBack()}
          />
        }
      />
      <ScrollView style={wrappingContainerBase}>
        <View>
          <View style={baseHeader}>
            <Text style={styles.headerText}>
              {Translation.CASHIER.TRANSACTIONS}
            </Text>
          </View>
          <View style={styles.amountView}>
            <View></View>
            <View>
              <Text style={styles.alignRight}>
                {Translation.CASHIER.BALANCE}
              </Text>
              <Text style={styles.balanceText}>
                B$ {businessWalletData?.availableBalance?.toFixed(2)}
              </Text>
            </View>
          </View>
          <TransactionList userId={businessDwollaId} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CashierTransactions;
