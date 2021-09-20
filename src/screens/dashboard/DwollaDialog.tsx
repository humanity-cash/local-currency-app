import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Button, Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { colors } from 'src/theme/colors';
import * as Routes from 'src/navigation/constants';

const styles = StyleSheet.create({
    dialog: {
        height: 480
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
    }
});

type DwollaDialogProps = {
	visible: boolean,
	onClose: ()=>void,
}

const DwollaDialog = (props: DwollaDialogProps): JSX.Element => {
    const navigation = useNavigation();

    const selectBank = () => {
        navigation.navigate(Routes.SELECT_BANK);
        props.onClose();
    }

    return (
        <Dialog visible={props.visible} onClose={()=>props.onClose()} style={styles.dialog}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <Text style={styles.dialogHeader}>BerkShares uses Dwolla to link your business bank account.</Text>
                    <View style={styles.inlineView}>
                        <Entypo name="check" size={16} color={colors.darkGreen} style={styles.icon} />
                        <View>
                            <Text h2>Secure</Text>
                            <Text>Secure Encryption helps protect your personal financial data</Text>
                        </View>
                    </View>
                    <View style={styles.inlineView}>
                        <Entypo name="check" size={16} color={colors.darkGreen} style={styles.icon} />
                        <View>
                            <Text h2>Private</Text>
                            <Text>Your credentials will never be made access to BerkShares.</Text>
                        </View>
                    </View>
                    <Text>By selecting "continue" you agree to the Dwolla Privacy Policy</Text>
                </View>
                <View style={styles.dialogBottom}>
                    <Button
                        type="darkGreen"
                        title="Continue"
                        onPress={selectBank}
                    />
                </View>
            </View>
        </Dialog>
    )
}

export default DwollaDialog;