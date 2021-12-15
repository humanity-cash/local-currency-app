import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { CancelBtn, Button, Modal, ModalHeader } from "src/shared/uielements";
import { modalViewBase, wrappingContainerBase, baseHeader } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';

const styles = StyleSheet.create({
    headerText: {
        fontSize: 32,
        lineHeight: 40,
        color: colors.purple
    },
	bodyText: {
		color: colors.bodyText
	},
    bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
	}
});

type MerchantRequestSuccessProps = {
	visible: boolean,
	onClose: ()=>void,
    amount: number
}

const CashierRequestSuccess = (props: MerchantRequestSuccessProps): JSX.Element => {
    return (
        <Modal visible={props.visible}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={ modalViewBase }>
                <ModalHeader
                    rightComponent={<CancelBtn text="Close" color={colors.purple} onClick={props.onClose} />}
                />
                <ScrollView style={wrappingContainerBase}>
                    <View style={baseHeader}>
                        <Text style={styles.headerText}>
                            {Translation.CASHIER.PAYMENT_SUCCESS} {props.amount.toFixed(2)}.
                        </Text>
                    </View>
					<Text style={styles.bodyText}> {Translation.CASHIER.PAYMENT_SUCCESS_DETAIL} </Text>
                </ScrollView>
                
                <SafeAreaView style={styles.bottomView}>
                    <Button
                        type={BUTTON_TYPES.PURPLE}
                        title={Translation.BUTTON.CLOSE}
                        onPress={props.onClose}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default CashierRequestSuccess;