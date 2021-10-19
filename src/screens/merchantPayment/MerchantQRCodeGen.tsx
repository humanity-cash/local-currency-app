import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from 'src/auth';
import { Text } from 'react-native-elements';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { PaymentMode, SECURITY_ID } from "src/utils/types";
import { loadBusinessWallet } from 'src/store/wallet/wallet.actions';
import { WalletState } from 'src/store/wallet/wallet.reducer';
import { useBrightness } from "src/hooks";
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'src/store';
import { loadBusinessTransactions } from 'src/store/transaction/transaction.actions';

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

type MerchantQRCodeGenProps = {
	visible: boolean,
	onClose: () => void,
    onSuccess: (amount: number) => void,
    amount?: number
}

const MerchantQRCodeGen = (props: MerchantQRCodeGenProps): JSX.Element => {
    const { businessWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;
    const { businessDwollaId, userAttributes } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { hasPermission, setMaxBrightness, setDefaultBrightness} = useBrightness();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [initBalance, setInitBalance] = useState<number>(businessWallet.availableBalance);
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
                await dispatch(loadBusinessWallet(businessDwollaId));
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
                await dispatch(loadBusinessTransactions(businessDwollaId));
            }
            setDefaultBrightness();
            props.onSuccess(businessWallet.availableBalance - initBalance);
        }
    }

    if (businessWallet.availableBalance > initBalance) {
        onSuccess();
    }

    const firstName = userAttributes?.["custom:owner.firstName"];
    const lastName = userAttributes?.["custom:owner.lastName"];

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

export default MerchantQRCodeGen;