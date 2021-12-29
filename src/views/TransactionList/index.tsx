
import { Octicons } from '@expo/vector-icons';
import { sortTxByTimestamp } from "src/utils/common";
import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-hookstore';
import { ScrollView } from 'react-native';
import { TransactionsAPI } from 'src/api';
import { ITransaction } from 'src/api/types';
import { UserContext } from "src/contexts";
import { createFuseSearchInstance } from 'src/fuse';
import { BUSINESS_TX_FILTERS_STORE, CUSTOMER_TX_FILTERS_STORE } from 'src/hook-stores';
import LoadingPage from '../Loading';
import {  SearchInput } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { TxFilters } from "src/utils/types";
import TransactionFilters from "src/shared/uielements/TransactionFilters";
import { UserType } from 'src/auth/types';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MiniTransaction } from "src/utils/types";
import { filterData } from './utils';
import { styles, mListstyles } from './style';
import { TransactionDetail, TransactionItem } from './components';

export interface MyTransactionsInput {
	userId: string
}

const TransactionList = (props: MyTransactionsInput): JSX.Element => {
	const { userId } = props
	const { userType } = useContext(UserContext);
	const filtersStore = userType === UserType.Customer ? CUSTOMER_TX_FILTERS_STORE : BUSINESS_TX_FILTERS_STORE;
	const [{ selectedType,
		startDate,
		endDate,
	}] = useStore<TxFilters>(filtersStore);
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("");
	const [isDetailView, setIsDetailView] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<MiniTransaction>({} as ITransaction);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [apiData, setAPIData] = useState<MiniTransaction[]>([]);
	const [filteredData, setFilteredData] = useState<MiniTransaction[]>([]);

	useEffect(() => {
		const d = filterData({ data: apiData, startDate, endDate, selectedType });
		setFilteredData(d);
	}, [startDate, endDate, selectedType, apiData])

	useEffect(() => {
		loadTransactions()
	}, [userId]);

	const loadTransactions = () => {
		if (userId) {
			const handler = async () => {
				setIsLoading(true);
				let txs: MiniTransaction[] = [];
				if (userType === UserType.Cashier) {
					txs = await TransactionsAPI.getBlockchainTransactions(userId);

				} else if (userType !== UserType.NotVerified) {
					txs = await TransactionsAPI.getAllTransactions(userId);

				}
				const formattedTxs = sortTxByTimestamp(txs);
				setAPIData(formattedTxs);
				setFilteredData(formattedTxs);
				setIsLoading(false);
			};
			handler();
		}
	}


	const onSearchChange = (name: string, change: string) => {
		if (!change) {
			setFilteredData(apiData);
			setSearchText(change);
			return;
		}

		const fuseInstance = createFuseSearchInstance(filteredData, {
			includeScore: false,
			keys: ['toName', 'fromName', 'value', 'type']
		});
		const fuseResult = fuseInstance.search(change);
		//@ts-ignore
		setFilteredData(fuseResult.map(i => i.item));
		setSearchText(change);
	}

	const clearSearchText = () => {
		setSearchText("");
		setFilteredData(apiData);
	}

	const viewDetail = (item: MiniTransaction) => {
		setSelectedItem(item);
		setIsDetailView(true);
	}

	const onClose = () => {
		setIsDetailView(false);
	}

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
						/>
					</View>
					<TouchableOpacity style={isFilterVisible ? styles.selectedFilterBtn : styles.filterBtn} onPress={() => setIsFilterVisible(!isFilterVisible)}>
						<Octicons
							name="settings"
							size={24}
							color={isFilterVisible ? colors.white : colors.text}
						/>
					</TouchableOpacity>
				</View>
				{isFilterVisible && <TransactionFilters onClear={clearSearchText} />}
				<View style={mListstyles.listView}>
					{
						filteredData.map((item: MiniTransaction, i: number) =>
							<TouchableOpacity onPress={() => viewDetail(item)} key={i}>
								<TransactionItem item={item} selected={selectedItem.transactionHash} />
							</TouchableOpacity>
						)
					}
				</View>
			</View>
			{isDetailView && <TransactionDetail visible={isDetailView} data={selectedItem} onClose={onClose} />}
		</ScrollView>
	);
}

export default TransactionList;

{/* {isReturnView && <ReturnQRCodeGen visible={isReturnView} onSuccess={onSuccess} onClose={onClose} transactionInfo={selectedItem} />}
{isRequestSuccess && <PaymentRequestSuccess visible={isRequestSuccess} onClose={onConfirm} amount={receivedAmount} />} */}

// {TransactionType.OUT === data.type && (
// 	<View>
// 		<Button
// 			type={BUTTON_TYPES.TRANSPARENT}
// 			title={Translation.BUTTON.WANT_RETURN}
// 			textStyle={styles.returnText}
// 			onPress={onReturn}
// 		/>
// 	</View>
// )}

// setIsReturnView(true);
// const onSuccess = (amount: number) => {
// 	setReceivedAmount(amount);
// 	setIsReturnView(false);
// 	setIsRequestSuccess(true);
// }

// const onConfirm = () => {
// 	setIsRequestSuccess(false);
// }

	// setIsReturnView(false);
	// setIsRequestSuccess(false);