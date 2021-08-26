import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'src/shared/uielements';
import { viewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { BUTTON_TYPES, SCREENS } from 'src/constants';

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
	titleView: {
		paddingLeft: 35
	},
	titleText: {
		fontSize: 50,
		lineHeight: 50,
		color: colors.black
	},
	description: {
		fontSize: 18,
		color: colors.white
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

const Teaser = (): JSX.Element => {
	const navigation = useNavigation();

	return (
		<View style={ viewBase }>
			<ImageBackground
				source={require('../../../assets/images/splash1.png')}
				resizeMode="cover" 
				style={styles.image}>
				<View style={styles.titleView}>
					<Text style={styles.titleText}>BerkShares</Text>
					<Text style={styles.description}>for the Berkshire Region</Text>
				</View>

				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title="Log In"
						onPress={() => navigation.navigate(SCREENS.LOGIN)}
					/>
					<Button
						type={BUTTON_TYPES.DARK_RED}
						title="Create an account"
						onPress={() => navigation.navigate(SCREENS.CREATE_ACCOUNT)}
						style={styles.createAccountBtn}
						textStyle={{color: colors.darkGreen}}
					/>
				</View>
			</ImageBackground>
		</View>
	);
}

export default Teaser