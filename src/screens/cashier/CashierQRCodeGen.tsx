import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Text } from 'react-native-elements';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import * as Routes from 'src/navigation/constants';

const styles = StyleSheet.create({
    dialog: {
        height: 350
    },
    dialogBg: {
        backgroundColor: colors.overlayPurple
    },
	dialogWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
	},
    amount: {
        alignSelf: 'center',
        marginTop: 10,
        color: colors.purple
    }
});

type CashierQRCodeGenProps = {
	visible: boolean,
	onClose: () => void,
    amount?: number
}

const CashierQRCodeGen = (props: CashierQRCodeGenProps): JSX.Element => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            props.onClose();
            navigation.navigate(Routes.CASHIER_PAYMENT_SUCCESS);
        }, 2000);
    }, []);

    return (
        <Dialog visible={props.visible} onClose={()=>props.onClose()} style={styles.dialog} backgroundStyle={styles.dialogBg}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <QRCode
                        value="Test QR Code"
                        size={200}
                    />
                    <Text h1 style={styles.amount}>B$ {props.amount?.toFixed(2)}</Text>
                </View>
            </View>
        </Dialog>
    )
}

export default CashierQRCodeGen;