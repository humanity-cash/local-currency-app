import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, CancelBtn, Button } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type TopUpSuccessProps = {
	navigation?: any
	route?: any
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

const TopUpSuccessView = (props: TopUpSuccessProps) => {
	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} onClick={() => props.navigation.navigate(Routes.DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.LOAD_UP.LOAD_UP_SUCCESS}</Text>
					<Text style={styles.headerText}>B$ 50.00</Text>
				</View>
				<Text>{Translation.LOAD_UP.LOAD_UP_SUCCESS_DETAIL}</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title={Translation.BUTTON.EXPLORE_BERKSHARES}
						onPress={() => props.navigation.navigate(Routes.DASHBOARD)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const TopUpSuccess = (props: TopUpSuccessProps): ReactElement => {
	const navigation = useNavigation();
	return <TopUpSuccessView {...props} navigation={navigation} />;
}
export default TopUpSuccess