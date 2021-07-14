import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useModalStatusBar, useUserDetails } from "src/hooks";
import { MissingStepsNavigator } from "src/navigation/MissingStepsStack";
import { Modal } from "src/shared/uielements";
import { colors } from "src/theme/colors";

type MissingStepsProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
	statusView: {
		backgroundColor: colors.brown,
		paddingHorizontal: 15,
		paddingVertical: 20,
		flexDirection: "row"
	},
	arrow: {
		marginVertical: 0
	},
	statusViewTextWrap: {
		flex: 1
	},
	statusViewText: {
		color: colors.white
	}
});

const MissingStepsView = (props: MissingStepsProps) => {
	const [visible, setVisible] = useState(false);
	const { statuses } = useUserDetails();
	const [missingSteps, setMissingSteps] = useState(0);
	const { setUseHeader } = useModalStatusBar();

	useEffect(() => {
		setMissingSteps(Object.keys(statuses).reduce((sum, status) => {
			if (!statuses[status]) {
				sum += 1;
			}
			return sum;
		}, 0) - 1);
	}, []);

	const onClose = () => {
		setUseHeader(false);
		setVisible(false);
	}
	if (missingSteps === 0) {
		return null;
	}

	return (
		<View>
			<TouchableOpacity onPress={() => setVisible(true)}>
				<View style={styles.statusView}>
					<View style={styles.statusViewTextWrap}>
						<Text h2 style={styles.statusViewText}>Tap to finalise your account</Text>
						<Text style={styles.statusViewText}>You’re only {missingSteps} steps away from trading</Text>
					</View>
					<View>
						<FontAwesome
							style={styles.arrow}
							name="thumbs-o-up"
							size={40}
							color={colors.white}
						/>
					</View>
				</View>
			</TouchableOpacity>
			{visible && (
				<Modal visible={visible} onShow={() => setUseHeader(true)}>
					<MissingStepsNavigator onClose={onClose} style={{ backgroundColor: 'transparent' }} />
				</Modal>
			)}
		</View>
	);
}

const MissingSteps = (props: MissingStepsProps) => {
	const navigation = useNavigation();
	return <MissingStepsView {...props} navigation={navigation}/>;
}
export default MissingSteps