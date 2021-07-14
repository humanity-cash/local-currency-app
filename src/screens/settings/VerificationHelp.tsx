import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { BackBtn, ModalHeader } from "src/shared/uielements";
import { baseHeader, modalBaseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

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

const VerificationHelp = () => {
	const navigation = useNavigation();
	return (
		<View style={{...viewBase}}>
			<ModalHeader
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={modalBaseHeader}>Need help?</Text>
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

export default VerificationHelp