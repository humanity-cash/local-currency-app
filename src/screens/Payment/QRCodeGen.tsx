import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { DwollaAPI } from 'src/api';
import { UserContext, WalletContext } from 'src/contexts';
import { useBrightness } from "src/hooks";
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode, SECURITY_ID } from "src/utils/types";
import { prefixCustomerName } from '../../utils/common';

const styles = StyleSheet.create({
    dialog: {
        height: 400
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
    }
});

type QRCodeGenProps = {
    visible: boolean,
    onClose: () => void,
    onSuccess: (amount: number) => void,
    isOpenAmount: boolean,
    amount?: number
}

const QRCodeGen = (props: QRCodeGenProps): JSX.Element => {
    const { user, customerDwollaId } = useContext(UserContext);
    const { customerWalletData, updateCustomerWalletData } = useContext(WalletContext);
    const { hasPermission, setMaxBrightness, setDefaultBrightness } = useBrightness();
    const [initBalance] = useState<number>(customerWalletData?.availableBalance);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const addressStr = JSON.stringify({
        securityId: SECURITY_ID,
        to: customerDwollaId,
        amount: props.amount,
        mode: props.isOpenAmount ? PaymentMode.OPEN_AMOUNT : PaymentMode.SELECT_AMOUNT
    });

    useEffect(() => {
        const timerId = setInterval(async () => {
            if (customerDwollaId) {
                const userWallet = await DwollaAPI.loadWallet(customerDwollaId)
                const fundingSource = await DwollaAPI.loadFundingSource(customerDwollaId)
                updateCustomerWalletData(({ ...userWallet, availableFundingSource: fundingSource }))
            }
        }, 1000);
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
            setDefaultBrightness();
            props.onSuccess(customerWalletData?.availableBalance - initBalance);
        }
    }

    if (customerWalletData?.availableBalance > initBalance) {
        onSuccess();
    }


    const customerName = user?.customer?.tag;

    return (
        <Dialog visible={props.visible} onClose={onClose} style={styles.dialog}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <View style={styles.ownerInfo}>
                        <Image
                            source={require("../../../assets/images/feed1.png")}
                            style={styles.image}
                        />
                        <Text style={styles.ownerName}>{prefixCustomerName(customerName ?? "")}</Text>
                    </View>
                    <QRCode
                        value={addressStr}
                        size={200}
                    />
                    {!props.isOpenAmount && <Text style={styles.amount}>B$ {props.amount?.toFixed(2)}</Text>}
                </View>
            </View>
        </Dialog>
    )
}

export default QRCodeGen;