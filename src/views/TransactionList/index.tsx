import { Octicons } from "@expo/vector-icons";
import { sortTxByTimestamp } from "src/utils/common";
import React, { useContext, useEffect, useState } from "react";
import { useStore } from "react-hookstore";
import { ScrollView } from "react-native";
import { TransactionsAPI } from "src/api";
import { ITransaction } from "src/api/types";
import { UserContext } from "src/contexts";
import { createFuseSearchInstance } from "src/fuse";
import {
  BUSINESS_TX_FILTERS_STORE,
  CUSTOMER_TX_FILTERS_STORE,
} from "src/hook-stores";
import LoadingPage from "../Loading";
import { SearchInput } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { TxFilters } from "src/utils/types";
import TransactionFilters from "src/shared/uielements/TransactionFilters";
import { UserType } from "src/auth/types";
import { View, TouchableOpacity } from "react-native";
import { MiniTransaction } from "src/utils/types";
import { filterData } from "./utils";
import { styles, mListstyles } from "./style";
import { TransactionDetail, TransactionItem } from "./components";
import { PaymentsModule } from "src/modules";
import { PaymentRequestSuccess } from 'src/views';

export interface MyTransactionsInput {
  userId: string;
  refreshing: boolean;
}

const TransactionList = (props: MyTransactionsInput): JSX.Element => {
  const { userId, refreshing } = props;
  const { userType } = useContext(UserContext);
  const filtersStore =
    userType === UserType.Customer
      ? CUSTOMER_TX_FILTERS_STORE
      : BUSINESS_TX_FILTERS_STORE;
  const [{ selectedType, startDate, endDate }] =
    useStore<TxFilters>(filtersStore);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isDetailView, setIsDetailView] = useState<boolean>(false);
  const [isReturnView, setIsReturnView] = useState<boolean>(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false);
  const [receivedAmount, setReceivedAmount] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<MiniTransaction>(
    {} as ITransaction
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiData, setAPIData] = useState<MiniTransaction[]>([]);
  const [filteredData, setFilteredData] = useState<MiniTransaction[]>([]);
  const isCustomer = userType === UserType.Customer;

  useEffect(() => {
    const d = filterData({ data: apiData, startDate, endDate, selectedType });
    setFilteredData(d);
  }, [startDate, endDate, selectedType, apiData]);

  useEffect(() => {
    const corn = setInterval(() => loadTransactions(), 5000);
    return () => clearInterval(corn);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadTransactions();
    const tm = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(tm);
  }, [userId]);

  useEffect(() => {
    if (refreshing) {
      loadTransactions();
    }
  }, [refreshing]);

  const loadTransactions = (isWithLoading = false) => {
    if (userId) {
      const handler = async () => {
        if (isWithLoading) {
          setIsLoading(true);
        }
        let txs: MiniTransaction[] = [];
        try {
          if (userType === UserType.Cashier) {
            txs = await TransactionsAPI.getBlockchainTransactions(userId);
          } else if (userType !== UserType.NotVerified) {
            txs = await TransactionsAPI.getAllTransactions(userId);
          }
          setIsLoading(false);
          const formattedTxs = sortTxByTimestamp(txs);
          setAPIData(formattedTxs);
          setFilteredData(formattedTxs);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      };
      handler();
    }
  };

  const onSearchChange = (name: string, change: string) => {
    if (!change) {
      setFilteredData(apiData);
      setSearchText(change);
      return;
    }

    const fuseInstance = createFuseSearchInstance(filteredData, {
      includeScore: false,
      keys: ["toName", "fromName", "value", "type"],
    });
    const fuseResult = fuseInstance.search(change);
    //@ts-ignore
    setFilteredData(fuseResult.map((i) => i.item));
    setSearchText(change);
  };

  const clearSearchText = () => {
    setSearchText("");
    setFilteredData(apiData);
  };

  const viewDetail = (item: MiniTransaction) => {
    setSelectedItem(item);
    setIsDetailView(true);
  };

  const onClose = () => {
    setIsDetailView(false);
    setIsReturnView(false)
    setIsRequestSuccess(false)
  };

  const onReturn = () => {
		setIsDetailView(false);
		setIsReturnView(true);
  }
  
  const onSuccessMakeReturn = (amount: number) => {
    setReceivedAmount(amount);
    setIsReturnView(false);
    setIsRequestSuccess(true);
  };

  const onConfirmMakeReturn = () => {
    setIsRequestSuccess(false);
    loadTransactions();
  };

  const filterBtnStyle = {
    ...styles.filterBtn,
    backgroundColor: isCustomer ? colors.inputBg : colors.lightBg,
  };

  const selectedFilterBtnStyle = {
    ...styles.selectedFilterBtn,
    backgroundColor: isCustomer ? colors.darkGreen : colors.purple,
  };

  return (
    <ScrollView>
      <LoadingPage visible={isLoading} isData={true} />
      <View style={styles.content}>
        <View style={styles.filterView}>
          <View style={styles.filterInput}>
            <SearchInput
              label="Search"
              name="searchText"
              keyboardType="default"
              placeholder="Search"
              value={searchText}
              onChange={onSearchChange}
              style={{
                backgroundColor: isCustomer ? colors.inputBg : colors.lightBg,
              }}
            />
          </View>
          <TouchableOpacity
            style={isFilterVisible ? selectedFilterBtnStyle : filterBtnStyle}
            onPress={() => setIsFilterVisible(!isFilterVisible)}
          >
            <Octicons
              name="settings"
              size={24}
              color={isFilterVisible ? colors.white : colors.text}
            />
          </TouchableOpacity>
        </View>
        {isFilterVisible && <TransactionFilters onClear={clearSearchText} />}
        <View style={mListstyles.listView}>
          {filteredData.map((item: MiniTransaction, i: number) => (
            <TouchableOpacity onPress={() => viewDetail(item)} key={i}>
              <TransactionItem
                item={item}
                selected={selectedItem.transactionHash}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {isDetailView && (
        <TransactionDetail
          visible={isDetailView}
          data={selectedItem}
          onClose={onClose}
          onReturn={isCustomer && selectedItem.type == "OUT" ? onReturn : undefined}
        />
      )}
      {isReturnView && 
        <PaymentsModule.Request
          visible={isReturnView}
          onSuccess={onSuccessMakeReturn}
          onClose={onClose}
          isOpenAmount={true}
          amount={Number(selectedItem.value)}
          ownerName={selectedItem.fromName}
          isReturn={true}
        />
      }
      {isRequestSuccess && (
        <PaymentRequestSuccess
          visible={isRequestSuccess}
          onClose={onConfirmMakeReturn}
          amount={receivedAmount}
          isReturn={true}
        />
      )}


    </ScrollView>
  );
};

export default TransactionList;
