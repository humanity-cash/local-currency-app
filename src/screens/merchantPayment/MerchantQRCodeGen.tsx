import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Text } from 'react-native-elements';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

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
    amount?: string
}

const MerchantQRCodeGen = (props: MerchantQRCodeGenProps) => {
    const navigation = useNavigation();

    return (
        <Dialog visible={props.visible} onClose={()=>props.onClose()} backgroundStyle={styles.dialogBg}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <QRCode
                        value={props.amount}
                        size={200}
                    />
                    <Text h1 style={styles.amount}>B$ {props.amount}.00</Text>
                </View>
            </View>
        </Dialog>
    )
}

export default MerchantQRCodeGen;