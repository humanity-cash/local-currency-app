import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { useStore } from 'react-hookstore';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import { CUSTOMER_TX_FILTERS_STORE } from 'src/hook-stores';
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import { CustomerTxFilterStore, CustomerTxFilterStoreActions, CustomerTxFilterStoreReducer } from 'src/utils/types';
import DateTimePicker from "react-native-modal-datetime-picker";

const consumerTransactionTypes = ["All", "Incoming transactions", "Outgoing transactions", "Load ups B$", "Cash out to USD"];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    },
    inlineView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        alignItems: 'center'
    },
    dateView: {
        flex: 1,
    },
    date: {
        height: 55,
        marginVertical: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        backgroundColor: colors.inputBg
    },
    separator: {
        width: 15,
        height: 1,
        marginHorizontal: 10,
        marginTop: 15,
        backgroundColor: colors.darkGreen
    },
    label: {
		fontSize: 10,
		lineHeight: 14,
		color: colors.bodyText
	},
    typeView: {
        flex: 1,
        height: 55,
        justifyContent: 'center',
        marginTop: 7,
        backgroundColor: colors.inputBg
    },
    pickerText: {
        color: colors.darkGreen,
        textAlign: 'center'
    },
    selectItem: {
        width: '100%',
        height: 55,
        backgroundColor: colors.inputBg,
    },
    dropdownContainer: {marginTop: -20},
    placeholder: {
        color: colors.lightGreen
    },
    clearFilter: {
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: colors.darkGreen
	},
    clearText: {
        textAlign: "center"
    }
});

const MyTransactionFilter = ({ onClear }: { onClear: any }): JSX.Element => {
    const [{
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
                    data={consumerTransactionTypes}
                    defaultValueByIndex={0}
                    onSelect={(selectedItem) => {
                        dispatch({ type: CustomerTxFilterStoreActions.UpdateType, payload: { type: selectedItem } })
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
            {isStartDate &&
                <DateTimePicker
                    isVisible={true}
                    mode="date"
                    date={startDate ? startDate : new Date()}
                    onConfirm={onStartDateChange}
                    onCancel={closeStartDate}
                    textColor='black'
                />
            }
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