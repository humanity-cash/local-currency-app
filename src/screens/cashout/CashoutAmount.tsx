import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { TransactionsAPI } from 'src/api';
import { UserContext, WalletContext } from 'src/contexts';
import * as Routes from 'src/navigation/constants';
import DataLoading from 'src/screens/loadings/DataLoading';
import { BorderedInput, Button, CancelBtn, Dialog, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { dialogViewBase, underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { IMap } from "src/utils/types";
import { showToast } from '../../utils/common';
import { ToastType } from '../../utils/types';

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

const CashoutAmount = (): JSX.Element => {
	const navigation = useNavigation();
	const { customerDwollaId } = useContext(UserContext);
	const { customerWalletData } = useContext(WalletContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [maxAmount, setMaxAmount] = useState<string>("5.00")

	const [state, setState] = useState<CashoutState>({
		amount: "",
		costs: ""
	});

	const [goNext, setGoNext] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setGoNext(Boolean(state.costs));
	}, [state]);

	useEffect(() => {
		if(customerWalletData && customerWalletData?.availableBalance < 5) {
			setMaxAmount(`${customerWalletData.availableBalance}`)
		} else {
			setMaxAmount('5.00')
		}
	}, [customerWalletData])

	const onValueChange = (name: string, change: string) => {
		const amount = change.replace(',', '.')

		if(+amount <= +maxAmount) {
			setState({
				amount: amount,
				costs: amount,
			  } as CashoutState);
		}
	};

	const viewConfirm = () => {
		setIsVisible(true);
	}

	const doCashout = async () => {
		if (!customerDwollaId) {
			showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
			return;
		}

		setIsVisible(false);
		setIsLoading(true);
		const response = await TransactionsAPI.withdraw(
			customerDwollaId, 
			{amount: state.amount}
		);
		setIsLoading(false);

		if (response.data) {
			navigation.navigate(Routes.CASHOUT);
		} else {
			showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
		}
	}

	return (
		<View style={viewBase}>
			<DataLoading visible={isLoading} />
			<Header
				rightComponent={<CancelBtn text={"Close"} onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>{Translation.PAYMENT.CASH_OUT}</Text>
				</View>
				<View>
					<Text>{Translation.PAYMENT.CASH_OUT_DETAIL}</Text>
					<View style={ styles.formLabel }>
						<Text style={styles.labelText}>{Translation.LABEL.AMOUNT}</Text>
						<Text style={styles.labelText}>{`${Translation.LABEL.MAX_BERKSHARES} ${maxAmount}`}</Text>
					</View>
					<BorderedInput
						label="Amount"
						name="amount"
						keyboardType="decimal-pad"
						placeholder="Amount"
						prefix="B$"
						value={state.amount}
						onChange={onValueChange}
					/>
					<View style={styles.resultView}>
						<Text style={styles.resultText}>{Translation.PAYMENT.REDEMPTION_FEE} (1.5%)</Text>
						<Text style={styles.resultText}>{Translation.COMMON.USD} {(Number(state.amount) * 0.015).toFixed(2)}</Text>
					</View>
					<View style={styles.resultView}>
						<Text style={{ ...styles.resultText, fontWeight: 'bold' }}>{Translation.LOAD_UP.TOTAL_COSTS}</Text>
						<Text style={{ ...styles.resultText, fontWeight: 'bold' }}>{Translation.COMMON.USD} {(Number(state.amount) * 0.985).toFixed(2)}</Text>
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
							<Text>{`You will redeem ${Number(state.amount).toFixed(2)} BerkShares for USD ${(Number(state.amount)*0.985).toFixed(2)} after a 1.5% fee.`}</Text>
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