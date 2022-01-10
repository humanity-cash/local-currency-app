import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { UserContext, WalletContext } from 'src/contexts';
import { useBrightness, useUpdateBusinessWalletData } from "src/hooks";
import { Dialog } from "src/shared/uielements";
import { colors } from 'src/theme/colors';
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode, SECURITY_ID } from "src/utils/types";
import { FontFamily } from "src/theme/elements";

const styles = StyleSheet.create({
    dialog: {
        height: 400
    },
    dialogBg: {
        backgroundColor: colors.overlayPurple
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
		fontFamily: FontFamily.bold,
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
        color: colors.purple,
		fontFamily: FontFamily.bold,
        fontSize: 18,
        paddingVertical: 10
    }
});

type QRCodeGenProps = {
    visible: boolean,
    onClose: () => void,
    onSuccess: (amount: number) => void
}

const StaticQRCodeGen = (props: QRCodeGenProps): JSX.Element => {
    const { user, businessDwollaId } = useContext(UserContext);
    const { businessWalletData } = useContext(WalletContext);
    const { hasPermission, setMaxBrightness, setDefaultBrightness } = useBrightness();
    const [initBalance] = useState<number>(businessWalletData.availableBalance);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const addressStr = JSON.stringify({
        securityId: SECURITY_ID,
        to: businessDwollaId,
        amount: 0,
        mode: PaymentMode.OPEN_AMOUNT
    });

    useUpdateBusinessWalletData()

    useEffect(() => {
        if (hasPermission) {
            setMaxBrightness();
        }
    }, [hasPermission]);

    const onClose = () => {
        setDefaultBrightness();
        props.onClose();
    }

    const onSuccess = async () => {
        if (!isSuccess) {
            setIsSuccess(true);
            setDefaultBrightness();
            props.onSuccess(businessWalletData.availableBalance - initBalance);
        }
    }

    if (businessWalletData.availableBalance > initBalance) {
        onSuccess();
    }

    const businessName = user?.business?.tag || undefined

    return (
        <Dialog visible={props.visible} onClose={onClose} style={styles.dialog} backgroundStyle={styles.dialogBg}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <View style={styles.ownerInfo}>
                        <Image
                            source={require("../../../../../assets/images/feed1.png")}
                            style={styles.image}
                        />
                        <Text style={styles.ownerName}>{businessName}</Text>
                    </View>
                    <QRCode
                        value={addressStr}
                        size={200}
                    />
                </View>
            </View>
        </Dialog>
    )
}

export default StaticQRCodeGen;
