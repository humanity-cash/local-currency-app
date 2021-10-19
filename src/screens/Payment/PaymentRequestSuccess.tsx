import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { CancelBtn, Button, Modal, ModalHeader } from "src/shared/uielements";
import { modalViewBase, wrappingContainerBase, baseHeader } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';

const styles = StyleSheet.create({
    headerText: {
        fontSize: 32,
        lineHeight: 40,
    },
    bottomView: {
		padding: 20,
		paddingBottom: 45
	}
});

type PaymentRequestSuccessProps = {
	visible: boolean,
	onClose: ()=>void,
    amount: number
}

const PaymentRequestSuccess = (props: PaymentRequestSuccessProps): JSX.Element => {
    return (
        <Modal visible={props.visible}>
            <View style={ modalViewBase }>
                <ModalHeader
                    rightComponent={<CancelBtn text="Close" onClick={props.onClose} />}
                />
                <ScrollView style={wrappingContainerBase}>
                    <View style={baseHeader}>
                        <Text style={styles.headerText}>
                            Succeeded! You have received B$ {props.amount.toFixed(2)}.
                        </Text>
                    </View>
                </ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"} >
                    <View style={styles.bottomView}>
                        <Button
                            type={BUTTON_TYPES.DARK_GREEN}
                            title={Translation.BUTTON.CLOSE}
                            onPress={props.onClose}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    )
}

export default PaymentRequestSuccess;