import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import * as Routes from 'src/navigation/constants';
import Button from "src/shared/uielements/Button";
import Header from "src/shared/uielements/header/Header";
import { colors } from "src/theme/colors";
import { underlineHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35
	},
	bodyText: {
		color: colors.bodyText
	},
	accountType: {
		backgroundColor: colors.white,
		textAlign: "center",
		flex: 1,
		width: '100%',
		padding: 20
	},
	button: {
		borderWidth: 1,
		marginTop: 20
	}
});

const SelectAccountType = (): JSX.Element => {
	const navigation = useNavigation()
	const { setCustomerBasicVerificationDetails } = useContext(AuthContext);

	const handleClient = () => {
		setCustomerBasicVerificationDetails((pv: any) => ({
			...pv,
			type: "personal",
		}));
		navigation.navigate(Routes.CLIENT_PROFILE)
	}

	const handleBuisness = () => {
		setCustomerBasicVerificationDetails((pv: any) => ({
			...pv,
			type: "buisness",
		}));
		navigation.navigate(Routes.SIGNUP_BUSINESS);
	}

  return (
    <View style={viewBaseWhite}>
		<Header />
      	<ScrollView style={wrappingContainerBase}>
		  	<View style={underlineHeader}>
				<Text style={styles.headerText}>{Translation.PROFILE.HI}</Text>
			</View>
			<Text style={styles.bodyText}>{Translation.PROFILE.SELECT_PROFILE}</Text>
			<View style={styles.accountType}>
				<Button 
					type="transparent" 
					onPress={handleClient} 
					title={Translation.BUTTON.PERSONAL}
					style={styles.button} />
				<Button 
					type="transparent" 
					onPress={handleBuisness} 
					title={Translation.BUTTON.BUSINESS_CLIENT}
					style={styles.button}/>
			</View>
		</ScrollView>
    </View>
  );
};

export default SelectAccountType;
