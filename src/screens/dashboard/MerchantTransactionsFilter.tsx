import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import React, { ReactElement } from 'react';
import { useStore } from 'react-hookstore';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import { BUSINESS_TX_FILTERS_STORE } from 'src/hook-stores';
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import { BusinessTxFilterStore, BusinessTxFilterStoreActions, BusinessTxFilterStoreReducer } from 'src/utils/types';

const TransactionTypes = ["All", "Sales", "Returns", "Cash outs", "Expenses"];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    },
    mainText: {
        color: colors.purple
    },
    placeholder: {
        color: colors.greyedPurple
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
        backgroundColor: colors.white
    },
    separator: {
        width: 15,
        height: 1,
        marginHorizontal: 10,
        marginTop: 15,
        backgroundColor: colors.purple
    },
    label: {
        fontSize: 10,
        lineHeight: 14,
        color: colors.bodyText
    },
    typeView: {
        marginTop: 7
    },
    pickerText: {
        color: colors.purple,
        textAlign: 'center'
    },
    selectItem: {
        width: '100%',
        height: 55,
        backgroundColor: colors.white,
    },
    dropdownContainer: { marginTop: -20 },
    clearFilter: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.purple
    },
    clearText: {
        textAlign: "center",
        color: colors.purple
    }
});

const MerchantTransactionsFilter = ({ onClear }: {onClear: any}): JSX.Element => {
    const [{ startDate, isStartDate, endDate, isEndDate }, dispatchBusinessTxFilterStore] = useStore<BusinessTxFilterStore, BusinessTxFilterStoreReducer>(BUSINESS_TX_FILTERS_STORE)

    const onStartDateChange = (_: unknown, selectedDate?: Date) => {
        dispatchBusinessTxFilterStore({ type: BusinessTxFilterStoreActions.UpdateStartDate, payload: { startDate: selectedDate || startDate || undefined } })
    };

    const onEndDateChange = (_: unknown, selectedDate?: Date) => {
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

    return (
        <View style={styles.container}>
            <View style={styles.inlineView}>
                <View style={styles.dateView}>
                    <Text style={styles.label}>{Translation.LABEL.START_DATE}</Text>
                    <TouchableOpacity onPress={() => dispatchBusinessTxFilterStore({
                        type:
                            BusinessTxFilterStoreActions.OpenStartDate, payload: {}
                    })} style={styles.date} >
                        <Text style={startDate == null ? styles.placeholder : styles.mainText}>
                            {startDate == null ? "DD/MM/YY" : moment(startDate).format('DD/MM/yyyy')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator}></View>
                <View style={styles.dateView}>
                    <Text style={styles.label}>{Translation.LABEL.END_DATE}</Text>
                    <TouchableOpacity onPress={() => dispatchBusinessTxFilterStore({
                        type:
                            BusinessTxFilterStoreActions.OpenEndDate, payload: {}
                    })} style={styles.date}>
                        <Text style={endDate == null ? styles.placeholder : styles.mainText}>
                            {endDate == null ? "DD/MM/YY" : moment(endDate).format('DD/MM/yyyy')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.label}>{Translation.LABEL.TRANSACTION_TYPE}</Text>
            <View style={styles.typeView}>
                <SelectDropdown
                    data={TransactionTypes}
                    defaultValueByIndex={0}
                    onSelect={(selectedItem) => {
                        dispatchBusinessTxFilterStore({
                            type: BusinessTxFilterStoreActions.UpdateType, payload: { type: selectedItem }
                        })
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
                        <AntDesign name="down" size={18} color={colors.purple} />
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

export default MerchantTransactionsFilter