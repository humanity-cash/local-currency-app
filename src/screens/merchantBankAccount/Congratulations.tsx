import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";

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
				<View style={ baseHeader }>
					<Text style={styles.headerText}>Congratulations!</Text>
				</View>
				<View style={styles.bodyView}>
					<Text style={styles.bodyText}>You have linked your </Text>
					<Text style={styles.text}>Salisbury Checking (US-08-CHAS-0686-5892) </Text>
					<Text style={styles.bodyText}>bank account! You are ready to load up your BerkShares and start supporting your community!</Text>
				</View>				
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						title="Skip for now"
						textStyle={styles.text}
						onPress={() => props.navigation.navigate("MerchantTabs")}
					/>
					<Button
						type="purple"
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