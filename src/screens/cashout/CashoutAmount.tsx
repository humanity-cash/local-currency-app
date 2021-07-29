import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BorderedInput, Dialog } from "src/shared/uielements";
import { underlineHeader, viewBase, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Cashout from "./Cashout";

type CashoutAmountProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	formLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	labelText: {
		marginTop: 5, 
		color: colors.text, 
		fontSize: 12
	},
	resultView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 20,
		paddingLeft: 20, 
		paddingRight: 20
	},
	resultText: {
		fontSize: 16,
		lineHeight: 20,
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	modalWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
	},
	modalHeader: {
		fontFamily: "IBMPlexSansSemiBold",
		fontSize: 30,
		lineHeight: 35,
		marginTop: 20,
		marginBottom: 10,
	},
});

const CashoutAmount = (props: CashoutAmountProps) => {

	const [state, setState] = useState({
		amount: "1",
		costs: "1"
	});
	const [goNext, setGoNext] = useState(false);
	const [confirmView, setConfirmView] = useState(false);
	const [cashout, setCashout] = useState(false);

	useEffect(() => {
		setGoNext(state.costs !== "");
	}, [state]);

	const onValueChange = (name: any, change: any) => {
		const costs = change;
		setState({
		  ...state,
		  [name]: change,
		  costs: costs,
		} as any);
		// update({ [name]: change });
	};

	const onCashoutClose = () => {
		setCashout(false);
	}

	const viewCashout = () => {
		setConfirmView(false);
		setCashout(true);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text={"Close"} onClick={() => props.navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>Cash out to USD$</Text>
				</View>
				<View>
					<Text>Select the amount of BerkShares you would like to redeem to USD Dollar. Please note that the maximum amount is $ 2,000.00 and you can not exceed your account balance.</Text>
					<View style={{ ...styles.formLabel, marginTop: 20 }}>
						<Text style={styles.labelText}>AMOUNT</Text>
						<Text style={styles.labelText}>Max. B$ 2,000.00</Text>
					</View>
					<BorderedInput
						label="Amount"
						name="amount"
						keyboardType="number-pad"
						placeholder="Amount"
						prefix="B$"
						value={state.amount}
						onChange={onValueChange}
					/>
					<View style={styles.resultView}>
						<Text style={styles.resultText}>Redemption fee (1,5%)</Text>
						<Text style={styles.resultText}>USD$ -</Text>
					</View>
					<View style={styles.resultView}>
						<Text style={{ ...styles.resultText, fontWeight: 'bold' }}>Total costs</Text>
						<Text style={{ ...styles.resultText, fontWeight: 'bold' }}>USD$ -</Text>
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						disabled={!goNext}
						title="Confirm"
						onPress={() => setConfirmView(true)}
					/>
				</View>
			</KeyboardAvoidingView>

			{ confirmView && (
				<Dialog visible={confirmView}>
					<View style={{ ...modalViewBase, height: "100%", padding: 20 }}>
						<View style={styles.modalWrap}>
							<Text style={styles.modalHeader}>Are you sure you want to cash out?</Text>
							<Text>You will redeem 100 BerkShares for USD$ 98,50 after a 1,5% fee.</Text>
						</View>
						<Button
							type="darkGreen"
							title="Cash out to USD$"
							onPress={viewCashout}
						/>
					</View>
				</Dialog>
			)}

			<Cashout onClose={onCashoutClose} visible={cashout} />
		</View>
	);
}

export default CashoutAmount