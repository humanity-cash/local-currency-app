import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from 'src/auth';
import { Text } from 'react-native-elements';
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode } from "src/utils/types";
import { colors } from "src/theme/colors";

const styles = StyleSheet.create({
	dialogWrap: {
        position: 'relative',
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
	},
    amount: {
        alignSelf: 'center',
        marginTop: 10
    },
    ownerInfo: {
        position: 'absolute',
        top: -35,

        backgroundColor: colors.purple
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
    const addressStr = JSON.stringify({
        to: "",
        amount: props.amount,
        mode: props.isOpenAmount ? PaymentMode.OPEN_AMOUNT : PaymentMode.SELECT_AMOUNT
    });

    return (
        <Dialog visible={props.visible} onClose={()=>props.onClose()}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <View style={styles.ownerInfo}>
                        <Text>sdssssdfs</Text>
                    </View>
                    <QRCode
                        value={addressStr}
                        size={200}
                    />
                    { !props.isOpenAmount && <Text h1 style={styles.amount}>B$ {props.amount?.toFixed(2)}</Text> } 
                </View>
            </View>
        </Dialog>
    )
}

export default QRCodeGen;