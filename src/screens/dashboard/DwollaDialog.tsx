import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Text } from 'react-native-elements';
import { UserType } from "src/auth/types";
import { Button, Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { colors } from 'src/theme/colors';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import { DWOLLA_PRIVACY_URL, DWOLLA_TERMS_URL } from 'src/config/env';

const styles = StyleSheet.create({
    dialog: {
        height: 530
    },
    pDialogBg: {},
    bDialogBg: {
        backgroundColor: colors.overlayPurple
    },
	dialogWrap: {
		paddingHorizontal: 10,
		flex: 1
	},
	dialogHeader: {
		fontSize: 30,
		lineHeight: 32,
		marginTop: 20,
		marginBottom: 10,
	},
    dialogHeaderB: {
		fontSize: 30,
		lineHeight: 32,
		marginTop: 20,
		marginBottom: 10,
        color: colors.purple
	},
	dialogBottom: {
		paddingTop: 20,
	},
    icon: {
        paddingRight: 5,
        paddingTop: 4
    },
    inlineView: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    termsTextView: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
    underlineText: {
		textDecorationLine: 'underline'
	}
});

type DwollaDialogProps = {
	visible: boolean,
    userType: UserType,
	onClose: ()=>void,
}

const DwollaDialog = (props: DwollaDialogProps): JSX.Element => {
    const navigation = useNavigation();

    const selectBank = () => {
        props.onClose();
        // props.userType === UserType.Customer
        navigation.navigate(Routes.SELECT_BANK)
            // : navigation.navigate(Routes.MERCHANT_BANK_ACCOUNT);
    }

    const mainTextStyle = props.userType === UserType.Customer ? {color: colors.darkGreen} : {color: colors.purple};

    const mainColor = props.userType === UserType.Customer ? colors.darkGreen : colors.purple;

    return (
        <Dialog 
            visible={props.visible} 
            onClose={()=>props.onClose()} 
            style={styles.dialog} 
            backgroundStyle={props.userType === UserType.Customer ? styles.pDialogBg : styles.bDialogBg}
        >
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <Text style={props.userType === UserType.Customer ? styles.dialogHeader : styles.dialogHeaderB}>BerkShares uses Dwolla to link your business bank account.</Text>
                    <View style={styles.inlineView}>
                        <Entypo name="check" size={16} color={mainColor} style={styles.icon} />
                        <View>
                            <Text h2 style={mainTextStyle}>Secure</Text>
                            <Text style={mainTextStyle}>Encryption helps protect your personal financial data</Text>
                        </View>
                    </View>
                    <View style={styles.inlineView}>
                        <Entypo name="check" size={16} color={mainColor} style={styles.icon} />
                        <View>
                            <Text h2 style={mainTextStyle}>Private</Text>
                            <Text style={mainTextStyle}>Your credentials will never be made access to BerkShares.</Text>
                        </View>
                    </View>
                    <View style={styles.termsTextView}>
                        <Text style={mainTextStyle}>By selecting ‘continue’ you agree to the </Text>
                        <Text 
                            style={{...mainTextStyle, ...styles.underlineText}} 
                            onPress={()=>Linking.openURL(DWOLLA_TERMS_URL)}
                        >
                            Dwolla Terms of Service
                        </Text>
                        <Text style={mainTextStyle}> and </Text>
                        <Text 
                            style={{...mainTextStyle, ...styles.underlineText}} 
                            onPress={() => Linking.openURL(DWOLLA_PRIVACY_URL)}
                        >
                            Dwolla Privacy Policy
                        </Text>
                    </View>
                </View>
                <View style={styles.dialogBottom}>
                    <Button
                        type={props.userType === UserType.Customer ? BUTTON_TYPES.DARK_GREEN : BUTTON_TYPES.PURPLE}
                        title="Continue"
                        onPress={selectBank}
                    />
                </View>
            </View>
        </Dialog>
    )
}

export default DwollaDialog;