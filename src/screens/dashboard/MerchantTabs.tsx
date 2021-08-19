import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Drawer } from 'react-native-paper';
import MerchantDashboard from "./MerchantDashboard";
import MerchantQRCodeScan from "../merchantPayment/MerchantQRCodeScan";
import MerchantRequest from "../merchantPayment/MerchantRequest";
import { colors } from "src/theme/colors";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 40,
		fontWeight: '400',
		lineHeight: 40
	},
	drawerWrap: {
		flex: 1,
		backgroundColor: colors.greyedPurple,
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
		paddingVertical: 10
	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 5,
		paddingHorizontal: 10
	},
	usernameView: {
		paddingHorizontal: 10
	},
	fadeText: {
		color: colors.purple
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
		props.navigation.navigate('Teaser');
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
									<Text>Magic Fluke</Text>
									<View style={styles.inlineView}>
										<Text style={styles.fadeText}>Switch account</Text>
										<EvilIcons name="chevron-down" size={26} color={colors.purple} />
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>
						{isExpanded && (
							<View>
								<TouchableWithoutFeedback onPress={() => props.navigation.navigate("Tabs")}>
									<View style={styles.userInfo}>
										<View style={styles.imageView}>
											<Image
												source={require("../../../assets/images/placeholder5.png")}
												style={styles.image} 
											/>
										</View>
										<View style={styles.usernameView}>
											<Text>Dagmar van Eijk</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
								<TouchableWithoutFeedback onPress={() => props.navigation.navigate("Tabs")}>
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
						<DrawerItem label="Receive payment"  onPress={() => {props.navigation.navigate('MerchantRequest')}} />
						<DrawerItem label="Scan to pay" onPress={() => {props.navigation.navigate('MerchantQRCodeScan')}} />
						<DrawerItem label="Make a return"  onPress={() => {props.navigation.navigate('LoadUp')}} />
						<DrawerItem label="Load up B$"  onPress={() => {props.navigation.navigate('CashOut')}} />
						<DrawerItem label="Send B$ to someone"  onPress={() => {props.navigation.navigate('CashOut')}} />
						<DrawerItem label="Cash out to USD"  onPress={() => {props.navigation.navigate('CashOut')}} />
					</Drawer.Section>
					<Drawer.Section>
						<DrawerItem label="Report"  onPress={() => {props.navigation.navigate('SignUpYourBusiness')}} />
						<DrawerItem label="Settings"  onPress={() => {props.navigation.navigate('Settings')}} />
						<DrawerItem label="Help and Contact"  onPress={() => {props.navigation.navigate('HelpAndContact')}} />
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomSection}>
				<DrawerItem 
						icon={() => 
						<Octicons 
							name="sign-out"
							size={24}
							color={colors.bodyText}
						/>}
						label="Sign out" 
						onPress={signOut} 
				/>
			</Drawer.Section>
		</View>
	)
}

const DrawerNav = createDrawerNavigator();

const MerchantTabs = () => {
	return (
		<DrawerNav.Navigator initialRouteName="MerchantDashboard" drawerContent={ props => <DrawerContent {...props} />}>
			<DrawerNav.Screen name="MerchantDashboard" component={MerchantDashboard} />
			<DrawerNav.Screen name="MerchantRequest" component={MerchantRequest} />
			<DrawerNav.Screen name="MerchantQRCodeScan" component={MerchantQRCodeScan} />
		  	<DrawerNav.Screen name="LoadUp" component={MerchantDashboard} />
			<DrawerNav.Screen name="CashOut" component={MerchantDashboard} />
			<DrawerNav.Screen name="MyTransactions" component={MerchantDashboard} />
			<DrawerNav.Screen name="WhereToSpend" component={MerchantDashboard} />
			<DrawerNav.Screen name="SignUpYourBusiness" component={MerchantDashboard} />
			<DrawerNav.Screen name="Settings" component={MerchantDashboard} />
			<DrawerNav.Screen name="HelpAndContact" component={MerchantDashboard} />
		</DrawerNav.Navigator>
	);
}

export default MerchantTabs