import React, {useState, ReactElement} from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import Translation from 'src/translation/en.json';
import { colors } from "src/theme/colors";

const merchantTransactions = [
    { value: 'All' },
    { value: 'Sales' },
    { value: 'Returns' },
    { value: 'Cash outs' },
    { value: 'Expenses' }
]

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
        height: 55,
        justifyContent: 'center',
        marginTop: 7,
        backgroundColor: colors.white
    },
    itemText: {
        paddingLeft: 10
    },
    dropdownContainer: {
        paddingHorizontal: 20, 
        paddingBottom: 20
    },
    dropdownInputContainer: {
        borderBottomColor: 'transparent'
    },
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

const MerchantTransactionsFilter = (): ReactElement => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isStartDate, setIsStartDate] = useState<boolean>(false);
    const [isEndDate, setIsEndDate] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>("All");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || startDate;
        setIsStartDate(Platform.OS === 'ios');
        setStartDate(currentDate);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEndDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || startDate;
        setIsEndDate(Platform.OS === 'ios');
        setEndDate(currentDate);
    };

    const clearFilter = () => {
        setSelectedType("All");
        setStartDate(null)
        setEndDate(null);
    };

	return (
		<View style={styles.container}>
            <View style={styles.inlineView}>
                <View style={styles.dateView}>
                    <Text style={styles.label}>{Translation.LABEL.START_DATE}</Text>
                    <TouchableOpacity onPress={()=>setIsStartDate(true)} style={styles.date} >
                        <Text style={startDate == null ? styles.placeholder : styles.mainText}>
                            {startDate == null ? "DD/MM/YY" : moment(startDate).format('DD/MM/yyyy')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator}></View>
                <View style={styles.dateView}>
                    <Text style={styles.label}>{Translation.LABEL.END_DATE}</Text>
                    <TouchableOpacity onPress={()=>setIsEndDate(true)} style={styles.date}>
                        <Text style={endDate == null ? styles.placeholder : styles.mainText}>
                            {endDate == null ? "DD/MM/YY" : moment(endDate).format('DD/MM/yyyy')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.label}>{Translation.LABEL.TRANSACTION_TYPE}</Text>
            <View style={styles.typeView}>
                <Dropdown
                    value={selectedType}
                    data={merchantTransactions}
                    selectedItemColor={colors.purple}
                    itemColor={colors.greyedPurple}
                    textColor={colors.purple}
                    itemTextStyle={styles.itemText}
                    containerStyle={styles.dropdownContainer}
                    inputContainerStyle={styles.dropdownInputContainer}
                    onChangeText={(itemValue) => setSelectedType(itemValue)}
                /> 
            </View>
            <TouchableOpacity style={styles.clearFilter} onPress={clearFilter}>
                <Text style={styles.clearText}>{Translation.PAYMENT.CLEAR_FILTER}</Text>
            </TouchableOpacity>
            {isStartDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate ? startDate : new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={onStartDateChange}
                />
            )}
            {isEndDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate ? endDate : new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={onEndDateChange}
                />
            )}
        </View>
	);
}

export default MerchantTransactionsFilter