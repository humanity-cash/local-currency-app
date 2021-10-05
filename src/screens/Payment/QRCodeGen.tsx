import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from 'src/auth';
import { Text } from 'react-native-elements';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode } from "src/utils/types";
import { useBrightness } from "src/hooks";

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
	onClose: ()=>void,
    isOpenAmount: boolean,
    amount?: number
}

const QRCodeGen = (props: QRCodeGenProps): JSX.Element => {
    const { userAttributes } = useContext(AuthContext);
    const { hasPermission, setMaxBrightness, setDefaultBrightness} = useBrightness();
    const addressStr = JSON.stringify({
        to: "",
        amount: props.amount,
        mode: props.isOpenAmount ? PaymentMode.OPEN_AMOUNT : PaymentMode.SELECT_AMOUNT
    });

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
                        size={200}
                    />
                    { !props.isOpenAmount && <Text style={styles.amount}>B$ {props.amount?.toFixed(2)}</Text> } 
                </View>
            </View>
        </Dialog>
    )
}

export default QRCodeGen;