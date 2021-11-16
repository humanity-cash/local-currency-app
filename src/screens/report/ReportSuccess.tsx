
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from "src/auth";
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { Button, CancelBtn, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { UserType } from "src/auth/types";

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

const ReportSuccess = (): JSX.Element => {
	const navigation = useNavigation();
	const { userType } = useContext(AuthContext);

	const onConfirm = () => {
		if (userType === UserType.Business) {
			navigation.navigate(Routes.BUSINESS_DASHBOARD);
		} else {
			navigation.navigate(Routes.CASHIER_DASHBOARD);
		}
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
						type={BUTTON_TYPES.PURPLE}
						title={Translation.BUTTON.GO_BACK_HOME}
						onPress={onConfirm}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default ReportSuccess