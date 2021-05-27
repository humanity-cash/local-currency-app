import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Header } from "../../uielements/header/Header";
import { baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { NextBtn } from "../../uielements/header/NextBtn";
import { colors } from "../../theme/colors";
import { AntDesign } from "@expo/vector-icons";

type SelectPaymentProps = {
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

const SelectPaymentView = (props: SelectPaymentProps) => {
	console.log('render SelectPaymentView');
	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<NextBtn text="Skip" onClick={() => props.navigation.navigate('OnboardingSteps', { step: 5 })} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1>Select a payment method</Text>
				</View>
				<TouchableWithoutFeedback onPress={() => props.navigation.navigate('CreditCard')}>
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
				<TouchableWithoutFeedback onPress={() => props.navigation.navigate('Deposit')}>
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
	);
}

const SelectPayment = (props: SelectPaymentProps) => {
	const navigation = useNavigation();
	return <SelectPaymentView {...props} navigation={navigation} />;
}
export default SelectPayment