import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BackBtn, CancelBtn, ModalHeader } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, modalBaseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

type WalletMinimumSelectPaymentProps = {
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
	text: {
		fontSize: 20,
		lineHeight: 60,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrow: {
		marginVertical: 15
	},
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		marginBottom: 5
	}
});

const WalletMinimumSelectPayment = (props: WalletMinimumSelectPaymentProps) => {
	const navigation = useNavigation();
	const { onClose, amount } = props.route.params;
	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={onClose} />}
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text style={modalBaseHeader}>Select a payment method</Text>
					</View>
					<View style={{ marginTop: 10 }}>
						<TouchableWithoutFeedback onPress={() => props.navigation.navigate('WalletCreditCard', { amount })}>
							<View style={styles.view}>
								<Text style={styles.text}>Credit card</Text>
								<AntDesign
									style={styles.arrow}
									name="arrowright"
									size={30}
									color={colors.text}
								/>
							</View>
						</TouchableWithoutFeedback>
						<View style={{ ...styles.view, opacity: 0.5 }}>
							<Text style={styles.text}>Direct deposit</Text>
							<AntDesign
								style={styles.arrow}
								name="arrowright"
								size={30}
								color={colors.text}
							/>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

export default WalletMinimumSelectPayment