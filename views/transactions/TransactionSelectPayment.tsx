import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { modalViewBase, baseHeader, wrappingContainerBase, modalBaseHeader } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { colors } from "../../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { usePaymentDetails } from "../../hooks/usePaymentDetails";
import { SettingsListItem } from "../../uielements/cards/SettingsListItem";

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