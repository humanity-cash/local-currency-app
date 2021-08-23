import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'src/shared/uielements';
import { viewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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

const TeaserView = (props: TeaserProps) => {
	return (
		<View style={ viewBase }>
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
						type="darkGreen"
						title={Translation.BUTTON.LOGIN}
						onPress={() => props.navigation.navigate(Routes.LOGIN)}
					/>
					<Button
						type="darkRed"
						title={Translation.BUTTON.CREATE_ACCOUNT}
						onPress={() => props.navigation.navigate(Routes.CREATE_ACCOUNT)}
						style={styles.createAccountBtn}
						textStyle={{color: colors.darkGreen}}
					/>
				</View>
			</ImageBackground>
		</View>
	);
}

const Teaser = (props: TeaserProps): ReactElement => {
	const navigation = useNavigation();
	return <TeaserView {...props} navigation={navigation}/>;
}
export default Teaser