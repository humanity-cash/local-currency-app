import { useNavigation } from "@react-navigation/native";
import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Button, Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

const styles = StyleSheet.create({
	dialogWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
	},
	dialogHeader: {
		fontSize: 30,
		lineHeight: 32,
		marginTop: 20,
		marginBottom: 10,
	},
	dialogBottom: {
		paddingTop: 20,
	}
});

type DwollaDialogProps = {
	visible: boolean,
	onClose: ()=>void,
}

const DwollaDialog = (props: DwollaDialogProps) => {
    const navigation = useNavigation();

    const selectBank = () => {
        navigation.navigate("SelectBank");
        props.onClose();
    }

    return (
        <Dialog visible={props.visible} onClose={()=>props.onClose()}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <Text style={styles.dialogHeader}>BerkShares uses Dwolla to link your business bank account.</Text>
                    <Text>Encryption helps protect your personal financial data</Text>
                    <Text>Your credencials will never be made access to BerkShares.</Text>
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