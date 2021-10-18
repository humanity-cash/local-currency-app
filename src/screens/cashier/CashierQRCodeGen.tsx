import React, { useEffect, useContext } from 'react';
// import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
// import * as Routes from 'src/navigation/constants';
import { useBrightness } from "src/hooks";
import { PaymentMode } from "src/utils/types";

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
    amount?: number
}

const CashierQRCodeGen = (props: CashierQRCodeGenProps): JSX.Element => {
    // const navigation = useNavigation();
    const { businessDwollaId, userAttributes } = useContext(AuthContext);
    const { hasPermission, setMaxBrightness, setDefaultBrightness} = useBrightness();
    const addressStr = JSON.stringify({
        to: businessDwollaId,
        amount: props.amount,
        mode: PaymentMode.SELECT_AMOUNT
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

export default CashierQRCodeGen;