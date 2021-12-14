import DateTimePicker from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
	StyleSheet,
	TouchableOpacity,
	View 
} from "react-native";
import { Text } from "react-native-elements";
import { BUTTON_TYPES } from "src/constants";
import * as Routes from "src/navigation/constants";
import { BackBtn, Button, Header } from 'src/shared/uielements';
import { colors } from "src/theme/colors";
import {
    underlineHeaderB,
    viewBaseB,
    wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { UserType } from "src/auth/types";
import { UserContext } from 'src/contexts';
import TransactionTypePicker from "src/shared/uielements/TransactionTypePicker";

const styles = StyleSheet.create({
	headerText: {
		paddingBottom: 10,
		fontSize: 32,
		fontWeight: "400",
		lineHeight: 40,
		color: colors.purple,
	},
	container: {
		paddingBottom: 40,
	},
	content: {
		marginTop: 10,
		paddingBottom: 20,
		borderBottomColor: colors.purple,
		borderBottomWidth: 1,
	},
	bodyView: {
		marginBottom: 15,
	},
	bodyText: {
		color: colors.bodyText,
		fontSize: 16,
	},
	text: {
		color: colors.bodyText,
		fontSize: 12,
	},
	defaultAmountView: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingTop: 5,
	},
	defaultAmountItem: {
		width: 100,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.purple,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 8,
	},
	selectedAmountItem: {
		width: 100,
		height: 40,
		backgroundColor: colors.purple,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 8,
	},
	amountText: {
		color: colors.purple,
	},
	placeholder: {
		color: colors.greyedPurple,
	},
	selectedAmountText: {
		color: colors.white,
	},
	inlineView: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
		alignItems: "center",
	},
	transactionTypeView: {
		marginTop: 20,
	},
	dateView: {
		flex: 1,
	},
	date: {
		height: 55,
		marginVertical: 7,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 3,
		backgroundColor: colors.white,
	},
	separator: {
		width: 15,
		height: 1,
		marginHorizontal: 10,
		marginTop: 15,
		backgroundColor: colors.purple,
	},
	label: {
		fontSize: 10,
		lineHeight: 14,
		color: colors.bodyText,
	},
	picker: {
		backgroundColor: colors.white,
		borderWidth: 0,
		height: 55
	},
	pickerView: {
		color: colors.purple,
		fontSize: 16
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45,
	},
	specifySearch: {
		color: colors.purple,
		textAlign: "center",
		paddingTop: 40,
	},
	badgeView: {
		padding: 5,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colors.purple
	},
	selectedItemLabel: {
		fontWeight: "bold",
		color: colors.purple
	}
});

const enum ReportType {
	ALL = "",
	TODAY = "Today",
	WEEK = "Week",
	MONTH = "Month",
}

const Report = (): JSX.Element => {
	const navigation = useNavigation();
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [isStartDate, setIsStartDate] = useState<boolean>(false);
	const [isEndDate, setIsEndDate] = useState<boolean>(false);
	const [goNext, setGoNext] = useState(false);
	const [reportType, setReportType] = useState<ReportType>(ReportType.ALL);
	const { userType } = useContext(UserContext);

	const [items, setItems] = useState([
		'All', 'Sales','Returns', 'Cash outs', 'Other transfers'
	]);
	const [selIndexes, setSelIndexes] = useState<boolean[]>()

	useEffect(() => {
		const indexes = []
		for(let i = 0; i < items.length; i++) {
			indexes.push(false)
		}
		setSelIndexes(indexes)
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onStartDateChange = (selectedDate?: Date) => {
		const currentDate = selectedDate || startDate;
		setIsStartDate(false);
		setStartDate(currentDate);
		setReportType(ReportType.ALL);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onEndDateChange = (selectedDate?: Date) => {
		const currentDate = selectedDate || startDate;
		setIsEndDate(false);
		setEndDate(currentDate);
		setReportType(ReportType.ALL);
	};

	const onPressPeriodType = (reportType: ReportType) => {
		setReportType(reportType)
		const today = new Date();
		setEndDate(today);
		switch(reportType) {
			case ReportType.TODAY:
				setStartDate(today);
				break;
			case ReportType.WEEK:
				setStartDate(new Date(moment(today).add(-1, 'week').format("MM/DD/yyyy")));
				break;
			case ReportType.MONTH:
				setStartDate(new Date(moment(today).add(-1, 'month').format("MM/DD/yyyy")));
				break;
			default:
				break;
		}
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={
					<BackBtn
						text="Home"
						color={colors.purple}
						onClick={() => navigation.goBack()}
					/>
				}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>
						{Translation.REPORT.MAKE_REPORT}
					</Text>
				</View>
				<View style={styles.bodyView}>
					<Text style={styles.bodyText}>
						{Translation.REPORT.SELECT_TIME_TYPE}
					</Text>
				</View>

				<Text style={styles.text}>
					{Translation.LABEL.TIME_PERIOD}
				</Text>
				<View style={styles.defaultAmountView}>
					<TouchableOpacity
						style={
							reportType === ReportType.TODAY
								? styles.selectedAmountItem
								: styles.defaultAmountItem
						}
						onPress={() => onPressPeriodType(ReportType.TODAY)}>
						<Text
							style={
								reportType == ReportType.TODAY
									? styles.selectedAmountText
									: styles.amountText
							}>
							Today
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={
							reportType === ReportType.WEEK
								? styles.selectedAmountItem
								: styles.defaultAmountItem
						}
						onPress={() => onPressPeriodType(ReportType.WEEK)}>
						<Text
							style={
								reportType === ReportType.WEEK
									? styles.selectedAmountText
									: styles.amountText
							}>
							Week
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={
							reportType === ReportType.MONTH
								? styles.selectedAmountItem
								: styles.defaultAmountItem
						}
						onPress={() => onPressPeriodType(ReportType.MONTH)}>
						<Text
							style={
								reportType === ReportType.MONTH
									? styles.selectedAmountText
									: styles.amountText
							}>
							Month
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.inlineView}>
					<View style={styles.dateView}>
						<Text style={styles.label}>
							{Translation.LABEL.START_DATE}
						</Text>
						<TouchableOpacity
							onPress={() => {
								setIsStartDate(true)
								setIsEndDate(false)
							}}
							style={styles.date}>
							<Text
								style={
									startDate == null
										? styles.placeholder
										: styles.amountText
								}>
								{startDate == null
									? "MM/DD/YY"
									: moment(startDate).format(
											"MM/DD/yyyy"
										)}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.separator}></View>
					<View style={styles.dateView}>
						<Text style={styles.label}>
							{Translation.LABEL.END_DATE}
						</Text>
						<TouchableOpacity
							onPress={() => {
								setIsEndDate(true)
								setIsStartDate(false)
							}}
							style={styles.date}>
							<Text
								style={
									endDate == null
										? styles.placeholder
										: styles.amountText
								}>
								{endDate == null
									? "MM/DD/YY"
									: moment(endDate).format(
											"MM/DD/yyyy"
										)}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				{userType === UserType.Business && (
					<View style={styles.transactionTypeView}>
						<Text style={styles.label}>
							{Translation.LABEL.TRANSACTION_TYPE}
						</Text>
						<TransactionTypePicker
							items={items}
							selected={selIndexes}
							setSelected={setSelIndexes}
						/>
					</View>	
				)}
				<View style={styles.container}>
					<Text style={styles.specifySearch}>
						{Translation.REPORT.SPECIFY_TIME_PERIOD}
					</Text>
				</View>
			</ScrollView>
			{ !isStartDate && !isEndDate &&
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}>
					<View style={styles.bottomView}>
						<Button
							type={BUTTON_TYPES.PURPLE}
							title={Translation.BUTTON.SEND_REPORT}
							disabled={!goNext}
							onPress={() => {
								navigation.navigate(Routes.REPORT_SUCCESS);
							}}
						/>
					</View>
				</KeyboardAvoidingView>
			}

			<DateTimePicker
				isVisible={isStartDate}
				mode="date"
				date={startDate}
				onConfirm={onStartDateChange}
				onCancel={() => {setIsStartDate(false)}}
				textColor='black'
			/>
			<DateTimePicker
				isVisible={isEndDate}
				mode="date"
				date={endDate}
				onConfirm={onEndDateChange}
				minimumDate={startDate}
				onCancel={() => {setIsEndDate(false)}}
				textColor='black'
			/>
		</View>
	);
};

export default Report;