import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { UserContext } from "src/contexts";
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
		marginHorizontal: 20,
		marginBottom: 20
	},
});

const ReportSuccess = (): JSX.Element => {
	const navigation = useNavigation();
	const { userType } = useContext(UserContext);

	const onConfirm = () => {
		if (userType === UserType.Business) {
			navigation.navigate(Routes.MERCHANT_DASHBOARD);
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
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.COMMON.SUCCEEDED}</Text>
				</View>
				<Text style={styles.text}>{Translation.REPORT.SENT_REPORT} fennie@humanity.cash</Text>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.PURPLE}
					title={Translation.BUTTON.GO_BACK_HOME}
					onPress={onConfirm}
				/>
			</SafeAreaView>
		</View>
	);
}

export default ReportSuccess