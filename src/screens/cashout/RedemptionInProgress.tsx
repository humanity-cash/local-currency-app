import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn } from "src/shared/uielements";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type RedemptionInProgressProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
});

const RedemptionInProgressView = (props: RedemptionInProgressProps) => {

	return (
		<View style={modalViewBase}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} onClick={() => props.navigation.navigate(Routes.DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.PAYMENT.REDEMPTION_PROCESS}</Text>
				</View>
				<View>
					<Text>{Translation.PAYMENT.REDEMPTION_PROCESS_DETAIL}</Text>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title={Translation.BUTTON.GO_BACK_HOME}
						onPress={() => props.navigation.navigate(Routes.DASHBOARD)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}


const RedemptionInProgress = (props:RedemptionInProgressProps): ReactElement => {
	const navigation = useNavigation();
	return <RedemptionInProgressView {...props} navigation={navigation} />;
}
export default RedemptionInProgress