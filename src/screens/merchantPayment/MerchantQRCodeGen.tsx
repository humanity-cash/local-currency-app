import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from 'src/auth';
import { Text } from 'react-native-elements';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { PaymentMode } from "src/utils/types";
import { useBrightness } from "src/hooks";

const styles = StyleSheet.create({
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

type MerchantQRCodeGenProps = {
	visible: boolean,
	onClose: ()=>void,
    amount?: number
}

const MerchantQRCodeGen = (props: MerchantQRCodeGenProps): JSX.Element => {
    // const { userAttributes } = useContext(AuthContext);
    const { hasPermission, setMaxBrightness, setDefaultBrightness} = useBrightness();
    const addressStr = JSON.stringify({
        to: "",
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

    return (
        <Dialog visible={props.visible} onClose={onClose} backgroundStyle={styles.dialogBg}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <QRCode
                        value={addressStr}
                        size={200}
                    />
                    <Text h1 style={styles.amount}>B$ {props.amount}.00</Text>
                </View>
            </View>
        </Dialog>
    )
}

export default MerchantQRCodeGen;