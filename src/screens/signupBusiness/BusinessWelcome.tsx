import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, Picker } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button } from "src/shared/uielements";
import { viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type BusinessWelcomeProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
    headerText: {
		fontSize: 32,
        lineHeight: 40,
		color: colors.purple,
	},
    bottomView: {
		paddingHorizontal: 20,
        paddingBottom: 50
	},
	skipBtn: {
		marginBottom: 10,
		color: colors.purple
	}
});

const BusinessWelcome = (props: BusinessWelcomeProps) => {
	
	return (
		<View style={viewBaseB}>
			<Header />
			<ScrollView style={wrappingContainerBase}>
                <Text style={styles.headerText}>Thank you! Welcome to the BerkShares App. Now it is time to add some BerkShares to your wallet!</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						title="Skip for now"
						style={styles.skipBtn}
						textStyle={styles.skipBtn}
						onPress={()=>props.navigation.navigate("Tabs")}
					/>
					<Button
						type="purple"
						title="Link my business bank account"
						onPress={()=>props.navigation.navigate("Tabs")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BusinessWelcome