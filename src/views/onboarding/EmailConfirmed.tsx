import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Header } from "../../uielements/header/Header";
import { baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { Button } from "../../uielements/Button";
import { useUserDetails } from "../../hooks/useUserDetails";

type EmailConfirmedProps = {
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
		width: 280,
		height: 280
	},
	imageView: {
		justifyContent: "center",
		textAlignVertical: "center",
		flex: 1
	}
});

const EmailConfirmedView = (props: EmailConfirmedProps) => {
	const { personalDetails: { email }} = useUserDetails();
	return (
		<View style={{...viewBase}}>
			<Header />

			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1>Email address confirmed!</Text>
				</View>
				<View style={styles.codeView}>
					<Text>Your email address {email} is confirmed. We will use this address to share important documents with you.</Text>
				</View>
				<View style={styles.imageView}>
					<Image
						source={require('../../../assets/images/baloons.png')}
						containerStyle={styles.image}
					/>
				</View>
			</View>
			<Button
				type="fluidDark"
				title="NEXT"
				onPress={() => props.navigation.navigate('Terms')}
			/>
		</View>
	);
}

const EmailConfirmed = (props:EmailConfirmedProps) => {
	const navigation = useNavigation();
	return <EmailConfirmedView {...props} navigation={navigation} />;
}
export default EmailConfirmed;