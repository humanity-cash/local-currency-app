import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { BackBtn, Header, CancelBtn, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";

type CongratulationsProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
        lineHeight: 32
	},
	bodyText: {
        color: colors.bodyText
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
				<View style={ baseHeader }>
					<Text style={styles.headerText}>Select account</Text>
				</View>
				<Text style={styles.bodyText}>You have linked your Salisbury Checking (US-08-CHAS-0686-5892) bank account! You are ready to load up your BerkShares and start supporting your community!</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						title="Skip for now"
						onPress={() => props.navigation.navigate("Tabs")}
					/>
					<Button
						type="darkGreen"
						title="Load up BerkShares"
						onPress={() => props.navigation.navigate("TopUp")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const Congratulations = (props: CongratulationsProps) => {
	const navigation = useNavigation();
	return <CongratulationsView {...props} navigation={navigation} />;
}
export default Congratulations