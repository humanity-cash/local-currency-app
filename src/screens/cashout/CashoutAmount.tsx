import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BorderedInput, Dialog } from "src/shared/uielements";
import { underlineHeader, viewBase, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { IMap, LoadingScreenTypes } from "src/utils/types";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/core';
import { UserAPI } from 'src/api';
import { AuthContext } from '../../auth/index';
import { showToast } from '../../utils/common';
import { ToastType } from '../../utils/types';
import { showLoadingProgress, hideLoadingProgress } from '../../store/loading/loading.actions';
import { useDispatch } from 'react-redux';

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
	const { customerDwollaId } = useContext(AuthContext);
	const dispatch = useDispatch()

	const [state, setState] = useState<CashoutState>({
		amount: "1",
		costs: "1"
	});
	const [goNext, setGoNext] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const maxAmount = 5

	useEffect(() => {
		setGoNext(state.costs !== "");
	}, [state]);

	const onValueChange = (name: string, change: string) => {
		const costs = change.replace(',', '.');
		if (Number(costs) > maxAmount) {
			showToast(ToastType.ERROR, "Whoops, something went wrong.", "Please note that the maximum amount is B$ 5.00");
			return
		}

		setState({
		  amount: costs,
		  costs: costs,
		} as CashoutState);
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
		dispatch(showLoadingProgress(LoadingScreenTypes.LOADING_DATA))
		const response = await UserAPI.withdraw(
			customerDwollaId, 
			{amount: state.amount}
		);
		dispatch(hideLoadingProgress())

		if (response.data) {
			navigation.navigate(Routes.CASHOUT);
		} else {
			showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
		}
	}

	return (
		<View style={viewBase}>
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
						<Text style={styles.labelText}>{Translation.LABEL.MAX_BERKSHARES}</Text>
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
						<Text style={styles.resultText}>$ {Number(state.amount) > 0 ? (Number(state.amount)*0.015).toFixed(2) : '-'}</Text>
					</View>
					<View style={styles.resultView}>
						<Text style={{ ...styles.resultText, fontWeight: 'bold' }}>{Translation.LOAD_UP.NET_CASH_OUT}</Text>
						<Text style={{ ...styles.resultText, fontWeight: 'bold' }}>$ {Number(state.amount) > 0 ? (Number(state.amount)*0.985).toFixed(2) : '-'}</Text>
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