import { AntDesign, Entypo } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from "react-native-elements";
import { Header, Notifications, WalletBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase } from "src/theme/elements";
import { SettingsOverlay } from "../settings/SettingsOverlay";
import Market from "./Market";
import OrderStatus from "./OrderStatus";
import Portfolio from "./Portfolio";

const styles = StyleSheet.create({
	headerText: {
		color: colors.white,
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16
	}
});

const TabStack = createMaterialTopTabNavigator()
function TabStackScreen() {
	return (
		<TabStack.Navigator
			style={{ flex: 1 }}
			tabBarOptions={{
				showLabel: false,
				style: {
					opacity: 0,
					borderTopWidth: 0
				}
			}}
			tabBar={() => <></>}
		>
			<TabStack.Screen name="Portfolio" component={Portfolio}/>
			<TabStack.Screen name="OrderStatus" component={OrderStatus}/>
			<TabStack.Screen name="Market" component={Market}/>
		</TabStack.Navigator>
	);
}

const Dashboard = () => {
	const [showSettings, setShowSettings] = useState(false);
	return (
		<View style={viewBase}>
			<Notifications />
			<Header
				placement="left"
				style={{ backgroundColor: colors.white }}
				// barStyle="light-content"
				// centerComponent={<Text style={styles.headerText}>Dashboard</Text>}
				// leftComponent={
				// 	<TouchableWithoutFeedback onPress={() => setShowSettings(!showSettings)}>
				// 		<View>
				// 			{!showSettings && (
				// 				<Entypo
				// 					style={{ paddingTop: 2 }}
				// 					name='menu'
				// 					size={25}
				// 					color={colors.white}
				// 				/>
				// 			)}
				// 			{showSettings && (
				// 				<AntDesign
				// 					style={{ paddingTop: 2 }}
				// 					name="arrowleft"
				// 					size={25}
				// 					color={colors.white}
				// 				/>
				// 			)}
				// 		</View>
				// 	</TouchableWithoutFeedback>
				// }
				// rightComponent={<WalletBtn />}
			/>
			<TabStackScreen />
			<SettingsOverlay visible={showSettings} />
		</View>
	);
}

export default Dashboard