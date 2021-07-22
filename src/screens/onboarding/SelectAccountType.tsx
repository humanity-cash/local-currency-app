import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import Button from "src/shared/uielements/Button";
import { BackBtn, CancelBtn } from "src/shared/uielements/header";
import Header from "src/shared/uielements/header/Header";
import {
    viewBaseWhite,
    wrappingContainerBase
} from "src/theme/elements";
import { colors } from "src/theme/colors";

type SelectAccountTypeProps = {
  navigation?: any;
  route?: any;
};

const styles = StyleSheet.create({
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		color: colors.darkRed
	},
	accountType: {
		backgroundColor: colors.white,
		textAlign: "center",
		flex: 1,
		width: '100%',
		padding: 20
	}
});

const SelectAccountTypeView = (props: SelectAccountTypeProps) => {
  const { personalDetails, updatePersonalDetails } = useUserDetails();
  const [isSelected, setSelection] = useState(false);
  
  return (
    <View style={viewBaseWhite}>
      <Header
        leftComponent={<BackBtn onClick={() => props.navigation.goBack()} color={colors.darkRed} />}
        rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Tabs')} />}
      />

      <ScrollView style={{ ...wrappingContainerBase }}>
				<View style={ {marginBottom: 0 } }>
					<Text h1 style={styles.headerView}>Welcome,</Text>
				</View>
				<View
					style={{
					borderTopColor: colors.darkRed,
					borderTopWidth: 1,
					marginTop: 30
					}}>
						<Text style={{color: colors.darkRed}}>Select the portfolio you'd like to create. If you're business owner, you can automatically set up a personal profile.</Text>
				</View>
				<View style={styles.accountType}>
					<Button 
						type="darkRed" 
						onPress={() => props.navigation.navigate("PersonalProfile")} 
						title="Personal" 
						style={{backgroundColor: colors.azure}}
						textStyle={{color: colors.darkRed}}/>
					<Button 
						type="darkRed" 
						onPress={() => props.navigation.navigate("PersonalProfile")} 
						title="Business and personal" 
						style={{backgroundColor: colors.azure, marginTop: 20}}
						textStyle={{color: colors.darkRed}}/>
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
