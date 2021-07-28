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
	accountView: {
		backgroundColor: colors.azure,
		padding: 10
	},
	bottomView: {
		padding: 20,
	},
});

const CongratulationsView = (props: CongratulationsProps) => {
	return (
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Tabs')} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1 style={{color: colors.blue}}>Congratulations!</Text>
					<Text>You have linked your bank account! You are ready to top up your BerkShares and start supporting your community!</Text>
				</View>
				<View style={styles.accountView}>
					<Text style={{fontWeight: 'bold'}}>Bank account</Text>
					<Text>*My account name*</Text>
					<Text>***XXXX</Text>
					<Text>USD$</Text>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkRed"
						style={{backgroundColor: colors.blue}}
						title="Top Up BerkShares"
						textStyle={{color: colors.white}}
						onPress={() => props.navigation.navigate("Tabs")}
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