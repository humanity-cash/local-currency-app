import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Image, Platform, SafeAreaView } from 'react-native';
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
            <SafeAreaView style={ modalViewBase }>
                <ModalHeader />
                <View style={{paddingHorizontal: 10, flex: 1}}>
                    <Text style={styles.headerText}>
                        Succeeded! You have received B$ {props.amount.toFixed(2)}.
                    </Text>
                    <View style={{flex: 1, margin: 15, justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            source={require("../../../assets/images/burkshare_paper_money.png")}
                            style={{justifyContent: 'center', width: '100%'}}
                            resizeMode='contain'
                        />			
                    </View>
                </View>
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
            </SafeAreaView>
        </Modal>
    )
}

export default PaymentRequestSuccess;