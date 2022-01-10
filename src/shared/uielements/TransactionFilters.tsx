import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import React, { useContext } from "react";
import { useStore } from "react-hookstore";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import {
  CUSTOMER_TX_FILTERS_STORE,
  BUSINESS_TX_FILTERS_STORE
} from "src/hook-stores";
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import {
  TxFilters,
  TxFilterStoreActions,
  TxFilterStoreReducer
} from "src/utils/types";
import DateTimePicker from "react-native-modal-datetime-picker";
import { UserContext } from "src/contexts";
import { UserType } from "src/auth/types";
import { CustomerTxFiltersStyle, BusinessTxFiltersStyle } from "src/style";

export interface FiltersModule {
  onStartDateChange: (i: Date) => void;
  onEndDateChange: (i: Date) => void;
  clearFilter: () => void;
  openStartDate: () => void;
  openEndDate: () => void;
  closeStartDate: () => void;
  closeEndDate: () => void;
  selectedType: any;
  isStartDate: boolean;
  isEndDate: boolean;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onTypeSelect: (s: string) => void;
}

const customerTxTypes = [
  "All",
  "Incoming transactions",
  "Outgoing transactions",
  "Load ups B$",
  "Cash out to USD"
];
const cashierTxTypes = [
  "All",
  "Incoming transactions",
  "Outgoing transactions"
];

const getFilters = ({
  onClear,
  store
}: {
  onClear: any;
  store: string;
}): FiltersModule => {
  const [
    { selectedType, startDate, isStartDate, endDate, isEndDate },
    dispatch
  ] = useStore<TxFilters, TxFilterStoreReducer>(store);

  const onStartDateChange = (selectedDate?: Date) => {
    const date = selectedDate;
    if (date && endDate) {
      if (moment(date).isAfter(endDate)) {
        dispatch({
          type: TxFilterStoreActions.UpdateEndDate,
          payload: { endDate: date }
        });
      }
    }
    dispatch({
      type: TxFilterStoreActions.UpdateStartDate,
      payload: { startDate: selectedDate || startDate || undefined }
    });
  };

  const onEndDateChange = (selectedDate?: Date) => {
    const date = selectedDate;
    if (date && startDate) {
      if (moment(startDate).isAfter(date)) {
        dispatch({
          type: TxFilterStoreActions.UpdateStartDate,
          payload: { startDate: date }
        });
      }
    }
    dispatch({
      type: TxFilterStoreActions.UpdateEndDate,
      payload: { endDate: selectedDate || startDate || undefined }
    });
  };

  const clearFilter = () => {
    dispatch({ type: TxFilterStoreActions.ClearAll, payload: {} });
    onClear();
  };

  const openStartDate = () => {
    dispatch({ type: TxFilterStoreActions.OpenStartDate, payload: {} });
  };

  const openEndDate = () => {
    dispatch({ type: TxFilterStoreActions.OpenEndDate, payload: {} });
  };

  const closeStartDate = () => {
    dispatch({ type: TxFilterStoreActions.CloseStartDate, payload: {} });
  };

  const closeEndDate = () => {
    dispatch({ type: TxFilterStoreActions.CloseEndDate, payload: {} });
  };

  const onTypeSelect = (selectedItem: string) => {
    dispatch({
      type: TxFilterStoreActions.UpdateType,
      payload: { type: selectedItem }
    });
  };

  return {
    onTypeSelect,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    clearFilter,
    openStartDate,
    openEndDate,
    closeStartDate,
    closeEndDate,
    selectedType,
    isStartDate,
    isEndDate
  };
};

const MyTransactionFilter = ({ onClear }: { onClear: any }): JSX.Element => {
  let txTypes: string[] = [];
  const { userType } = useContext(UserContext);
  const isCustomer = userType === UserType.Customer;
  const store = isCustomer
    ? CUSTOMER_TX_FILTERS_STORE
    : BUSINESS_TX_FILTERS_STORE;

  let styles: any = {};
  if (userType === UserType.Customer) {
    styles = CustomerTxFiltersStyle;
    txTypes = customerTxTypes;
  } else if (userType === UserType.Business) {
    styles = BusinessTxFiltersStyle;
    txTypes = customerTxTypes;
  } else if (userType === UserType.Cashier) {
    styles = BusinessTxFiltersStyle;
    txTypes = cashierTxTypes;
  }

  const {
    onStartDateChange,
    onEndDateChange,
    clearFilter,
    openStartDate,
    openEndDate,
    closeStartDate,
    closeEndDate,
    selectedType,
    isStartDate,
    isEndDate,
    startDate,
    endDate,
    onTypeSelect
  }: FiltersModule = getFilters({ onClear, store });

  return (
    <View style={styles.container}>
      <View style={styles.inlineView}>
        <View style={styles.dateView}>
          <Text style={styles.label}>{Translation.LABEL.START_DATE}</Text>
          <TouchableOpacity onPress={openStartDate} style={styles.date}>
            <Text
              style={startDate == null ? styles.placeholder : styles.pickerText}
            >
              {startDate == null
                ? "MM/DD/YY"
                : moment(startDate).format("MM/DD/yyyy")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.dateView}>
          <Text style={styles.label}>{Translation.LABEL.END_DATE}</Text>
          <TouchableOpacity onPress={openEndDate} style={styles.date}>
            <Text
              style={endDate == null ? styles.placeholder : styles.pickerText}
            >
              {endDate == null
                ? "MM/DD/YY"
                : moment(endDate).format("MM/DD/yyyy")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.label}>{Translation.LABEL.TRANSACTION_TYPE}</Text>
      <View style={styles.typeView}>
        <SelectDropdown
          data={txTypes}
          defaultValue={selectedType}
          onSelect={selectedItem => {
            onTypeSelect(selectedItem);
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem;
          }}
          rowTextForSelection={item => {
            return item;
          }}
          buttonStyle={styles.selectItem}
          buttonTextStyle={styles.pickerText}
          rowStyle={styles.selectItem}
          dropdownStyle={styles.dropdownContainer}
          renderCustomizedRowChild={item => (
            <Text style={styles.pickerText}>{item}</Text>
          )}
          renderDropdownIcon={() => (
            <AntDesign name="down" size={18} color={colors.darkGreen} />
          )}
          rowTextStyle={{ textAlign: "center" }}
        />
      </View>
      <TouchableOpacity style={styles.clearFilter} onPress={clearFilter}>
        <Text style={styles.clearText}>{Translation.PAYMENT.CLEAR_FILTER}</Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isStartDate}
        mode="date"
        date={startDate ? startDate : new Date()}
        onConfirm={onStartDateChange}
        onCancel={closeStartDate}
        textColor="black"
      />
      <DateTimePicker
        isVisible={isEndDate}
        mode="date"
        date={endDate ? endDate : new Date()}
        onConfirm={onEndDateChange}
        minimumDate={startDate}
        onCancel={closeEndDate}
        textColor="black"
      />
    </View>
  );
};

export default MyTransactionFilter;
