import moment from "moment";
import { MiniTransaction } from "src/utils/types";
import React, { useContext } from "react";
import { Image, Text } from "react-native-elements";
import { Dialog, Button } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import Translation from "src/translation/en.json";
import { View, Linking, Dimensions } from "react-native";
import { getBerksharePrefix } from "src/utils/common";
import { getStyle } from "../utils";
import { styles, mListstyles } from "../style";
import { UserContext } from "src/contexts";
import { UserType } from "src/auth/types";
import { colors } from "src/theme/colors";
import { TRANSACTION_EXPLORER_URL } from "src/config/env";
import { BUTTON_TYPES } from "src/constants";

const placeholder = require("../../../../assets/images/placeholder5.png")

export type MyTransactionItemProps = {
  item: MiniTransaction;
  selected: string;
};

export type TransactionDetailProps = {
  visible: boolean;
  data: MiniTransaction;
  onClose: () => void;
  onReturn?: () => void
};

export const TransactionItem = (props: MyTransactionItemProps) => {
  const { userType } = useContext(UserContext);
  const isCustomer = userType === UserType.Customer;
  const { item, selected } = props;
  const mW = Dimensions.get('window').width
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

  const isPending = item.transactionHash.toLowerCase() === "pending"
  
  const profile = item.image
    ? { uri: item.image }
    : placeholder

  return (
    <View
      style={
        selected === item.transactionHash
          ? {
              ...mListstyles.selectedItem,
              backgroundColor: isCustomer ? colors.card : colors.bCard,
            }
          : mListstyles.item
      }
    >
      <View style={[mListstyles.imageContainer, {width: mW-140}]}>
        <Image
          source={profile}
          containerStyle={mListstyles.image}
        />
        <View style={mListstyles.detailView}>
          <Text>{name}</Text>
          <Text style={mListstyles.timeText}>
            {moment(item.timestamp).format("h:mm A, MMM D, YYYY")}
          </Text>
          <Text style={mListstyles.timeText}>{isPending && "Pending "}{type}</Text>
        </View>
      </View>
      <Text style={getStyle(item.type)}>
        {getBerksharePrefix(item.type)} {(+item.value).toFixed(2)}
      </Text>
    </View>
  );
};

export const TransactionDetail = (props: TransactionDetailProps) => {
  const { data, visible, onClose, onReturn } = props;
  const name =
    data.type === "Withdraw"
      ? "Cash out to bank"
      : data.type === "Deposit"
      ? "Load up"
      : data.type === "OUT"
      ? data.toName
      : data.fromName;

  const profile = data.image
    ? { uri: data.image }
    : placeholder

  return (
    <Dialog visible={visible} onClose={onClose}>
      <View style={dialogViewBase}>
        <View style={styles.ownerInfo}>
          <Image
            source={profile}
            style={styles.image}
          />
          <Text style={styles.ownerName}>{name}</Text>
        </View>
        <View style={styles.headerView}>
          <Text style={[getStyle(data.type), { fontSize: 32 }]}>
            {getBerksharePrefix(data.type)} {data.value}{" "}
          </Text>
        </View>
        <View style={styles.detailView}>
          <Text style={styles.detailText}>
            {Translation.PAYMENT.TRANSACTION_ID}
          </Text>
          <Text
            style={[styles.detailText, styles.underlineText]}
            onPress={() =>
              Linking.openURL(
                `${TRANSACTION_EXPLORER_URL}block/${data.blockNumber}`
              )
            }
            numberOfLines={1}
            ellipsizeMode='middle'
          >
            {data.transactionHash}
          </Text>
        </View>
        <View style={styles.detailView}>
          <Text style={styles.detailText}>TYPE</Text>
          <Text style={styles.detailText}>{data.type}</Text>
        </View>
        <View style={styles.detailView}>
          <Text style={styles.detailText}>DATE</Text>
          <Text style={styles.detailText}>
            {moment(data.timestamp).format("h:mm A, MMM D, YYYY")}
          </Text>
        </View>
        { onReturn &&
          <View>
            <Button
              type={BUTTON_TYPES.TRANSPARENT}
              title={Translation.BUTTON.WANT_RETURN}
              textStyle={styles.returnText}
              onPress={onReturn}
            />
          </View>
        }
      </View>
    </Dialog>
  );
};
