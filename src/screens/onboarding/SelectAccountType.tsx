import { useNavigation } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Button from "src/shared/uielements/Button";
import { CancelBtn } from "src/shared/uielements/header";
import Header from "src/shared/uielements/header/Header";
import { underlineHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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
			rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} onClick={() => props.navigation.navigate(Routes.TEASER)} />}
		/>

      	<ScrollView style={wrappingContainerBase}>
		  	<View style={underlineHeader}>
				<Text style={styles.headerText}>{Translation.PROFILE.HI}</Text>
			</View>
			<Text style={styles.bodyText}>{Translation.PROFILE.SELECT_PROFILE}</Text>
			<View style={styles.accountType}>
				<Button 
					type="transparent" 
					onPress={() => props.navigation.navigate(Routes.PERSONAL_PROFILE)} 
					title={Translation.BUTTON.PERSONAL}
					style={styles.button} />
				<Button 
					type="transparent" 
					onPress={() => props.navigation.navigate(Routes.SIGNUP_BUSINESS)} 
					title={Translation.BUTTON.BUSINESS_PERSONAL}
					style={styles.button}/>
			</View>
		</ScrollView>
    </View>
  );
};

const SelectAccountType = (props: SelectAccountTypeProps): ReactElement => {
  const navigation = useNavigation();
  return <SelectAccountTypeView {...props} navigation={navigation} />;
};
export default SelectAccountType;
