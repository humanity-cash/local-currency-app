import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from 'src/auth';
import { Text } from 'react-native-elements';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode, SECURITY_ID } from "src/utils/types";
import { useBrightness } from "src/hooks";
import { loadClientWallet } from 'src/store/wallet/wallet.actions';
import { WalletState } from 'src/store/wallet/wallet.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'src/store';
import { loadClientTransactions } from 'src/store/transaction/transaction.actions';

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
    const { clientWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;
    const dispatch = useDispatch();
    const { customerDwollaId, userAttributes } = useContext(AuthContext);
    const { hasPermission, setMaxBrightness, setDefaultBrightness} = useBrightness();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [initBalance, setInitBalance] = useState<number>(clientWallet.availableBalance);
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
                await dispatch(loadClientWallet(customerDwollaId));
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
            if (customerDwollaId) {
                await dispatch(loadClientTransactions(customerDwollaId));
            }
            setDefaultBrightness();
            props.onSuccess(clientWallet.availableBalance - initBalance);
        }
    }

    if (clientWallet.availableBalance > initBalance) {
        onSuccess();
    }

    const firstName = userAttributes?.["custom:personal.firstName"];
    const lastName = userAttributes?.["custom:personal.lastName"];

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
                        size={200}
                    />
                    { !props.isOpenAmount && <Text style={styles.amount}>B$ {props.amount?.toFixed(2)}</Text> } 
                </View>
            </View>
        </Dialog>
    )
}

export default QRCodeGen;