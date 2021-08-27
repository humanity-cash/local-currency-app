import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type CongratulationsProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
        lineHeight: 32,
		color: colors.purple
	},
	bodyView: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	bodyText: {
        color: colors.bodyText
    },
	text: {
		color: colors.purple
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 45
	},
});

const CongratulationsView = (props: CongratulationsProps) => {
	return (
		<View style={viewBaseWhite}>
			<Header />
			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.BANK_ACCOUNT.CONGRATULATION}</Text>
				</View>
				<View style={styles.bodyView}>
					<Text style={styles.bodyText}>{Translation.BANK_ACCOUNT.CONGRATULATION_DETAIL}</Text>
				</View>				
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						title={Translation.BUTTON.SKIP_NOW}
						textStyle={styles.text}
						onPress={() => props.navigation.navigate(Routes.MERCHANT_DASHBOARD)}
					/>
					<Button
						type="purple"
						title={Translation.LOAD_UP.LOAD_UP_BERKSHARES}
						onPress={() => props.navigation.navigate(Routes.LOAD_UP)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const Congratulations = (props: CongratulationsProps): ReactElement => {
	const navigation = useNavigation();
	return <CongratulationsView {...props} navigation={navigation} />;
}
export default Congratulations