import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { modalViewBase, baseHeader, wrappingContainerBase } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { colors } from "../../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";

type WalletSelectPaymentProps = {
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

const WalletSelectPaymentView = (props: WalletSelectPaymentProps) => {
	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text style={styles.header}>Select a payment method</Text>
					</View>
					<TouchableWithoutFeedback onPress={() => props.navigation.navigate('WalletPickCard')}>
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
					<TouchableWithoutFeedback onPress={() => props.navigation.navigate('WalletDeposit')}>
						<View style={styles.view}>
							<Text style={styles.text}>Direct deposit (takes 2 days)</Text>
							<AntDesign
								style={styles.arrow}
								name="arrowright"
								size={30}
								color={colors.text}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</View>
	);
}

const WalletSelectPayment = (props: WalletSelectPaymentProps) => {
	const navigation = useNavigation();
	return <WalletSelectPaymentView {...props} navigation={navigation} />;
}
export default WalletSelectPayment