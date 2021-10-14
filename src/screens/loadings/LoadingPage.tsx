import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { Modal, ModalHeader, Dialog } from "src/shared/uielements";
import { modalViewBase, dialogViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { useLoadingModal } from "src/hooks";
import { LoadingScreenTypes } from "src/utils/types";
import { UserType } from 'src/auth/types';

const styles = StyleSheet.create({
    modalWrap: {
		paddingHorizontal: 10,
		marginBottom: 10
	},
	headerText: {
		fontSize: 26,
		lineHeight: 45,
		marginBottom: 20,
		paddingBottom: 10,
	},
    dialog: {
        height: 300
    },
	dialogWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
	},
    bodyText: {
        fontSize: 16,
        color: colors.bodyText,
        lineHeight: 20
    },
    bottomView: {
		paddingBottom: 45
	}
});

const LoadingPage = (): JSX.Element => {
    const { details } = useLoadingModal();
    const { userType } = useContext(AuthContext);

    const getBackgroundColorStyle = () => {
        return userType === UserType.Customer ? {backgroundColor: colors.lightGreen} : {backgroundColor: colors.overlayPurple}
    }

    const getColorStyle = () => {
        return userType === UserType.Customer ? {color: colors.darkGreen} : {color: colors.purple}
    }

    return details.screen === LoadingScreenTypes.PAYMENT_PENDING ? (
        <Modal visible={details?.isLoading}>
            <View style={ modalViewBase }>
                <ModalHeader />
                <ScrollView style={styles.modalWrap}>
                    <Text style={styles.headerText}>Pending...</Text>
                    <View>
                        <Text style={styles.bodyText}>This usually takes 5-6 seconds</Text>
                    </View>
                </ScrollView>
                <View style={styles.bottomView}>
                    <ActivityIndicator size="large" color={userType === UserType.Customer ? colors.darkGreen : colors.purple} />
                </View>
            </View>
        </Modal>
    ) : (
        <Dialog visible={details?.isLoading} style={styles.dialog} backgroundStyle={getBackgroundColorStyle}>
            <View style={dialogViewBase}>
                <View style={styles.dialogWrap}>
                    <Text style={{
                        ...styles.headerText,
                        ...getColorStyle
                    }}>Loading...</Text>
                    <ActivityIndicator size="large" color={userType === UserType.Customer ? colors.darkGreen : colors.purple} />
                </View>
            </View>
        </Dialog>
    )
}

export default LoadingPage;
