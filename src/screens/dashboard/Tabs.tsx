import { AntDesign, Entypo } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';
import Dashboard from "./Dashboard";
import { TopUp } from "../index";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 40,
		fontWeight: '400',
		lineHeight: 40
	},
});

const Drawer = createDrawerNavigator();

const Tabs = () => {
	return (
		<Drawer.Navigator initialRouteName="Dashboard">
			<Drawer.Screen name="Dashboard" component={Dashboard} />
		  	<Drawer.Screen name="Top Up" component={TopUp} />
			<Drawer.Screen name="Cash out" component={TopUp} />
			<Drawer.Screen name="My Transactions" component={TopUp} />
			<Drawer.Screen name="Where to spend" component={TopUp} />
			<Drawer.Screen name="Sign up your business" component={TopUp} />
			<Drawer.Screen name="Settings" component={TopUp} />
			<Drawer.Screen name="Help and Contact" component={TopUp} />
		</Drawer.Navigator>
	);
}

export default Tabs