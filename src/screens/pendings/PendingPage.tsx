import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { Modal, ModalHeader } from "src/shared/uielements";
import { modalViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { useLoadingModal } from "src/hooks";

const styles = StyleSheet.create({
    modalWrap: {
		paddingHorizontal: 10,
		marginBottom: 10
	},
	modalHeader: {
		fontFamily: "IBMPlexSansSemiBold",
		fontSize: 26,
		lineHeight: 45,
		marginBottom: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.darkGreen
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

const PendingPage = (): JSX.Element => {
    const { details } = useLoadingModal();

    return (
        <Modal visible={details?.isLoading}>
            <View style={ modalViewBase }>
                <ModalHeader />
                <ScrollView style={styles.modalWrap}>
                    <Text style={styles.modalHeader}>Pending...</Text>
                    <View>
                        <Text style={styles.bodyText}>This usually takes 5-6 seconds</Text>
                    </View>
                </ScrollView>
                <View style={styles.bottomView}>
                    <ActivityIndicator size="large" color={colors.darkGreen} />
                </View>
            </View>
        </Modal>
    )
}

export default PendingPage;
