import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from "react-native-elements";
import { useShares } from "src/hooks";
import { Button, Dots } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { wrappingContainerBase, viewBaseWhite } from "src/theme/elements";

type PortfolioProps = {
	navigation?: any,
	route?: any
}

const styles = StyleSheet.create({
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		color: colors.darkRed
	},
	codeView: {
		flex: 1,
		backgroundColor: colors.lightBg,
		minHeight: '100%'
	},
	contentView: {
		padding: 10
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	},
	emptyListText: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16,
		textAlign: "center"
	},
	image: {
		alignSelf: "center",
		width: 250,
		height: 250
	},
	accountType: {
		backgroundColor: colors.white,
		textAlign: "center",
		flex: 1,
		width: '100%',
		padding: 20
	}
});

const PortfolioView = (props: PortfolioProps) => {
	return (
		<View style={viewBaseWhite}>
			<ScrollView style={{ ...wrappingContainerBase }}>
				<View style={ {marginBottom: 0 } }>
					<Text h1 style={styles.headerView}>Welcome,</Text>
					{/* <Dots selected={0} length={3} /> */}
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
}

const Portfolio = (props:PortfolioProps) => {
	const navigation = useNavigation();
	return <PortfolioView {...props} navigation={navigation} />;
}
export default Portfolio
