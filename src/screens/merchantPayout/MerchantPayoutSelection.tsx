import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Button from "src/shared/uielements/Button";
import { BackBtn, CancelBtn } from "src/shared/uielements/header";
import Header from "src/shared/uielements/header/Header";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type MerchantPayoutSelectionProps = {
  navigation?: any;
  route?: any;
};

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.purple,
		lineHeight: 35
	},
	bodyText: {
		color: colors.bodyText
	},
	accountType: {
		textAlign: "center",
		flex: 1,
		width: '100%',
		padding: 20
	},
	text: {
		color: colors.purple
	},
	button: {
		borderColor: colors.purple,
		borderWidth: 1,
		marginTop: 20
	}
});

const MerchantPayoutSelectionView = (props: MerchantPayoutSelectionProps) => {
  
  return (
    <View style={viewBaseB}>
		<Header
			leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
			rightComponent={<CancelBtn text="Close" color={colors.purple} onClick={() => props.navigation.navigate('MerchantDashboard')} />}
		/>

      	<ScrollView style={wrappingContainerBase}>
		  	<View style={underlineHeaderB}>
				<Text style={styles.headerText}>Send B$ to someone</Text>
			</View>
			<Text style={styles.bodyText}>To whom would you like to send BerkShares?</Text>
			<View style={styles.accountType}>
				<Button 
					type="transparent" 
					onPress={() => props.navigation.navigate("MerchantPayoutToPersonal")} 
					title="My personal account"
					textStyle={styles.text}
					style={styles.button} />
				<Button 
					type="transparent" 
					onPress={() => props.navigation.navigate("MerchantPayoutToSomeone")}
					title="Someone else" 
					textStyle={styles.text}
					style={styles.button}/>
			</View>
		</ScrollView>
    </View>
  );
};

const MerchantPayoutSelection = (props: MerchantPayoutSelectionProps) => {
  const navigation = useNavigation();
  return <MerchantPayoutSelectionView {...props} navigation={navigation} />;
};
export default MerchantPayoutSelection;
