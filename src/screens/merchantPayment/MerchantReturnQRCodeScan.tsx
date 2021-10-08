import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { useCameraPermission } from 'src/hooks';
import { Header, CancelBtn, BackBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/core';
import { QRCodeEntry, SECURITY_ID, PaymentMode, ToastType } from 'src/utils/types';
import { showToast, calcFee } from 'src/utils/common';
import { modalViewBase, wrappingContainerBase, underlineHeaderB } from "src/theme/elements";
import { Modal, ModalHeader, BorderedInput, Button } from "src/shared/uielements";
import { BUTTON_TYPES } from 'src/constants';
import { ITransactionRequest } from 'src/api/types';
import { UserAPI } from 'src/api';

type HandleScaned = {
	type: string,
	data: string,
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	toggleView: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: 200,
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	contentView: { 
		marginTop: 5
	},
	label: { 
		color: colors.text, 
		fontSize: 12 
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	text: {
		color: colors.purple
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	transactionDetailView: {
		padding: 20,
		marginBottom: 20, 
		borderRadius: 3,
		backgroundColor: colors.white
	},
	transactionDetailAmount: {
		fontSize: 32,
		color: colors.purple,
		marginVertical: 20,
		fontWeight: 'bold',
		lineHeight: 32,
		textAlign: 'center'
	},
	inlineView: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

const MerchantReturnQRCodeScan = (): JSX.Element => {
	const navigation = useNavigation();
	const { businessDwollaId } = useContext(AuthContext);
	const hasPermission = useCameraPermission();
	const [isScanned, setIsScanned] = useState<boolean>(false);
	const [isReturnModal, setIsReturnModal] = useState<boolean>(false);
	const [amount, setAmount] = useState<string>("");
	const [goNext, setGoNext] = useState<boolean>(false);
	const [state, setState] = useState<QRCodeEntry>({
		securityId: SECURITY_ID,
		to: "",
		amount: 0,
		mode: PaymentMode.SELECT_AMOUNT
	});

	useEffect(() => {
		setIsScanned(false);
	}, []);

	useEffect(() => {
		setGoNext(amount !== "");
	}, [amount]);

	const handleBarCodeScanned = (data: HandleScaned) => {
		try {
			setState(JSON.parse(data.data) as QRCodeEntry);
			setIsScanned(true);
			setIsReturnModal(true);
		} catch (e) {
			showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
		}
	}

	if (hasPermission === false) {
		return <Text>{Translation.OTHER.NO_CAMERA_PERMISSION}</Text>;
	}

	const onValueChange = (name: string, change: string) => {
		setAmount(change);
	}

	const onReturn = async () => {
		const amountCalcedFee = state.amount - calcFee(state.amount);

		if (businessDwollaId) {
			const request: ITransactionRequest = {
				toUserId: state.to,
				amount: amountCalcedFee.toString(),
				comment: ''
			};
			const response = await UserAPI.transferTo(businessDwollaId, request);
			if (response.data) {
				navigation.navigate(Routes.MERCHANT_PAYMENT_SUCCESS);
			} else {
				showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
				navigation.navigate(Routes.MERCHANT_DASHBOARD);
			}
		} else {
			showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
		}
		navigation.navigate(Routes.MERCHANT_PAYMENT_SUCCESS);
	}

	const onModalClose = () => {
		setIsReturnModal(false);
		navigation.navigate(Routes.MERCHANT_DASHBOARD);
	}

	return (
		<View style={viewBase}>
			<View style={styles.container}>
				<BarCodeScanner
					onBarCodeScanned={isScanned ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
			</View>
			<View style={styles.toggleView}>
				<Header
					rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.white} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
				/>
			</View>

			{isReturnModal && (
				<Modal visible={isReturnModal}>
					<View style={ modalViewBase }>
						<ModalHeader
							leftComponent={<BackBtn color={colors.purple} onClick={() => setIsReturnModal(false)} />}
							rightComponent={<CancelBtn text="Close" onClick={onModalClose} />}
						/>
						<ScrollView style={wrappingContainerBase}>
							<View style={underlineHeaderB}>
								<Text style={styles.headerText}>{Translation.PAYMENT.SEND_RETURN}</Text>
							</View>
							<View style={styles.contentView}>
								<Text style={styles.label}>{Translation.LABEL.TRANSACTION_DETAILS}</Text>
								<View style={styles.transactionDetailView}>
									<Text style={styles.transactionDetailAmount}>B$ {state.amount.toFixed(2)}</Text>
									<View style={styles.inlineView}>
										<Text style={styles.label}>TRANSACTION ID</Text>
										<Text style={styles.label}>{state.transactionId}</Text>
									</View>
									<View style={styles.inlineView}>
										<Text style={styles.label}>TYPE</Text>
										<Text style={styles.label}>CUSTOMER SALE</Text>
									</View>
									<View style={styles.inlineView}>
										<Text style={styles.label}>DATE</Text>
										<Text style={styles.label}>{state.transactionDate}</Text>
									</View>
								</View>

								<Text style={styles.label}>{Translation.LABEL.RETURN_AMOUNT}</Text>
								<BorderedInput
									label="Amount"
									name="amount"
									keyboardType="number-pad"
									placeholder="Amount"
									placeholderTextColor={colors.greyedPurple}
									prefix="B$"
									style={styles.input}
									textStyle={styles.text}
									value={amount}
									onChange={onValueChange}
								/>
							</View>
						</ScrollView>
						<KeyboardAvoidingView
							behavior={Platform.OS == "ios" ? "padding" : "height"} >
							<View style={styles.bottomView}>
								<Button
									type={BUTTON_TYPES.PURPLE}
									disabled={!goNext}
									title={Translation.BUTTON.RETURN_AMOUNT}
									onPress={onReturn}
								/>
							</View>
						</KeyboardAvoidingView>
					</View>
				</Modal>
			)}
		</View>
	);
}

export default MerchantReturnQRCodeScan