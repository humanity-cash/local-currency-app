import moment from "moment";
import { MiniTransaction } from "src/utils/types";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { Image, Text } from "react-native-elements";
import { Dialog } from "src/shared/uielements";
import { dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from "src/translation/en.json";
import { View } from "react-native";
import { getBerksharePrefix } from "src/utils/common";
import { getStyle } from "../utils";
import { styles, mListstyles } from "../style";
import { UserContext } from "src/contexts";
import { UserType } from "src/auth/types";
import { colors } from "src/theme/colors";

export type MyTransactionItemProps = {
  item: MiniTransaction;
  selected: string;
};

export type TransactionDetailProps = {
  visible: boolean;
  data: MiniTransaction;
  onClose: () => void;
};

export const TransactionItem = (props: MyTransactionItemProps) => {
  const { userType } = useContext(UserContext);
  const isCustomer = userType === UserType.Customer;
  const { item, selected } = props;
  const name =
    item.type === "Withdraw"
      ? "Cash out to bank"
      : item.type === "Deposit"
      ? "Load up"
      : item.type === "OUT"
      ? item.toName
      : item.fromName;

  const type =
    item.type === "IN"
      ? "Transfer In"
      : item.type === "Deposit"
      ? "Deposit"
      : item.type === "Withdraw"
      ? "Withdraw"
      : "Transfer Out";

  return (
    <View
      style={
        selected === item.transactionHash
          ? {
              ...mListstyles.selectedItem,
              backgroundColor: isCustomer ? colors.card : colors.bCard
            }
          : mListstyles.item
      }
    >
      <View style={mListstyles.imageContainer}>
        <Image
          source={require("../../../../assets/images/placeholder5.png")}
          containerStyle={mListstyles.image}
        />
        <View style={mListstyles.detailView}>
          <Text>{name}</Text>
          <Text style={mListstyles.timeText}>
            {moment(item.timestamp).format("HH:mm, MMM D, YYYY")}
          </Text>
          <Text style={mListstyles.timeText}>{type}</Text>
        </View>
      </View>
      <Text style={getStyle(item.type)}>
        {getBerksharePrefix(item.type)} {(+item.value).toFixed(2)}
      </Text>
    </View>
  );
};

export const TransactionDetail = (props: TransactionDetailProps) => {
  const { data, visible, onClose } = props;
  return (
    <Dialog visible={visible} onClose={onClose} style={styles.dialogHeight}>
      <View style={[dialogViewBase]}>
        <ScrollView style={wrappingContainerBase}>
          <View style={styles.headerView}>
            <Text style={[getStyle(data.type), {fontSize: 32}]}>
              {" "}
              {getBerksharePrefix(data.type)} {data.value}{" "}
            </Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailText}>
              {Translation.PAYMENT.TRANSACTION_ID}
            </Text>
            <Text style={[styles.detailText, {flex: 1}]}>{data.transactionHash}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailText}>TYPE</Text>
            <Text style={styles.detailText}>{data.type}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailText}>DATE</Text>
            <Text style={styles.detailText}>
              {moment(data.timestamp).format("HH:mm, MMM D, YYYY")}
            </Text>
          </View>
        </ScrollView>
      </View>
    </Dialog>
  );
};
