import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { UserContext, WalletContext } from 'src/contexts';
import { Text } from 'react-native-elements';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode, SECURITY_ID } from "src/utils/types";
import { useBrightness } from "src/hooks";
import { useDispatch } from 'react-redux';
import { loadBusinessTransactions } from 'src/store/transaction/transaction.actions';
import { colors } from 'src/theme/colors';

const styles = StyleSheet.create({
    dialog: {
        height: 400
    },
    dialogBg: {
        backgroundColor: colors.overlayPurple
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
        color: colors.purple,
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 10
    }
});

type QRCodeGenProps = {
    visible: boolean,
    onClose: () => void,
    onSuccess: (amount: number) => void
}

const StaticQRCodeGen = (props: QRCodeGenProps): JSX.Element => {
    const dispatch = useDispatch();
    const { user, businessDwollaId } = useContext(UserContext);
    const { walletData } = useContext(WalletContext);
    const { hasPermission, setMaxBrightness, setDefaultBrightness } = useBrightness();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [initBalance, setInitBalance] = useState<number>(walletData.availableBalance);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const addressStr = JSON.stringify({
        securityId: SECURITY_ID,
        to: businessDwollaId,
        amount: 0,
        mode: PaymentMode.OPEN_AMOUNT
    });

    useEffect(() => {
        const timerId = setInterval(async () => {
            if (businessDwollaId) {
                console.log('som')
            }
        }, 1500);
        return () => clearInterval(timerId);
    }, [props.visible]);

    useEffect(() => {
        if (hasPermission) {
            setMaxBrightness();
        }
    }, [hasPermission]);

    const onClose = () => {
        setDefaultBrightness();
        props.onClose();
    }

    const onSuccess = async () => {
        if (!isSuccess) {
            setIsSuccess(true);
            if (businessDwollaId) {
                await dispatch(loadBusinessTransactions(businessDwollaId));
            }
            setDefaultBrightness();
            props.onSuccess(walletData.availableBalance - initBalance);
        }
    }

    if (walletData.availableBalance > initBalance) {
        onSuccess();
    }

    const firstName = user?.business?.owner?.firstName;
    const lastName = user?.business?.owner?.lastName;

    return (
        <Dialog visible={props.visible} onClose={onClose} style={styles.dialog} backgroundStyle={styles.dialogBg}>
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
                        size={200}
                    />
                </View>
            </View>
        </Dialog>
    )
}

export default StaticQRCodeGen;
