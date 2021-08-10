import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn } from "src/shared/uielements";
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type BusinessAccountProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
    headerText: {
		fontSize: 32,
        lineHeight: 32
	},
    bodyView: {
        paddingTop: 50,
        paddingHorizontal: 17
    },
    bodyText: {
        color: colors.bodyText,
        textAlign: 'center'
    },
    bottomView: {
		paddingHorizontal: 20,
        paddingBottom: 50
	},
});

const BusinessAccount = (props: BusinessAccountProps) => {

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
                <View style={underlineHeader}>
                    <Text style={styles.headerText}>Business account</Text>
                </View>
                <View style={styles.bodyView}>
                    <Text style={styles.bodyText}>You do not have a business account linked. If you do have a business that accepts BerkShares you can sign up and link your business!</Text>
                </View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title="Sign up your business"
						onPress={()=>props.navigation.navigate("SignupBusiness")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BusinessAccount