import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View, Keyboard } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button'
import { modalViewBase, baseHeader, wrappingContainerBase, modalBaseHeader } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { usePaymentDetails } from "../../hooks/usePaymentDetails";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { MODAL_SCREEN_OFFSET } from "../../uielements/Modal";
import { BorderedInput } from "../../uielements/BorderedInput";
import { colors } from "../../theme/colors";

interface MissingAddCashState {
	amount: string
}

type AddCashProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	view: {
		marginTop: 10
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		marginRight: 10,
		fontFamily: 'IBMPlexSansSemiBold',
	}
});

const MissingAddCashView = (props: AddCashProps) => {
	const { update } = usePaymentDetails();
	const [state, setState] = useState<MissingAddCashState>({
		amount: '1000'
	});
	const [goNext, setGoNext] = useState(false);
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		update({ amount: state.amount });
	}, []);

	useEffect(() => {
		setGoNext(Object.keys(state).every((key) => state[key] !== ''));
	}, [state]);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change
		} as any)
		update({ [name]: change });
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>Add cash</Text>
					</View>
					<View style={styles.view}>
						{showError && (<Text h3 style={{ marginTop: 5, color: colors.textError}}>Minimum amount is CHF 1,000</Text>)}
						<BorderedInput
							label="Amount"
							keyboardType="number-pad"
							name="amount"
							prefix="CHF"
							value={state.amount}
							onChange={onValueChange}
						/>
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
			>
				<Button
					type="fluidDark"
					title="NEXT"
					disabled={!goNext}
					onPress={() => {
						Keyboard.dismiss();
						if (parseFloat(state.amount) < 1000) {
							setShowError(true);
							return;
						}
						props.navigation.navigate('MissingSelectPayment')
					}}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const MissingAddCash = (props: AddCashProps) => {
	const navigation = useNavigation();
	return <MissingAddCashView {...props} navigation={navigation} />;
}
export default MissingAddCash