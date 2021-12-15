import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { UserContext } from "src/contexts";
import { Modal, ModalHeader } from "src/shared/uielements";
import { modalViewBase, FontFamily } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { UserType } from 'src/auth/types';

const styles = StyleSheet.create({
    modalWrap: {
		paddingHorizontal: 10,
		marginBottom: 10
	},
	headerText: {
		fontSize: 32,
		lineHeight: 45,
		marginBottom: 20,
		paddingBottom: 10,
	},
    headerTextB: {
		fontSize: 32,
		lineHeight: 45,
		marginBottom: 20,
		paddingBottom: 10,
        color: colors.purple
	},
    bodyText: {
        fontSize: 16,
        color: colors.bodyText,
        lineHeight: 20
    },
    bottomView: {
		marginBottom: 20
	},
    imageView: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%',
		height: 360,
		borderRadius: 20,
		backgroundColor: colors.white
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 20
	},
    contentView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    contentText: {
        fontFamily: FontFamily.bold,
        fontSize: 18,
        lineHeight: 24,
        marginTop: 10
    },
    contentTextB: {
        fontFamily: FontFamily.bold,
        fontSize: 18,
        lineHeight: 24,
        marginTop: 10,
        color: colors.purple
    }
});

type PaymentPendingProps = {
	visible: boolean,
}

const PaymentPending = ({visible = false}: PaymentPendingProps): JSX.Element => {
    const { userType } = useContext(UserContext);

    return (
        <Modal visible={visible}>
            <View style={ modalViewBase }>
                <ModalHeader />
                <ScrollView style={styles.modalWrap}>
                    <Text style={userType === UserType.Customer ? styles.headerText : styles.headerTextB}>Pending...</Text>
                    <Text style={styles.bodyText}>This usually takes 5-6 seconds</Text>
                    <View style={styles.contentView}>
                        <View style={styles.imageView}>
                            <Image
                                source={require("../../../assets/images/great_barrington_mountain.png")}
                                style={styles.image}
                            />
                        </View>
                        <Text style={userType === UserType.Customer ? styles.contentText : styles.contentTextB}>Great Barrington mountain</Text>
                    </View>
                </ScrollView>
                <SafeAreaView style={styles.bottomView}>
                    <ActivityIndicator size="large" color={userType === UserType.Customer ? colors.darkGreen : colors.purple} />
                </SafeAreaView>
            </View>
        </Modal>
    );
}

export default PaymentPending;
