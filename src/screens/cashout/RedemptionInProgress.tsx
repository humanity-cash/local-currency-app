import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Switch } from 'react-native';
import { Text } from 'react-native-elements';
import { ModalHeader, Button, CancelBtn } from "src/shared/uielements";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

type RedemptionInProgressProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
});

const RedemptionInProgressView = (props: RedemptionInProgressProps) => {

	const close = () => {
		props.navigation.navigate("Dashboard");
		props.route.params.onClose();
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={close} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>Your redemption is in progress!</Text>
				</View>
				<View>
					<Text>You’ll get an email once your funds are available in your bank account. Don’t worry, it won’t take too long.</Text>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title="Go back to home"
						onPress={close}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}


const RedemptionInProgress = (props:RedemptionInProgressProps) => {
	const navigation = useNavigation();
	return <RedemptionInProgressView {...props} navigation={navigation} />;
}
export default RedemptionInProgress