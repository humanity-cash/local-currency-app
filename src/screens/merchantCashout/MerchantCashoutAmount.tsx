import React, {useState, useEffect, ReactElement} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BorderedInput, Dialog } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { IMap } from "src/utils/types";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type MerchantCashoutAmountProps = {
	navigation?: any,
	route?: any,
}

interface MerchantCashoutState extends IMap {
	amount: string;
	costs: string;
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	formLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20
	},
	bodyText: {
		marginTop: 5, 
		color: colors.bodyText, 
		fontSize: 16
	},
	labelText: {
		marginTop: 5, 
		color: colors.bodyText, 
		fontSize: 12
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	text: {
		color: colors.purple
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
		color: colors.purple
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 45
	},
	dialogBg: {
        backgroundColor: colors.overlayPurple
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
		color: colors.purple
	},
	dialogBottom: {
		paddingTop: 20,
	}
});

const MerchantCashoutAmount = (props: MerchantCashoutAmountProps): ReactElement => {

	const [state, setState] = useState<MerchantCashoutState>({
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
		} as MerchantCashoutState);
	};

	const viewConfirm = () => {
		setIsVisible(true);
	}

	const doCashout = () => {
		setIsVisible(false);
		props.navigation.navigate(Routes.MERCHANT_CASHOUT_PASSWORD);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => props.navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PAYMENT.CASH_OUT}</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>{Translation.PAYMENT.CASH_OUT_DETAIL}</Text>
					<View style={styles.formLabel}>
						<Text style={styles.labelText}>{Translation.LABEL.AMOUNT}</Text>
						<Text style={styles.labelText}>{Translation.LABEL.MAX_BERKSHARES}</Text>
					</View>
					<BorderedInput
						label="Amount"
						name="amount"
						keyboardType="number-pad"
						placeholder="Amount"
						placeholderTextColor={colors.greyedPurple}
						prefix="B$"
						style={styles.input}
						textStyle={styles.text}
						value={state.amount}
						onChange={onValueChange}
					/>
					<View style={styles.resultView}>
						<Text style={styles.resultText}>{Translation.PAYMENT.REDEMPTION_FEE}(1.5%)</Text>
						<Text style={styles.resultText}>$ -</Text>
					</View>
					<View style={styles.resultView}>
						<Text style={styles.resultText}>{Translation.PAYMENT.NET_CASH_OUT}</Text>
						<Text style={styles.resultText}>$ -</Text>
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						disabled={!goNext}
						title="Confirm"
						onPress={viewConfirm}
					/>
				</View>
			</KeyboardAvoidingView>

			{ isVisible && (
				<Dialog visible={isVisible} onClose={()=>setIsVisible(false)} backgroundStyle={styles.dialogBg}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>Are you sure you want to cash out?</Text>
							<Text style={styles.resultText}>You will redeem 100 BerkShares for USD$ 98,50 after a 1,5% fee.</Text>
						</View>
						<Button
							type="purple"
							title="Cash out to USD"
							onPress={doCashout}
						/>
					</View>
				</Dialog>
			)}
		</View>
	);
}

export default MerchantCashoutAmount