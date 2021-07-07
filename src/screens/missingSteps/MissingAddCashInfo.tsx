import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { Button, CancelBtn, ModalHeader } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

type MissingAddCashInfoProps = {
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

const MissingAddCashInfoView = (props: MissingAddCashInfoProps) => {
	return (
		<Animated.View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1>Add a minimum of CHF 1'000 to your wallet</Text>
				</View>
				<View style={styles.codeView}>
					<Text>Welcome to DATE! Now it’s time to add some cash to your wallet.</Text>
				</View>
				<View style={styles.imageView}>
					<Image
						source={require('../../../assets/images/onboarding4.png')}
						containerStyle={styles.image}
					/>
				</View>
			</View>
			<Button
				type="fluidDark"
				title="NEXT"
				onPress={() => props.navigation.navigate('MissingAddCash')}
			/>
		</Animated.View>
	);
}

const MissingAddCashInfo = (props:MissingAddCashInfoProps) => {
	const navigation = useNavigation();
	return <MissingAddCashInfoView {...props} navigation={navigation} />;
}
export default MissingAddCashInfo