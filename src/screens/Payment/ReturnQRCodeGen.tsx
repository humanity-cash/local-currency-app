import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from 'src/auth';
import { Text } from 'react-native-elements';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode, QRCodeEntry, SECURITY_ID } from "src/utils/types";
import { useBrightness } from "src/hooks";
import { ITransaction } from "src/api/types";
import { colors } from "src/theme/colors";

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
    },
    errorText: {
        color: colors.mistakeRed
    }
});

type ReturnQRCodeGenProps = {
	visible: boolean,
	onClose: ()=>void,
    transactionInfo: ITransaction
}

const ReturnQRCodeGen = (props: ReturnQRCodeGenProps): JSX.Element => {
    const { customerDwollaId, userAttributes } = useContext(AuthContext);
    const { hasPermission, setMaxBrightness, setDefaultBrightness} = useBrightness();

    const requestData: QRCodeEntry = {
        securityId: SECURITY_ID,
        transactionHash: props.transactionInfo.transactionHash,
        transactionDate: props.transactionInfo.timestamp,
        to: customerDwollaId ? customerDwollaId : "",
        amount: Number(props.transactionInfo.value),
        mode: PaymentMode.OPEN_AMOUNT
    };
    const addressStr = JSON.stringify(requestData);

    useEffect(() => {
        if (hasPermission) {
            setMaxBrightness();
        }
    }, [hasPermission]);

    const onClose = () => {
        setDefaultBrightness();
        props.onClose();
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
                        size={250}
                    />
                    <Text style={styles.errorText}>Show QR code to the cashier </Text>
                </View>
            </View>
        </Dialog>
    )
}

export default ReturnQRCodeGen;