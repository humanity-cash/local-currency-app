import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Button from "src/shared/uielements/Button";
import { BackBtn, CancelBtn } from "src/shared/uielements/header";
import Header from "src/shared/uielements/header/Header";
import { underlineHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type SelectAccountTypeProps = {
  navigation?: any;
  route?: any;
};

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

const SelectAccountTypeView = (props: SelectAccountTypeProps) => {
  
  return (
    <View style={viewBaseWhite}>
		<Header
			rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Teaser')} />}
		/>

      	<ScrollView style={wrappingContainerBase}>
		  	<View style={underlineHeader}>
				<Text h1 style={styles.headerText}>Hi</Text>
			</View>
			<Text style={styles.bodyText}>Select the profile you’d like to create. If you’re a business owner, you can automatically set up a personal profile.</Text>
			<View style={styles.accountType}>
				<Button 
					type="transparent" 
					onPress={() => props.navigation.navigate("PersonalProfile")} 
					title="Personal"
					style={styles.button} />
				<Button 
					type="transparent" 
					onPress={() => props.navigation.navigate("PersonalProfile")} 
					title="Business and personal" 
					style={styles.button}/>
			</View>
		</ScrollView>
    </View>
  );
};

const SelectAccountType = (props: SelectAccountTypeProps) => {
  const navigation = useNavigation();
  return <SelectAccountTypeView {...props} navigation={navigation} />;
};
export default SelectAccountType;
