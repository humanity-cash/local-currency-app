import React, { ReactElement, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View
} from "react-native";
import { Text } from "react-native-elements";
import { UserType } from "src/auth/types";
import { Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from "src/translation/en.json";
import DwollaDialog from 'src/screens/dashboard/DwollaDialog';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		lineHeight: 40,
		color: colors.purple,
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	skipBtn: {
		marginBottom: 10,
		color: colors.purple,
	},
});

const BusinessWelcome = (): ReactElement => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const navigation = useNavigation()

	const onSkip = () => {
		navigation.goBack()
	}

	return (
		<View style={viewBaseB}>
			<Header />
			<ScrollView style={wrappingContainerBase}>
				<Text style={styles.headerText}>
					{Translation.PROFILE.WELCOME_BERKSHARES}
				</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						title={Translation.BUTTON.SKIP_NOW}
						style={styles.skipBtn}
						textStyle={styles.skipBtn}
						onPress={onSkip}
					/>
					<Button
						type="purple"
						title={Translation.BUTTON.LINK_BUSINESS_BANK}
						onPress={() => setIsVisible(true)}
					/>
				</View>
			</KeyboardAvoidingView>

			{isVisible && (
				<DwollaDialog visible={isVisible} onClose={() => setIsVisible(false)} userType={UserType.Business} />
			)}
		</View>
	);
};

export default BusinessWelcome;
