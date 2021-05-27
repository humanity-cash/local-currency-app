import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button';
import { Header } from "../../uielements/header/Header";
import { Text, Image } from 'react-native-elements';
import { viewBase } from "../../theme/elements";
import { useUserDetails } from "../../hooks/useUserDetails";

type TeaserProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	loginText: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20
	},
	headerText: {
		lineHeight: 36,
		padding: 25,
		width: '90%'
	},
	bottomText: {
		padding: 20,
		width: '90%',
		marginBottom: 20
	},
	image: {
		alignSelf: "center",
		width: 250,
		height: 250
	},
	imageView: {
		justifyContent: "center",
		textAlignVertical: "center",
		flex: 1
	}
});

const TeaserView = (props: TeaserProps) => {
	const { loggedIn } = useUserDetails();
	return (
		<View style={ viewBase }>
			<Header
				rightComponent={
					<TouchableOpacity
						onPress={() => props.navigation.navigate('Login')}
						style={{ paddingEnd: 10 }}
					>
						<Text style={styles.loginText}>Log In</Text>
					</TouchableOpacity>
				}
			/>
			<Text h1 style={styles.headerText}>
				Get the most out of unlisted shares anytime, anywhere
			</Text>
			<View style={styles.imageView}>
				<Image
					source={require('../../../assets/images/teaser.png')}
					containerStyle={styles.image}
				/>
			</View>
			<Text style={styles.bottomText}>
				Welcome to DATE, the first app worldwide that enables you to trade unlisted shares digitally.
			</Text>
			{!loggedIn && (
				<Button
					type="fluidDark"
					title="CREATE YOUR ACCOUNT"
					onPress={() => props.navigation.navigate('CreateAccount')}
				/>
			)}
		</View>
	);
}

const Teaser = (props: TeaserProps) => {
	const navigation = useNavigation();
	return <TeaserView {...props} navigation={navigation}/>;
}
export default Teaser