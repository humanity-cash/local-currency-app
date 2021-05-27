import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { modalViewBase, baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { Button } from "../../uielements/Button";
import { colors } from "../../theme/colors";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";

type MissingPersonalInfoProps = {
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

const MissingPersonalInfoView = (props: MissingPersonalInfoProps) => {
	return (
		<Animated.View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1>We need your personal details</Text>
				</View>
				<View style={styles.codeView}>
					<Text>We use your personal details to set up your Cash Wallet and banking account.</Text>
				</View>
				<View style={styles.imageView}>
					<Image
						source={require('../../../assets/images/onboarding1.png')}
						containerStyle={styles.image}
					/>
				</View>
			</View>
			<Button
				type="fluidDark"
				title="NEXT"
				onPress={() => props.navigation.navigate('MissingPersonalDetails')}
			/>
		</Animated.View>
	);
}

const MissingPersonalInfo = (props:MissingPersonalInfoProps) => {
	const navigation = useNavigation();
	return <MissingPersonalInfoView {...props} navigation={navigation} />;
}
export default MissingPersonalInfo