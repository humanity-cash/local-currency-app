import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import React, { useContext } from 'react';
import { useStore } from 'react-hookstore';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import { CUSTOMER_TX_FILTERS_STORE, BUSINESS_TX_FILTERS_STORE } from 'src/hook-stores';
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import { CustomerTxFilterStore, CustomerTxFilterStoreActions, CustomerTxFilterStoreReducer, BusinessTxFilterStore, BusinessTxFilterStoreReducer, BusinessTxFilterStoreActions  } from 'src/utils/types';
import DateTimePicker from "react-native-modal-datetime-picker";
import { UserContext } from 'src/contexts';
import { UserType } from 'src/auth/types';
import { CustomerTxFiltersStyle, BusinessTxFiltersStyle } from 'src/style';

const customerTxTypes = ["All", "Incoming transactions", "Outgoing transactions", "Load ups B$", "Cash out to USD"];

const businessTxTypes = ["All", "Sales", "Returns", "Cash outs", "Expenses"];


const useBusinessFilters = ({ onClear }: { onClear: any}) => {
    const [{ startDate, isStartDate, endDate, isEndDate, selectedType }, dispatchBusinessTxFilterStore] = useStore<BusinessTxFilterStore, BusinessTxFilterStoreReducer>(BUSINESS_TX_FILTERS_STORE)

    const onStartDateChange = (selectedDate?: Date) => {
        dispatchBusinessTxFilterStore({ type: BusinessTxFilterStoreActions.UpdateStartDate, payload: { startDate: selectedDate || startDate || undefined } })
    };

    const onEndDateChange = (selectedDate?: Date) => {
        dispatchBusinessTxFilterStore({ type: BusinessTxFilterStoreActions.UpdateEndDate, payload: { endDate: selectedDate || endDate || undefined } })
    };

    const clearFilter = () => {
        dispatchBusinessTxFilterStore({ type: BusinessTxFilterStoreActions.ClearAll, payload: {} })
        onClear()
    };

    const closeStartDate = () => {
        dispatchBusinessTxFilterStore({ type: BusinessTxFilterStoreActions.CloseStartDate, payload: {} });
    };

    const closeEndDate = () => {
        dispatchBusinessTxFilterStore({ type: BusinessTxFilterStoreActions.CloseEndDate, payload: {} });
    };

    const openStartDate = () => {
        dispatchBusinessTxFilterStore({ type: BusinessTxFilterStoreActions.OpenStartDate, payload: {} });
    }

    const openEndDate = () => {
        dispatchBusinessTxFilterStore({ type: BusinessTxFilterStoreActions.OpenEndDate, payload: {} });
    };

    const onTypeSelect = (selectedItem: string) => {
        dispatchBusinessTxFilterStore({ type: BusinessTxFilterStoreActions.UpdateType, payload: { type: selectedItem } })
    }

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
    }
}

const useCustomerFilters = ({ onClear }: { onClear: any }) => {
    const [{
        selectedType,
        startDate,
        isStartDate,
        endDate,
        isEndDate }, dispatch] = useStore<CustomerTxFilterStore, CustomerTxFilterStoreReducer>(CUSTOMER_TX_FILTERS_STORE)
        const onStartDateChange = (selectedDate?: Date) => {
            const date = selectedDate
            if(date && endDate) {
                if(moment(date).isAfter(endDate)) {
                    dispatch({ type: CustomerTxFilterStoreActions.UpdateEndDate, payload: { endDate: date } })
                }
            }

            dispatch({ type: CustomerTxFilterStoreActions.UpdateStartDate, payload: { startDate: selectedDate || startDate || undefined } })
        };

        const onEndDateChange = (selectedDate?: Date) => {
            const date = selectedDate
            if(date && startDate) {
                if(moment(startDate).isAfter(date)) {
                    dispatch({ type: CustomerTxFilterStoreActions.UpdateStartDate, payload: { startDate: date } })
                }
            }

            dispatch({ type: CustomerTxFilterStoreActions.UpdateEndDate, payload: { endDate: selectedDate || startDate || undefined } })
        };

        const clearFilter = () => {
            dispatch({ type: CustomerTxFilterStoreActions.ClearAll, payload: {} });
            onClear();
        };

        const openStartDate = () => {
            dispatch({ type: CustomerTxFilterStoreActions.OpenStartDate, payload: {} });
        }

        const openEndDate = () => {
            dispatch({ type: CustomerTxFilterStoreActions.OpenEndDate, payload: {} });
        };

        const closeStartDate = () => {
            dispatch({ type: CustomerTxFilterStoreActions.CloseStartDate, payload: {} });
        };

        const closeEndDate = () => {
            dispatch({ type: CustomerTxFilterStoreActions.CloseEndDate, payload: {} });
        };

        const onTypeSelect = (selectedItem: string) => {
            dispatch({ type: CustomerTxFilterStoreActions.UpdateType, payload: { type: selectedItem } })
        }

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
        }
}

interface FiltersModule {
    onStartDateChange: (i: Date) => void
    onEndDateChange: (i: Date) => void
    clearFilter: () => void
    openStartDate: () => void
    openEndDate:() => void
    closeStartDate:() => void
    closeEndDate:() => void
    selectedType: any
    isStartDate: boolean
    isEndDate: boolean
    startDate: Date | undefined
    endDate: Date | undefined
    onTypeSelect: (s: string) => void
}

const useFilters = ({ onClear }: { onClear: any}): FiltersModule => {
    const { userType } = useContext(UserContext);

    if (userType === UserType.Business) {
        return { ...useBusinessFilters({ onClear }) }
    }
    return { ...useCustomerFilters({ onClear }) }
}

const MyTransactionFilter = ({ onClear }: {onClear: any}): JSX.Element => {
        let txTypes: string[] = [];
        const { userType } = useContext(UserContext);

        let styles: any = {};
        if(userType === UserType.Customer) {
            styles = CustomerTxFiltersStyle;
            txTypes = customerTxTypes;
        } else if(userType === UserType.Business) {
            styles = BusinessTxFiltersStyle 
            txTypes = businessTxTypes;
        }

        const { onStartDateChange,
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
        } = useFilters({ onClear })

        return (
            <View style={styles.container}>
                <View style={styles.inlineView}>
                    <View style={styles.dateView}>
                        <Text style={styles.label}>{Translation.LABEL.START_DATE}</Text>
                        <TouchableOpacity onPress={openStartDate} style={styles.date} >
                            <Text style={startDate == null ? styles.placeholder : styles.pickerText}>
                                {startDate == null ? "MM/DD/YY" : moment(startDate).format('MM/DD/yyyy')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.dateView}>
                        <Text style={styles.label}>{Translation.LABEL.END_DATE}</Text>
                        <TouchableOpacity onPress={openEndDate} style={styles.date}>
                            <Text style={endDate == null ? styles.placeholder : styles.pickerText}>
                                {endDate == null ? "MM/DD/YY" : moment(endDate).format('MM/DD/yyyy')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.label}>{Translation.LABEL.TRANSACTION_TYPE}</Text>
                <View style={styles.typeView}>
                    <SelectDropdown
                        data={txTypes}
                        defaultValue={selectedType}
                        onSelect={(selectedItem) => {
                            onTypeSelect(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item) => {
                            return item
                        }}
                        buttonStyle={styles.selectItem}
                        buttonTextStyle={styles.pickerText}
                        rowStyle={styles.selectItem}
                        dropdownStyle={styles.dropdownContainer}
                        renderCustomizedRowChild={(item) => (
                            <Text style={styles.pickerText}>{item}</Text>
                        )}
                        renderDropdownIcon={() => (
                            <AntDesign name="down" size={18} color={colors.darkGreen} />
                        )}
                        rowTextStyle={{textAlign: 'center'}}
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
                    textColor='black'
                />
                <DateTimePicker
                    isVisible={isEndDate}
                    mode="date"
                    date={endDate ? endDate : new Date()}
                    onConfirm={onEndDateChange}
                    minimumDate={startDate}
                    onCancel={closeEndDate}
                    textColor='black'
                />
            </View>
        );
}

export default MyTransactionFilter

