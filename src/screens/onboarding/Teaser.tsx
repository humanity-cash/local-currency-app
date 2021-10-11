import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { Button } from 'src/shared/uielements';
import { colors } from "src/theme/colors";
import { viewBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

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
		<View style={viewBase}>
			<ImageBackground
				source={require('../../../assets/images/mainscreen.jpg')}
				resizeMode="cover" 
				style={styles.image}>
				<View style={styles.titleView}>
					<Text style={styles.titleText}>{Translation.LANDING_PAGE.TITLE}</Text>
					<Text style={styles.description}>{Translation.LANDING_PAGE.DESCRIPTION}</Text>
				</View>

				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title="Log In"
						onPress={() => navigation.navigate(Routes.LOGIN)}
					/>
					<Button
						type={BUTTON_TYPES.DARK_RED}
						title="Create an account"
						onPress={() => navigation.navigate(Routes.CREATE_ACCOUNT)}
						style={styles.createAccountBtn}
						textStyle={{color: colors.darkGreen}}
					/>
				</View>
			</ImageBackground>
		</View>
	);
};

export default Teaser;