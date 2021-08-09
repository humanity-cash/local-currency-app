import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Button, Header } from 'src/shared/uielements';
import { viewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type TeaserProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'column'
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center'
	},
	bottomView: {
		position: "absolute",
		left: 0,
		bottom: 0,
		width: '100%',
		height: 170,
		padding: 20
	},
	createAccountBtn: {
		marginTop: 10,
		backgroundColor: '#fff'
	}
});

const TeaserView = (props: TeaserProps) => {
	const { loggedIn } = useUserDetails();
	return (
		<View style={ viewBase }>
			<ImageBackground
				source={require('../../../assets/images/splash1.png')}
				resizeMode="cover" 
				style={styles.image}>

				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title="Log In"
						onPress={() => props.navigation.navigate('Login')}
					/>
					<Button
						type="darkRed"
						title="Create an account"
						onPress={() => props.navigation.navigate('CreateAccount')}
						style={styles.createAccountBtn}
						textStyle={{color: colors.darkGreen}}
					/>
				</View>
			</ImageBackground>
		</View>
	);
}

const Teaser = (props: TeaserProps) => {
	const navigation = useNavigation();
	return <TeaserView {...props} navigation={navigation}/>;
}
export default Teaser