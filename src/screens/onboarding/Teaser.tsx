import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { Button } from 'src/shared/uielements';
import { colors } from "src/theme/colors";
import { viewBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { AuthContext } from 'src/auth';

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
		color: colors.darkGreen1,
		marginBottom: 10
	},
	description: {
		fontSize: 16,
		color: colors.white,
		paddingLeft: 5,
		fontWeight: '500'
	},
	bottomView: {
		position: "absolute",
		left: 0,
		bottom: 0,
		right: 0,
		marginHorizontal: 20,
		marginBottom: 20
	},
	createAccountBtn: {
		marginTop: 10,
		backgroundColor: '#fff'
	}
});

const Teaser = (): JSX.Element => {
	const navigation = useNavigation();
	const { userType, authStatus, isSignUp, setIsSignUp } = useContext(AuthContext);
	
	const onPressLogin = () => {
		setIsSignUp(false)
		navigation.navigate(Routes.LOGIN)
	}

	const onPressCreateAccount = () => {
		setIsSignUp(true)
		navigation.navigate(Routes.CREATE_ACCOUNT)
	}

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

				<SafeAreaView style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title="Log In"
						onPress={onPressLogin}
					/>
					<Button
						type={BUTTON_TYPES.DARK_RED}
						title="Create an account"
						onPress={onPressCreateAccount}
						style={styles.createAccountBtn}
						textStyle={{color: colors.darkGreen}}
					/>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
};

export default Teaser;