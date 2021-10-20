import React, { ReactElement, useContext, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import { UserType } from "src/auth/types";
import { Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from "src/translation/en.json";
import { LoadingScreenTypes } from 'src/utils/types';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { useDispatch } from 'react-redux';
import DwollaDialog from './DwollaDialog';

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
	const { updateUserType } = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const dispatch = useDispatch();

	const onSkip = () => {
		dispatch(updateLoadingStatus({
			isLoading: true,
			screen: LoadingScreenTypes.LOADING_DATA
		}));
		updateUserType(UserType.Business);
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
				<DwollaDialog visible={isVisible} onClose={() => setIsVisible(false)} />
			)}
		</View>
	);
};

export default BusinessWelcome;
