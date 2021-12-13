import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch } from 'react-redux';
import { ITransaction } from "src/api/types";
import { UserContext, WalletContext } from 'src/contexts';
import { useBrightness, useUpdateCustomerWalletData } from "src/hooks";
import { Dialog } from "src/shared/uielements";
import { loadPersonalTransactions } from 'src/store/transaction/transaction.actions';
import { colors } from "src/theme/colors";
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode, QRCodeEntry, SECURITY_ID } from "src/utils/types";

const styles = StyleSheet.create({
    dialog: {
        height: 440
    },
	dialogWrap: {
        position: 'relative',
		paddingHorizontal: 10,
        paddingTop: 70,
		height: "100%",
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
	},
    amount: {
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 32,
        lineHeight: 32,
        paddingTop: 20
    },
    ownerInfo: {
        position: 'absolute',
        top: -60,
        borderRadius: 40,
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    ownerName: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 10
    },
    errorText: {
        color: colors.mistakeRed,
        marginTop: 20
    }
});

type ReturnQRCodeGenProps = {
	visible: boolean,
	onClose: () => void,
    onSuccess: (amount: number) => void,
    transactionInfo: ITransaction
}

const ReturnQRCodeGen = (props: ReturnQRCodeGenProps): JSX.Element => {
    const dispatch = useDispatch();
    const { customerWalletData } = useContext(WalletContext)
    const { user, customerDwollaId } = useContext(UserContext);
    const { hasPermission, setMaxBrightness, setDefaultBrightness} = useBrightness();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [initBalance, setInitBalance] = useState<number>(customerWalletData?.availableBalance);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const requestData: QRCodeEntry = {
        securityId: SECURITY_ID,
        transactionHash: props.transactionInfo.transactionHash,
        transactionDate: props.transactionInfo.timestamp,
        to: customerDwollaId ? customerDwollaId : "",
        amount: Number(props.transactionInfo.value),
        mode: PaymentMode.OPEN_AMOUNT
    };
    const addressStr = JSON.stringify(requestData);

    useUpdateCustomerWalletData();
    useEffect(() => {
        if (hasPermission) {
            setMaxBrightness();
        }
    }, [hasPermission]);

    const onClose = () => {
        setDefaultBrightness();
        props.onClose();
    }

    const onSuccess = async() => {
        if (!isSuccess) {
            setIsSuccess(true);
            if (customerDwollaId) {
                await dispatch(loadPersonalTransactions(customerDwollaId));
            }
            setDefaultBrightness();
            props.onSuccess(customerWalletData?.availableBalance - initBalance);
        }
    }

    if (customerWalletData?.availableBalance > initBalance) {
        onSuccess();
    }

    const firstName = user?.customer?.firstName;
    const lastName = user?.customer?.lastName;

    return (
        <Dialog visible={props.visible} onClose={onClose} style={styles.dialog}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <View style={styles.ownerInfo}>
                        <Image
                            source={require("../../../assets/images/feed1.png")}
                            style={styles.image}
                        />
                        <Text style={styles.ownerName}>{firstName + ' ' + lastName}</Text>
                    </View>
                    <QRCode
                        value={addressStr}
                        size={250}
                    />
                    <Text style={styles.errorText}>Show QR code to the cashier </Text>
                </View>
            </View>
        </Dialog>
    )
}

export default ReturnQRCodeGen;