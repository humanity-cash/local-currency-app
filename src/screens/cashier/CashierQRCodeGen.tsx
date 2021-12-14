import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch } from 'react-redux';
import { UserContext, WalletContext } from 'src/contexts';
import { useBrightness } from "src/hooks";
import { Dialog } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode, SECURITY_ID } from "src/utils/types";

const styles = StyleSheet.create({
    dialog: {
        height: 420
    },
    dialogBg: {
        backgroundColor: colors.overlayPurple
    },
	dialogWrap: {
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
        paddingTop: 20,
        color: colors.purple
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
        paddingVertical: 10,
        color: colors.purple
    }
});

type CashierQRCodeGenProps = {
	visible: boolean,
	onClose: () => void,
    onSuccess: (amount: number) => void,
    amount?: number
}

const CashierQRCodeGen = (props: CashierQRCodeGenProps): JSX.Element => {
    const { user, businessDwollaId } = useContext(UserContext);
    const dispatch = useDispatch();
    const { customerWalletData } = useContext(WalletContext);
    const { hasPermission, setMaxBrightness, setDefaultBrightness} = useBrightness();
    const [initBalance] = useState<number>(customerWalletData?.availableBalance);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const addressStr = JSON.stringify({
        securityId: SECURITY_ID,
        to: businessDwollaId,
        amount: props.amount,
        mode: PaymentMode.SELECT_AMOUNT
    });

    useEffect(() => {
        const timerId = setInterval(async () => {
            if (businessDwollaId) {
                console.log('he')
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

    const onSuccess = async() => {
        if (!isSuccess) {
            setIsSuccess(true);
            if (businessDwollaId) {
                // await dispatch(loadBusinessTransactions(businessDwollaId));
            }
            setDefaultBrightness();
            props.onSuccess(Number(customerWalletData?.availableBalance) - initBalance);
        }
    }

    if (Number(customerWalletData?.availableBalance) > initBalance) {
        onSuccess();
    }

    const firstName = user?.business?.owner?.firstName;
    const lastName = user?.business?.owner?.lastName;

    return (
        <Dialog visible={props.visible} onClose={onClose} backgroundStyle={styles.dialogBg} style={styles.dialog}>
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
                    <Text style={styles.amount}>B$ {props.amount?.toFixed(2)}</Text>
                </View>
            </View>
        </Dialog>
    )
}

export default CashierQRCodeGen;