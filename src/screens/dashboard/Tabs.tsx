import { EvilIcons, Octicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Drawer } from 'react-native-paper';
import { AuthContext } from 'src/auth';
import { SCREENS } from 'src/constants';
import { colors } from "src/theme/colors";
import CashoutAmount from "../cashout/CashoutAmount";
import MerchantDictionary from "../merchant/MerchantDictionary";
import TopUp from '../onboarding/TopUp';
import QRCodeScan from '../payment/QRCodeScan';
import Request from '../payment/Request';
import Settings from "../settings/Settings";
import SettingsHelpAndContact from "../settings/SettingsHelpAndContact";
import BusinessAccount from '../signupBusiness/BusinessAccount';
import MyTransactions from "../transactions/MyTransactions";
import Dashboard from "./Dashboard";

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

const DrawerContent = (
	props: DrawerContentComponentProps<DrawerContentOptions>
) => {
	const { signOut } = useContext(AuthContext);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	return (
		<View style={styles.drawerWrap}>
			<DrawerContentScrollView {...props}>
				<View>
					<View style={styles.infoView}>
						<TouchableWithoutFeedback
							onPress={() => setIsExpanded(!isExpanded)}>
							<View style={styles.userInfo}>
								<View style={styles.imageView}>
									<Image
										source={require('../../../assets/images/placeholder5.png')}
										style={styles.image}
									/>
								</View>
								<View style={styles.usernameView}>
									<Text>Dagmar van Eijk</Text>
									<View style={styles.inlineView}>
										<Text style={styles.fadeText}>
											Switch account
										</Text>
										<EvilIcons
											name='chevron-down'
											size={26}
											color={colors.darkGreen}
										/>
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>
						{isExpanded && (
							<View>
								<TouchableWithoutFeedback
									onPress={() =>
										props.navigation.navigate(
											SCREENS.MERCHANT_TABS
										)
									}>
									<View style={styles.userInfo}>
										<View style={styles.imageView}>
											<Image
												source={require('../../../assets/images/placeholder5.png')}
												style={styles.image}
											/>
										</View>
										<View style={styles.usernameView}>
											<Text>Magic Fluke</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
								<TouchableWithoutFeedback
									onPress={() =>
										props.navigation.navigate(
											SCREENS.MERCHANT_TABS
										)
									}>
									<View style={styles.userInfo}>
										<View style={styles.imageView}>
											<Image
												source={require('../../../assets/images/placeholder5.png')}
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
						<DrawerItem
							label='Scan to pay'
							onPress={() => {
								props.navigation.navigate(SCREENS.SCAN_TO_PAY);
							}}
						/>
						<DrawerItem
							label='Receive payment'
							onPress={() => {
								props.navigation.navigate(SCREENS.RECIEVE_PAYMENT);
							}}
						/>
						<DrawerItem
							label='Load up B$'
							onPress={() => {
								props.navigation.navigate(SCREENS.LOAD_UP);
							}}
						/>
						<DrawerItem
							label='Cash out'
							onPress={() => {
								props.navigation.navigate(SCREENS.CASH_OUT);
							}}
						/>
						<DrawerItem
							label='My Transactions'
							onPress={() => {
								props.navigation.navigate(SCREENS.MY_TRANSACTIONS);
							}}
						/>
					</Drawer.Section>
					<Drawer.Section>
						<DrawerItem
							label='Where to spend'
							onPress={() => {
								props.navigation.navigate(SCREENS.WHERE_TO_SPEND);
							}}
						/>
						<DrawerItem
							label='Sign up your business'
							onPress={() => {
								props.navigation.navigate(
									SCREENS.SIGN_UP_YOUR_BUSINESS
								);
							}}
						/>
						<DrawerItem
							label='Settings'
							onPress={() => {
								props.navigation.navigate(SCREENS.SETTINGS);
							}}
						/>
						<DrawerItem
							label='Scan to pay'
							onPress={() => {
								props.navigation.navigate(SCREENS.HELP_AND_CONTACT);
							}}
						/>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomSection}>
				<DrawerItem
					icon={() => (
						<Octicons
							name='sign-out'
							size={24}
							color={colors.text}
						/>
					)}
					label='Sign out'
					onPress={signOut}
				/>
			</Drawer.Section>
		</View>
	);
};

const DrawerNav = createDrawerNavigator();

const Tabs = (): JSX.Element => {
	return (
		<DrawerNav.Navigator
			initialRouteName='Dashboard'
			drawerContent={(props) => <DrawerContent {...props} />}>
			<DrawerNav.Screen name='Dashboard' component={Dashboard} />
			<DrawerNav.Screen name='ScanToPay' component={QRCodeScan} />
			<DrawerNav.Screen name='ReceivePayment' component={Request} />
			<DrawerNav.Screen name='LoadUp' component={TopUp} />
			<DrawerNav.Screen name='CashOut' component={CashoutAmount} />
			<DrawerNav.Screen
				name='MyTransactions'
				component={MyTransactions}
			/>
			<DrawerNav.Screen
				name='WhereToSpend'
				component={MerchantDictionary}
			/>
			<DrawerNav.Screen
				name='SignUpYourBusiness'
				component={BusinessAccount}
			/>
			<DrawerNav.Screen name='Settings' component={Settings} />
			<DrawerNav.Screen
				name='HelpAndContact'
				component={SettingsHelpAndContact}
			/>
		</DrawerNav.Navigator>
	);
}

export default Tabs;