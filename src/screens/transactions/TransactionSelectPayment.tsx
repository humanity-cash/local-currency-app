import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { usePaymentDetails } from "src/hooks";
import { BackBtn, CancelBtn, ModalHeader, SettingsListItem } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, modalBaseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

type TransactionSelectPaymentProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	view: {
		marginTop: 5,
		backgroundColor: colors.white,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	header: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 20,
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrow: {
		marginVertical: 15
	}
});

const TransactionSelectPaymentView = (props: TransactionSelectPaymentProps) => {
	const { details } = usePaymentDetails();
	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text style={modalBaseHeader}>Select a payment method</Text>
					</View>
					<SettingsListItem
						onPress={() => props.navigation.navigate('BuyTransactionPickCard')}
						name="Credit card"
					/>
					<SettingsListItem
						onPress={() => props.navigation.navigate('BuyTransactionDeposit')}
						name="Direct deposit (takes 2 days)"
					/>
				</View>
			</View>
		</View>
	);
}

const TransactionSelectPayment = (props: TransactionSelectPaymentProps) => {
	const navigation = useNavigation();
	return <TransactionSelectPaymentView {...props} navigation={navigation} />;
}
export default TransactionSelectPayment