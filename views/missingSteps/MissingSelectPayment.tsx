import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { modalViewBase, baseHeader, viewBase, wrappingContainerBase, modalBaseHeader } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { colors } from "../../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { SettingsListItem } from "../../uielements/cards/SettingsListItem";

type MissingSelectPaymentProps = {
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
	}
});

const MissingSelectPaymentView = (props: MissingSelectPaymentProps) => {
	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>Select a payment method</Text>
					</View>
					<SettingsListItem
						onPress={() => props.navigation.navigate('MissingPickCard')}
						name="Credit card"
					/>
					<SettingsListItem
						onPress={() => props.navigation.navigate('MissingDeposit')}
						name="Direct deposit (takes 2 days)"
					/>
				</View>
			</View>
		</View>
	);
}

const MissingSelectPayment = (props: MissingSelectPaymentProps) => {
	const navigation = useNavigation();
	return <MissingSelectPaymentView {...props} navigation={navigation} />;
}
export default MissingSelectPayment