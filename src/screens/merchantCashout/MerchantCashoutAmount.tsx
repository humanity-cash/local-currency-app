import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BorderedInput, Dialog } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import { showToast } from '../../utils/common';
import { ToastType } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { showLoadingProgress, hideLoadingProgress } from '../../store/loading/loading.actions';
import { UserAPI } from 'src/api';
import { LoadingScreenTypes } from 'src/utils/types';
import { UserContext } from 'src/api/context';

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

const MerchantCashoutAmount = (): JSX.Element => {
	const navigation = useNavigation();
	const { businessDwollaId } = useContext(UserContext);
	const dispatch = useDispatch()
	const [amount, setAmount] = useState<string>("");
	const [goNext, setGoNext] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setGoNext(Number(amount) > 0);
	}, [amount]);

	const onValueChange = (name: string, change: string) => {
		setAmount(change);
	};

	const viewConfirm = () => {
		setIsVisible(true);
	}

	const doCashout = async () => {
		if (!businessDwollaId) {
			showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
			return;
		}

		setIsVisible(false);
		dispatch(showLoadingProgress(LoadingScreenTypes.LOADING_DATA))
		const response = await UserAPI.withdraw(
			businessDwollaId, 
			{amount: amount}
		);
		dispatch(hideLoadingProgress())

		if (response.data) {
			navigation.navigate(Routes.MERCHANT_REDEMPTION_IN_PROGRESS);
		} else {
			showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
		}
	}

	return (
		<View style={viewBaseB}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
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
						keyboardType="decimal-pad"
						placeholder="Amount"
						placeholderTextColor={colors.greyedPurple}
						prefix="B$"
						style={styles.input}
						textStyle={styles.text}
						value={amount}
						onChange={onValueChange}
					/>
					<View style={styles.resultView}>
						<Text style={styles.resultText}>{Translation.PAYMENT.REDEMPTION_FEE}(1.5%)</Text>
						<Text style={styles.resultText}>$ {(Number(amount)*0.015).toFixed(2)}</Text>
					</View>
					<View style={styles.resultView}>
						<Text style={styles.resultText}>{Translation.PAYMENT.NET_CASH_OUT}</Text>
						<Text style={styles.resultText}>$ {(Number(amount)*0.985).toFixed(2)}</Text>
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.PURPLE}
						disabled={!goNext}
						title={Translation.BUTTON.CONFIRM}
						onPress={viewConfirm}
					/>
				</View>
			</KeyboardAvoidingView>

			{ isVisible && (
				<Dialog visible={isVisible} onClose={()=>setIsVisible(false)} backgroundStyle={styles.dialogBg}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>{Translation.PAYMENT.CASH_OUT_CONFIRM}</Text>
							<Text style={styles.resultText}>{Translation.PAYMENT.CASH_OUT_CONFIRM_DETAIL}</Text>
						</View>
						<Button
							type={BUTTON_TYPES.PURPLE}
							title={Translation.BUTTON.CASH_OUT}
							onPress={doCashout}
						/>
					</View>
				</Dialog>
			)}
		</View>
	);
}

export default MerchantCashoutAmount