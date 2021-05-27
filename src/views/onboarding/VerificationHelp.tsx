import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Header } from "../../uielements/header/Header";
import { baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";

type VerificationHelpProps = {
	navigation?: any
}

const styles = StyleSheet.create({
	codeView: {
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	},
	image: {
		alignSelf: "center",
		width: 200,
		height: 200
	},
	imageView: {
		justifyContent: "center",
		textAlignVertical: "center",
		flex: 1
	}
});

const VerificationHelpView = (props: VerificationHelpProps) => {
	return (
		<View style={{...viewBase}}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1>Need help?</Text>
				</View>
				<View style={styles.codeView}>
					<Text>If you need help, have questions, complaints, remarks, or just like to chat, please send an email to sven@date.com or call +41 12 34 56 78.</Text>
				</View>
				<View style={styles.imageView}>
					<Image
						source={require('../../../assets/images/needhelp.png')}
						containerStyle={styles.image}
					/>
				</View>
			</View>
		</View>
	);
}

const VerificationHelp = (props:VerificationHelpProps) => {
	const navigation = useNavigation();
	return <VerificationHelpView {...props} navigation={navigation} />;
}
export default VerificationHelp