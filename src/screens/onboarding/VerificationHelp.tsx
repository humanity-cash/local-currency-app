import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { BackBtn, Header } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

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
					<Text>If you need help, have questions,</Text>
					<Text>complaints, remarks, or just like to chat, Please send an email to sven@date.com or </Text>
					<Text>call +41 12 34 56 78.</Text>
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