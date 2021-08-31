import React, { ReactElement } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { AccountType } from 'src/utils/types';
import { useAccountType } from "src/hooks";

type ReportSuccessProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	text: {
		color: colors.bodyText
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
});

const ReportSuccess = (props: ReportSuccessProps): ReactElement => {
	const { details } = useAccountType();

	const onConfirm = () => {
		details.accountType === AccountType.MERCHANT ? props.navigation.navigate(Routes.MERCHANT_DASHBOARD) : props.navigation.navigate(Routes.CASHIER_DASHBOARD);
	}

	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={onConfirm} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.COMMON.SUCCEEDED}</Text>
				</View>
				<Text style={styles.text}>{Translation.REPORT.SENT_REPORT} fennie@humanity.cash</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						title={Translation.BUTTON.GO_BACK_HOME}
						onPress={onConfirm}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default ReportSuccess