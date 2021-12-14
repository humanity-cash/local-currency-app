import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState} from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Text } from 'react-native-elements';
import { UserType } from "src/auth/types";
import { Button, Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { colors } from 'src/theme/colors';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import { DWOLLA_PRIVACY_URL, DWOLLA_TERMS_URL } from 'src/config/env';
import { UserContext } from 'src/contexts';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
    dialog: {
        height: 380
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
        paddingRight: 20,
        marginLeft: -10,
        marginRight: 20
	},
	checkboxContainer: {
		borderWidth: 0,
		backgroundColor: 'transparent',
		paddingHorizontal: 0
	},
    underlineText: {
		textDecorationLine: 'underline'
	}
});

type DwollaDialogProps = {
    title: string,
	visible: boolean,
	onClose: ()=>void,
}

const DwollaDialog = (props: DwollaDialogProps): JSX.Element => {
    const { userType } = useContext(UserContext);
    const navigation = useNavigation();
    const isCustomer = userType === UserType.Customer;
	const [isSelected, setSelection] = useState(true);

    const selectBank = () => {
        props.onClose();
        isCustomer 
            ? navigation.navigate(Routes.SELECT_BANK)
            : navigation.navigate(Routes.MERCHANT_BANK_ACCOUNT);
    }

    const mainTextStyle = isCustomer ? { color: colors.darkGreen } : { color: colors.purple };

    const mainColor = isCustomer ? colors.darkGreen : colors.purple;

    return (
        <Dialog
            visible={props.visible}
            onClose={() => props.onClose()}
            style={styles.dialog}
            backgroundStyle={isCustomer ? styles.pDialogBg : styles.bDialogBg}
        >
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <Text style={isCustomer ? styles.dialogHeader : styles.dialogHeaderB}>{props.title}</Text>
                    <View style={styles.termsTextView}>
                        <CheckBox
							checked={isSelected}
							title=""
							containerStyle={styles.checkboxContainer}
							checkedColor={colors.darkGreen}
							onPress={() => setSelection(!isSelected)}
						/>
                        <Text style={mainTextStyle}>{"By clicking on the box, you agree to the "}
                            <Text
                                style={styles.underlineText}
                                onPress={() => Linking.openURL(DWOLLA_TERMS_URL)}
                            >
                                Dwolla Terms of Service
                            </Text>
                            {" and "}
                            <Text
                                style={styles.underlineText}
                                onPress={() => Linking.openURL(DWOLLA_PRIVACY_URL)}
                            >
                                Dwolla Privacy Policy
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.dialogBottom}>
                    <Button
                        type={isCustomer ? BUTTON_TYPES.DARK_GREEN : BUTTON_TYPES.PURPLE}
                        title="Continue"
                        disabled={!isSelected}
                        onPress={selectBank}
                    />
                </View>
            </View>
        </Dialog>
    )
}

export default DwollaDialog;