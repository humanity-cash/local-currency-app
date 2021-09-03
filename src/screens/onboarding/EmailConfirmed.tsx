import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { BUTTON_TYPES } from 'src/constants';
import { BackBtn, Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35
	},
	bodyText: {
		color: colors.bodyText
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		paddingHorizontal: 20,
        paddingBottom: 50
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

const EmailConfirmed = (): JSX.Element => {
	const navigation = useNavigation();
	const { signUpDetails: { email, password }, signIn } = useContext(AuthContext);

	return (
		<View style={viewBase}>
			<Header
				leftComponent={
					<BackBtn onClick={() => navigation.goBack()} />
				}
			/>
			<View style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>
						Mail address confirmed!
					</Text>
				</View>
				<Text style={styles.bodyText}>
					Your email address {email} is confirmed.
				</Text>
			</View>
			<View style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.DARK_GREEN}
					title='NEXT'
					onPress={() => signIn(email, password)}
				/>
			</View>
		</View>
	);
}

export default EmailConfirmed;