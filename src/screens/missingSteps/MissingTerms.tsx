import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { Button, CancelBtn, ModalHeader } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

type MissingTermsProps = {
	navigation?: any
	route: any
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
		width: 300,
		height: 300
	},
	imageView: {
		justifyContent: "center",
		textAlignVertical: "center",
		flex: 1
	},
	stepCounter: {
		justifyContent: "center",
		alignItems: "center"
	},
	stepText: {
		color: colors.brown
	}
});

const MissingTermsView = (props: MissingTermsProps) => {
	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1>Our terms and conditions</Text>
				</View>
				<View style={styles.codeView}>
					<Text>Only a couple of checks needed before you can start trading.</Text>
				</View>
				<View style={styles.imageView}>
					<Image
						source={require('../../../assets/images/onboarding3.png')}
						containerStyle={styles.image}
					/>
				</View>
			</View>
			<Button
				type="fluidDark"
				title="NEXT"
				onPress={() => props.navigation.navigate('MissingTermsList')}
			/>
		</View>
	);
}

const MissingTerms = (props:MissingTermsProps) => {
	const navigation = useNavigation();
	return <MissingTermsView {...props} navigation={navigation} />;
}
export default MissingTerms