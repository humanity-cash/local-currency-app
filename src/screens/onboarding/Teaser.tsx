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
	headerText: {
		fontSize: 12,
		fontWeight: "bold",
	},
	content: {
		justifyContent: "center",
		textAlignVertical: "center",
		height: '80%'
	},
	image: {
		flex: 1,
		padding: 20,
	},
	bottomView: {
		position: "absolute",
		left: 0,
		bottom: 0,
		width: '100%',
		height: '20%',
		padding: 20,
		backgroundColor: '#fff',
	},
});

const TeaserView = (props: TeaserProps) => {
	const { loggedIn } = useUserDetails();
	return (
		<View style={ viewBase }>
			<View style={styles.content}>
				<ImageBackground
					source={require('../../../assets/images/splash1.png')}
					resizeMode="cover" 
					style={styles.image}>

					<Text style={styles.headerText}>B$ BERKSHARES</Text>
				</ImageBackground>
			</View>
			<View style={styles.bottomView}>
				{!loggedIn && (
					<Button
						type="darkRed"
						title="Log In"
						onPress={() => props.navigation.navigate('Login')}
					/>
				)}
				{!loggedIn && (
					<Button
						type="darkRed"
						title="CREATE YOUR ACCOUNT"
						onPress={() => props.navigation.navigate('CreateAccount')}
						style={{backgroundColor: 'transparent'}}
						textStyle={{color: colors.darkRed}}
					/>
				)}
			</View>
		</View>
	);
}

const Teaser = (props: TeaserProps) => {
	const navigation = useNavigation();
	return <TeaserView {...props} navigation={navigation}/>;
}
export default Teaser