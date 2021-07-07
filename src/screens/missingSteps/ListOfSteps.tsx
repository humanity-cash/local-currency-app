import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { Permissions } from "react-native-unimodules";
import { useUserDetails } from "src/hooks";
import { CancelBtn, ModalHeader } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { modalViewBase, wrappingContainerBase } from "src/theme/elements";

type ListOfStepsProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
	modalHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingBottom: 10,
		color: colors.white
	},
	modalText: {
		paddingBottom: 20,
		color: colors.white
	},
	viewIncomplete: {
		marginTop: 5,
		backgroundColor: colors.white,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 20
	},
	textIncomplete: {
		fontSize: 20,
		lineHeight: 60,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrowIncomplete: {
		marginVertical: 15
	},
	viewComplete: {
		marginTop: 5,
		backgroundColor: colors.white,
		opacity: 0.6,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	textComplete: {
		fontSize: 20,
		lineHeight: 60,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrowComplete: {
		marginVertical: 15,
		marginHorizontal: 10
	}
});

const ListOfStepsView = (props: ListOfStepsProps) => {
	const { statuses, updateStatus } = useUserDetails();
	const [missingSteps, setMissingSteps] = useState(0);

	useEffect(() => {
		setMissingSteps(Object.keys(statuses).reduce((sum, status) => {
			if (!statuses[status]) {
				sum += 1;
			}
			return sum;
		}, 0) - 1);
	}, [statuses]);

	const requestNotifications = async () => {
		const { status } = await Permissions.askAsync('notifications');

		if (status) {
			updateStatus({ notifications: true });
		}
	}
	const requestVerification = async () => {
		updateStatus({ verifyId: true });
	}

	const handleAction = (action: string) => async () => {
		switch (action) {
			case 'MissingNotifications':
				return requestNotifications();
			case 'MissingVerifyId':
				return requestVerification();
			default:
				return props.navigation.navigate(action);
		}
	}

	const incompleteStep = (text: string, redirect: string) => {
		return (
			<TouchableWithoutFeedback onPress={handleAction(redirect)}>
				<View style={styles.viewIncomplete}>
					<Text style={styles.textIncomplete}>{text}</Text>
					<AntDesign
						style={styles.arrowIncomplete}
						name="arrowright"
						size={30}
						color={colors.text}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	}
	const completeStep = (text: string) => {
		return (
			<View style={styles.viewComplete}>
				<AntDesign
					style={styles.arrowComplete}
					name="check"
					size={30}
					color={colors.textSuccess}
				/>
				<Text style={styles.textComplete}>{text}</Text>
			</View>
		);
	}

	return (
		<View style={{ ...modalViewBase, backgroundColor: colors.brown }}>
			<ModalHeader
				rightComponent={<CancelBtn color={colors.white} onClick={props.route.params.onClose} />}
			/>

			<View style={{ ...wrappingContainerBase, paddingBottom: 20, marginBottom: 20 }}>
				<Text style={styles.modalHeader}>Finalise your account</Text>
				{missingSteps !== 0 && (<Text style={styles.modalText}>You’re only {missingSteps} steps away from trading</Text>)}
				{!statuses.personalDetails && (<View>{incompleteStep('Add personal details', 'MissingPersonalInfo')}</View>)}
				{statuses.personalDetails && (<View>{completeStep('Add personal details')}</View>)}

				{!statuses.terms && (<View>{incompleteStep('Accept terms and conditions', 'MissingTerms')}</View>)}
				{statuses.terms && (<View>{completeStep('Accept terms and conditions')}</View>)}

				{!statuses.verifyId && (<View>{incompleteStep('Verify your ID', 'MissingVerifyId')}</View>)}
				{statuses.verifyId && (<View>{completeStep('Verify your ID')}</View>)}

				{!statuses.cashAdded && (<View>{incompleteStep('Add cash to your settings', 'MissingAddCashInfo')}</View>)}
				{statuses.cashAdded && (<View>{completeStep('Add cash to your settings')}</View>)}

				{!statuses.notifications && (<View>{incompleteStep('Setup notifications', 'MissingNotifications')}</View>)}
				{statuses.notifications && (<View>{completeStep('Setup notifications')}</View>)}
			</View>
		</View>
	)
}

const ListOfSteps = (props: ListOfStepsProps) => {
	const navigation = useNavigation();
	return <ListOfStepsView {...props} navigation={navigation}/>;
}
export default ListOfSteps