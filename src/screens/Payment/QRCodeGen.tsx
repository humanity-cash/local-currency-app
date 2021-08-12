import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Text } from 'react-native-elements';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";

const styles = StyleSheet.create({
	dialogWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
	},
    amount: {
        alignSelf: 'center',
        marginTop: 10
    }
});

type QRCodeGenProps = {
	visible: boolean,
	onClose: ()=>void,
    isOpenAmount: boolean,
    amount?: string
}

const QRCodeGen = (props: QRCodeGenProps) => {
    const navigation = useNavigation();

    return (
        <Dialog visible={props.visible} onClose={()=>props.onClose()}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <QRCode
                        value={props.amount}
                        size={200}
                    />
                    { !props.isOpenAmount && <Text h1 style={styles.amount}>B$ {props.amount}</Text> } 
                </View>
            </View>
        </Dialog>
    )
}

export default QRCodeGen;