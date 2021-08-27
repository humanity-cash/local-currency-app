import React, {useState, useEffect, ReactElement} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BorderedInput, Dialog } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type MerchantPayoutToPersonalProps = {
	navigation?: any,
	route?: any,
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
	}
});

const MerchantCashoutAmount = (props: MerchantPayoutToPersonalProps): ReactElement => {

	const [amount, setAmount] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		setGoNext(amount != "");
	}, [amount]);

	const onValueChange = (name: string, change: string) => {
		setAmount(change);
	};

    const doScan = () => {
        setIsVisible(false);
        props.navigation.navigate(Routes.MERCHANT_PAYOUT_QR_SCAN);
    }

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text={"Close"} color={colors.purple} onClick={() => props.navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PAYMENT.PAYOUT_IN}</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>{Translation.PAYMENT.SELECT_PAYOUT_AMOUNT}</Text>
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
						value={amount}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						disabled={!goNext}
						title="Confirm"
						onPress={()=>setIsVisible(true)}
					/>
				</View>
			</KeyboardAvoidingView>

            { isVisible && (
				<Dialog visible={isVisible} onClose={()=>setIsVisible(false)} backgroundStyle={styles.dialogBg}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>{Translation.PAYMENT.SCAN_QR}</Text>
							<Text style={styles.bodyText}>{Translation.PAYMENT.SCAN_QR_DETAIL}</Text>
						</View>
						<Button
							type="purple"
							title="Scan"
							onPress={doScan}
						/>
					</View>
				</Dialog>
			)}
		</View>
	);
}

export default MerchantCashoutAmount