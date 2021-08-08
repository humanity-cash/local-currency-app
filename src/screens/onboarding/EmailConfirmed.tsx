import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Button, Header, BackBtn } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type EmailConfirmedProps = {
	navigation?: any
	route: any
}

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

const EmailConfirmedView = (props: EmailConfirmedProps) => {
	const { personalDetails: { email }} = useUserDetails();
	return (
		<View style={viewBase}>
			<Header
                leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
            />

			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>Mail address confirmed!</Text>
				</View>
				<Text style={styles.bodyText}>Your email address {email} is confirmed.</Text>
			</View>
			<View style={styles.bottomView}>
				<Button
					type="darkGreen"
					title="NEXT"
					onPress={() => props.navigation.navigate("Password")}
				/>
			</View>
		</View>
	);
}

const EmailConfirmed = (props:EmailConfirmedProps) => {
	const navigation = useNavigation();
	return <EmailConfirmedView {...props} navigation={navigation} />;
}
export default EmailConfirmed;