import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet, TouchableOpacity, View
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import { BUTTON_TYPES } from "src/constants";
import { merchantTransactions } from "src/mocks/transactionTypes";
import * as Routes from "src/navigation/constants";
import { BackBtn, Button, CancelBtn, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
    underlineHeaderB,
    viewBaseB,
    wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";

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
		marginBottom: 30,
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
		paddingVertical: 5,
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
		marginVertical: 5,
		alignItems: "center",
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
	typeView: {
		height: 55,
		justifyContent: "center",
		marginTop: 7,
		backgroundColor: colors.white,
	},
	pickerView: {
		color: colors.purple,
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
});

const enum ReportType {
	ALL = "",
	TODAY = "Today",
	WEEK = "Week",
	MONTH = "Month",
}

const Report = (): JSX.Element => {
	const navigation = useNavigation();
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>();
	const [isStartDate, setIsStartDate] = useState<boolean>(false);
	const [isEndDate, setIsEndDate] = useState<boolean>(false);
	const [selectedType, setSelectedType] = useState<string>("");
	const [goNext, setGoNext] = useState(false);
	const [reportType, setReportType] = useState<ReportType>(ReportType.ALL);
	const { userType } = useContext(AuthContext);

	useEffect(() => {
		setGoNext(true);
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onStartDateChange = (event: any, selectedDate?: Date) => {
		const currentDate = selectedDate || startDate;
		setIsStartDate(Platform.OS === "ios");
		setStartDate(currentDate);
		setReportType(ReportType.ALL);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onEndDateChange = (event: any, selectedDate?: Date) => {
		const currentDate = selectedDate || startDate;
		setIsEndDate(Platform.OS === "ios");
		setEndDate(currentDate);
		setReportType(ReportType.ALL);
	};

	const onConfirm = () => {
		navigation.navigate(Routes.CASHIER_DASHBOARD);
	};

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={
					<BackBtn
						color={colors.purple}
						onClick={() => navigation.goBack()}
					/>
				}
				rightComponent={
					<CancelBtn
						color={colors.purple}
						text={Translation.BUTTON.CLOSE}
						onClick={onConfirm}
					/>
				}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={styles.container}>
					<View style={underlineHeaderB}>
						<Text style={styles.headerText}>
							{Translation.REPORT.MAKE_REPORT}
						</Text>
					</View>
					<View style={styles.content}>
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
								onPress={() => setReportType(ReportType.TODAY)}>
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
								onPress={() => setReportType(ReportType.WEEK)}>
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
								onPress={() => setReportType(ReportType.MONTH)}>
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
									onPress={() => setIsStartDate(true)}
									style={styles.date}>
									<Text
										style={
											startDate == null
												? styles.placeholder
												: styles.amountText
										}>
										{startDate == null
											? "DD/MM/YY"
											: moment(startDate).format(
													"DD/MM/yyyy"
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
									onPress={() => setIsEndDate(true)}
									style={styles.date}>
									<Text
										style={
											endDate == null
												? styles.placeholder
												: styles.amountText
										}>
										{endDate == null
											? "DD/MM/YY"
											: moment(endDate).format(
													"DD/MM/yyyy"
											  )}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						{userType === UserType.MERCHANT && (
							<View>
								<Text style={styles.label}>
									{Translation.LABEL.TRANSACTION_TYPE}
								</Text>
								<View style={styles.typeView}>
									<Picker
										selectedValue={selectedType}
										style={styles.pickerView}
										onValueChange={(itemValue) =>
											setSelectedType(itemValue)
										}>
										<Picker.Item
											label="All"
											value=""
											style={styles.amountText}
										/>
										{merchantTransactions.map(
											(u: string) => (
												<Picker.Item
													label={u}
													value={u}
													key={u}
													style={styles.amountText}
												/>
											)
										)}
									</Picker>
								</View>
							</View>
						)}
					</View>
					<Text style={styles.specifySearch}>
						{Translation.REPORT.SPECIFY_TIME_PERIOD}
					</Text>
				</View>
			</ScrollView>
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
};

export default Report;
