import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Drawer } from 'react-native-paper';
import Dashboard from "./Dashboard";
import { Octicons } from '@expo/vector-icons';
import { TopUp, QRCodeScan, Request } from "../index";
import CashoutAmount from "../cashout/CashoutAmount";
import MyTransactions from "../transactions/MyTransactions";
import MerchantDictionary from "../merchant/MerchantDictionary";
import SettingsHelpAndContact from "../settings/SettingsHelpAndContact";
import Settings from "../settings/Settings";
import BusinessAccount from '../signupBusiness/BusinessAccount';
import { colors } from "src/theme/colors";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 40,
		fontWeight: '400',
		lineHeight: 40
	},
	drawerWrap: {
		flex: 1,
		backgroundColor: colors.lightGreen,
		paddingVertical: 30
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	userInfoView: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 5,
		paddingHorizontal: 10,
		backgroundColor: colors.lightGreen1
	},
	usernameView: {
		paddingHorizontal: 10
	},
	fadeText: {
		color: colors.darkGreen
	},
	berkAmount: {
		fontSize: 32,
		color: colors.lightBg,
		paddingHorizontal: 15,
		paddingTop: 10
	},
	bottomSection: {
		paddingBottom: 10
	}
});

const DrawerContent = (props: DrawerContentComponentProps) => {
	const signOut = () => {
		props.navigation.navigate('Teaser');
	}

	return (
		<View style={styles.drawerWrap}>
			<DrawerContentScrollView {...props}>
				<View>
					<View>
						<View style={styles.userInfoView}>
							<Image
								source={require("../../../assets/images/placeholder1.png")}
								style={styles.image} 
							/>
							<View style={styles.usernameView}>
								<Text>Dagmar van Eijk</Text>
								<Text style={styles.fadeText}>Switch account</Text>
							</View>
						</View>
						<Text style={styles.berkAmount}>B$ 50.00</Text>
					</View>
					<Drawer.Section>
						<DrawerItem label="Scan to pay" onPress={() => {props.navigation.navigate('ScanToPay')}} />
						<DrawerItem label="Receive payment"  onPress={() => {props.navigation.navigate('ReceivePayment')}} />
						<DrawerItem label="Load up B$"  onPress={() => {props.navigation.navigate('LoadUp')}} />
						<DrawerItem label="Cash out"  onPress={() => {props.navigation.navigate('CashOut')}} />
						<DrawerItem label="My Transactions"  onPress={() => {props.navigation.navigate('MyTransactions')}} />
					</Drawer.Section>
					<Drawer.Section>
						<DrawerItem label="Where to spend"  onPress={() => {props.navigation.navigate('WhereToSpend')}} />
						<DrawerItem label="Sign up your business"  onPress={() => {props.navigation.navigate('SignUpYourBusiness')}} />
						<DrawerItem label="Settings"  onPress={() => {props.navigation.navigate('Settings')}} />
						<DrawerItem label="Scan to pay"  onPress={() => {props.navigation.navigate('HelpAndContact')}} />
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomSection}>
				<DrawerItem 
						icon={() => 
						<Octicons 
							name="sign-out"
							size={24}
							color={colors.text}
						/>}
						label="Sign out" 
						onPress={signOut} 
				/>
			</Drawer.Section>
		</View>
	)
}

const DrawerNav = createDrawerNavigator();

const Tabs = () => {
	return (
		<DrawerNav.Navigator initialRouteName="Dashboard" drawerContent={ props => <DrawerContent {...props} />}>
			<DrawerNav.Screen name="Dashboard" component={Dashboard} />
			<DrawerNav.Screen name="ScanToPay" component={QRCodeScan} />
			<DrawerNav.Screen name="ReceivePayment" component={Request} />
		  	<DrawerNav.Screen name="LoadUp" component={TopUp} />
			<DrawerNav.Screen name="CashOut" component={CashoutAmount} />
			<DrawerNav.Screen name="MyTransactions" component={MyTransactions} />
			<DrawerNav.Screen name="WhereToSpend" component={MerchantDictionary} />
			<DrawerNav.Screen name="SignUpYourBusiness" component={BusinessAccount} />
			<DrawerNav.Screen name="Settings" component={Settings} />
			<DrawerNav.Screen name="HelpAndContact" component={SettingsHelpAndContact} />
		</DrawerNav.Navigator>
	);
}

export default Tabs