import React, {useState, useEffect, ReactElement} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BorderedInput, Dialog } from "src/shared/uielements";
import { underlineHeader, viewBase, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { IMap } from "src/utils/types";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type CashoutAmountProps = {
	navigation?: any,
	route?: any,
}

interface CashoutState extends IMap {
	amount: string;
	costs: string;
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	formLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20
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
	dialogWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
	},
	dialogHeader: {
		fontSize: 30,
		lineHeight: 32,
		marginTop: 20,
		marginBottom: 10,
	},
	dialogBottom: {
		paddingTop: 20,
	}
});

const CashoutAmount = (props: CashoutAmountProps): ReactElement => {

	const [state, setState] = useState<CashoutState>({
		amount: "1",
		costs: "1"
	});
	const [goNext, setGoNext] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setGoNext(state.costs !== "");
	}, [state]);

	const onValueChange = (name: string, change: string) => {
		const costs = change;
		setState({
		  amount: change,
		  costs: costs,
		} as CashoutState);
	};

	const viewConfirm = () => {
		setIsVisible(true);
	}

	const doCashout = () => {
		setIsVisible(false);
		props.navigation.navigate(Routes.CASHOUT);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text={"Close"} onClick={() => props.navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>{Translation.PAYMENT.CASH_OUT}</Text>
				</View>
				<View>
					<Text>{Translation.PAYMENT.CASH_OUT_DETAIL}</Text>
					<View style={ styles.formLabel }>
						<Text style={styles.labelText}>{Translation.LABEL.AMOUNT}</Text>
						<Text style={styles.labelText}>{Translation.LABEL.MAX_BERKSHARES}</Text>
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
						<Text style={styles.resultText}>{Translation.PAYMENT.REDEMPTION_FEE} (1.5%)</Text>
						<Text style={styles.resultText}>{Translation.COMMON.USD} -</Text>
					</View>
					<View style={styles.resultView}>
						<Text style={{ ...styles.resultText, fontWeight: 'bold' }}>{Translation.LOAD_UP.TOTAL_COSTS}</Text>
						<Text style={{ ...styles.resultText, fontWeight: 'bold' }}>{Translation.COMMON.USD} -</Text>
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						disabled={!goNext}
						title={Translation.BUTTON.CONFIRM}
						onPress={viewConfirm}
					/>
				</View>
			</KeyboardAvoidingView>

			{ isVisible && (
				<Dialog visible={isVisible} onClose={()=>setIsVisible(false)}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>{Translation.PAYMENT.CASH_OUT_CONFIRM}</Text>
							<Text>{Translation.PAYMENT.CASH_OUT_CONFIRM_DETAIL}</Text>
						</View>
						<View style={styles.dialogBottom}>
							<Button
								type="darkGreen"
								title={Translation.BUTTON.CASH_OUT}
								onPress={doCashout}
							/>
						</View>
					</View>
				</Dialog>
			)}
		</View>
	);
}

export default CashoutAmount