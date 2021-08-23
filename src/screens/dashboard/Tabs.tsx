import { EvilIcons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
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
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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
	imageView: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: colors.white
	},
	image: {
		width: '70%',
		height: '70%',
		borderRadius: 20
	},
	infoView: {
		paddingVertical: 10,
		backgroundColor: colors.lightGreen1
	},
	userInfo: {
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
	},
	inlineView: {
		flexDirection: 'row'
	}
});

const DrawerContent = (props: DrawerContentComponentProps) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	
	const signOut = () => {
		props.navigation.navigate(Routes.TEASER);
	}

	return (
		<View style={styles.drawerWrap}>
			<DrawerContentScrollView {...props}>
				<View>
					<View style={styles.infoView}>
						<TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpanded)}>
							<View style={styles.userInfo}>
								<View style={styles.imageView}>
									<Image
										source={require("../../../assets/images/placeholder5.png")}
										style={styles.image} 
									/>
								</View>
								<View style={styles.usernameView}>
									<Text>Dagmar van Eijk</Text>
									<View style={styles.inlineView}>
										<Text style={styles.fadeText}>{Translation.COMMON.SWITCH_ACCOUNT}</Text>
										<EvilIcons name="chevron-down" size={26} color={colors.darkGreen} />
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>
						{isExpanded && (
							<View>
								<TouchableWithoutFeedback onPress={() => props.navigation.navigate(Routes.MERCHANT_TABS)}>
									<View style={styles.userInfo}>
										<View style={styles.imageView}>
											<Image
												source={require("../../../assets/images/placeholder5.png")}
												style={styles.image} 
											/>
										</View>
										<View style={styles.usernameView}>
											<Text>Magic Fluke</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
								<TouchableWithoutFeedback onPress={() => props.navigation.navigate(Routes.MERCHANT_TABS)}>
									<View style={styles.userInfo}>
										<View style={styles.imageView}>
										<Image
											source={require("../../../assets/images/placeholder5.png")}
											style={styles.image} 
										/>
										</View>
										<View style={styles.usernameView}>
											<Text>Cashier Magic Fluke</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
							</View>
						)}
					</View>
					<Text style={styles.berkAmount}>B$ 50.00</Text>
					<Drawer.Section>
						<DrawerItem label="Scan to pay" onPress={() => {props.navigation.navigate(Routes.SCAN_PAY)}} />
						<DrawerItem label="Receive payment"  onPress={() => {props.navigation.navigate(Routes.RECEIVE_PAYMENT)}} />
						<DrawerItem label="Load up B$"  onPress={() => {props.navigation.navigate(Routes.LOAD_UP)}} />
						<DrawerItem label="Cash out"  onPress={() => {props.navigation.navigate(Routes.CASHOUT)}} />
						<DrawerItem label="My Transactions"  onPress={() => {props.navigation.navigate(Routes.MY_TRANSACTIONS)}} />
					</Drawer.Section>
					<Drawer.Section>
						<DrawerItem label="Where to spend"  onPress={() => {props.navigation.navigate(Routes.WHERE_TO_SPEND)}} />
						<DrawerItem label="Sign up your business"  onPress={() => {props.navigation.navigate(Routes.SIGNUP_YOUR_BUSINESS)}} />
						<DrawerItem label="Settings"  onPress={() => {props.navigation.navigate(Routes.SETTINGS)}} />
						<DrawerItem label="Scan to pay"  onPress={() => {props.navigation.navigate(Routes.HELP_CONTACT)}} />
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

const Tabs = (): ReactElement => {
	return (
		<DrawerNav.Navigator initialRouteName={Routes.DASHBOARD} drawerContent={ props => <DrawerContent {...props} />}>
			<DrawerNav.Screen name={Routes.DASHBOARD} component={Dashboard} />
			<DrawerNav.Screen name={Routes.SCAN_PAY} component={QRCodeScan} />
			<DrawerNav.Screen name={Routes.RECEIVE_PAYMENT} component={Request} />
		  	<DrawerNav.Screen name={Routes.LOAD_UP} component={TopUp} />
			<DrawerNav.Screen name={Routes.CASHOUT} component={CashoutAmount} />
			<DrawerNav.Screen name={Routes.MY_TRANSACTIONS} component={MyTransactions} />
			<DrawerNav.Screen name={Routes.WHERE_TO_SPEND} component={MerchantDictionary} />
			<DrawerNav.Screen name={Routes.SIGNUP_YOUR_BUSINESS} component={BusinessAccount} />
			<DrawerNav.Screen name={Routes.SETTINGS} component={Settings} />
			<DrawerNav.Screen name={Routes.HELP_CONTACT} component={SettingsHelpAndContact} />
		</DrawerNav.Navigator>
	);
}

export default Tabs