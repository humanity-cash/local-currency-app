import React from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { Button, Modal, ModalHeader } from "src/shared/uielements";
import { modalViewBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';

const styles = StyleSheet.create({
    headerText: {
        fontSize: 32,
        lineHeight: 40,
        color: colors.purple
    },
    imageView: {
		flex: 1, 
		margin: 15, 
		justifyContent: 'center', 
		alignItems: 'center'
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

const MerchantRequestSuccess = (props: MerchantRequestSuccessProps): JSX.Element => {
    return (
        <Modal visible={props.visible}>
            <View style={ modalViewBase }>
                <ModalHeader />
                <View style={{paddingHorizontal: 10, flex: 1}}>
                    <Text style={styles.headerText}>
                        Succeeded! You have received B$ {props.amount.toFixed(2)}.
                    </Text>
                    <View style={styles.imageView}>
                        <Image
                            source={require('../../../../assets/images/burkshare_paper_money.png')}
                            style={{justifyContent: 'center', width: '100%'}}
                            resizeMode='contain'
                        />			
                    </View>
                </View>
                <SafeAreaView style={styles.bottomView}>
                    <Button
                        type={BUTTON_TYPES.PURPLE}
                        title={Translation.BUTTON.CLOSE}
                        onPress={props.onClose}
                    />
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export default MerchantRequestSuccess;