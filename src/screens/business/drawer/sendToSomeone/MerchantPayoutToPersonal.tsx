import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState, useContext } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { BackBtn, BorderedInput, Button, CancelBtn, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { UserContext, WalletContext } from 'src/contexts';
import { TransactionsAPI } from 'src/api';
import { LoadingPage } from 'src/views'

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
		marginHorizontal: 20,
		marginBottom: 20
	}
});

const MerchantCashoutAmount = (): JSX.Element => {
	const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const { businessWalletData } = useContext(WalletContext);
    const { availableBalance } = businessWalletData;
    const verifiedBusiness = Boolean(user?.verifiedBusiness);
    const verifiedCustomer = Boolean(user?.verifiedCustomer);
    const businessDwollaId = user?.business?.dwollaId;

	const [amount, setAmount] = useState<string>('');
	const [goNext, setGoNext] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setGoNext(Boolean(amount));
	}, [amount]);

	const onValueChange = (name: string, change: string) => {
        if(Number(change) > Number(availableBalance)) return;
		setAmount(change.replace(',', '.'));
	};

    const handlePayment = async () => {
        const toUserId = user?.customer?.dwollaId;
        if (!toUserId || !businessDwollaId) return;
        setIsLoading(true);
        const request = {
            toUserId,
            amount,
            comment: ''
        };
        const response = await TransactionsAPI.transferTo(businessDwollaId, request);
        setIsLoading(false);
        if(response.data) {
            navigation.navigate(Routes.MERCHANT_PAYOUT_SUCCESS);
        } else {
            // FIXME: ADD ERROR TOAST
            navigation.navigate(Routes.MERCHANT_DASHBOARD);
        }
    }

    return (
        <KeyboardAvoidingView
            {...(Platform.OS === 'ios' && { behavior: 'padding' })}
            style={viewBaseB}>
            <Header
                leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
                rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
            />
            <LoadingPage visible={isLoading} isPayment={true} />
            <ScrollView style={wrappingContainerBase}>
                <View style={underlineHeaderB}>
                    <Text style={styles.headerText}>{Translation.PAYMENT.PAYOUT_SOMEONE}</Text>
                </View>
                <View>
                    <Text style={styles.bodyText}>{Translation.PAYMENT.SELECT_PAYOUT_AMOUNT}</Text>
                    <View style={styles.formLabel}>
                        <Text style={styles.labelText}>{Translation.LABEL.AMOUNT}</Text>
                        <Text style={styles.labelText}>{`${Translation.LABEL.MAX_BERKSHARES} ${availableBalance.toFixed(2)}`}</Text>
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
                </View>
            </ScrollView>
            <SafeAreaView style={styles.bottomView}>
                <Button
                    type={BUTTON_TYPES.PURPLE}
                    disabled={!goNext || !verifiedCustomer || !verifiedBusiness}
                    title={Translation.BUTTON.CONFIRM}
                    onPress={handlePayment}
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default MerchantCashoutAmount

// onPress={()=> navigation.navigate(Routes.MERCHANT_PAYOUT_PENDING)}
