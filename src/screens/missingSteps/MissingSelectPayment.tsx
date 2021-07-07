import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BackBtn, CancelBtn, ModalHeader, SettingsListItem } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

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