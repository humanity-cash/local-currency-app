import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Drawer } from 'react-native-paper';
import { colors } from "src/theme/colors";
import { baseHeader, wrappingContainerBase, dialogViewBase } from "src/theme/elements";
import { Dialog, Button } from "src/shared/uielements";

import MerchantDashboard from "./MerchantDashboard";
import MerchantQRCodeScan from "../merchantPayment/MerchantQRCodeScan";
import MerchantRequest from "../merchantPayment/MerchantRequest";
import MerchantReturnQRCodeScan from "../merchantPayment/MerchantReturnQRCodeScan";
import MerchantCashoutAmount from "src/screens/merchantCashout/MerchantCashoutAmount";
import MerchantLoadup from "src/screens/merchantLoadup/MerchantLoadup";
import MerchantPayoutSelection from 'src/screens/merchantPayout/MerchantPayoutSelection';
import { AuthContext } from 'src/auth';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		lineHeight: 35,
		color: colors.purple
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
	},
	detailText: {
		fontSize: 16,
		color: colors.bodyText
	},
});

type ReturnPaymentDialogProps = {
	visible: boolean,
	onConfirm: ()=>void,
	onCancel: ()=>void
}

const ReturnPaymentDialog = (props: ReturnPaymentDialogProps) => {

	return (
		<Dialog visible={props.visible} onClose={()=>props.onCancel()} backgroundStyle={{backgroundColor: colors.overlayPurple}}>
			<View style={dialogViewBase}>
				<View style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text style={styles.headerText}>Scan the recipients QR.</Text>
					</View>
					<Text style={styles.detailText}>
						The customer needs to generate QR code via the inital transaction in their transactioin overview. There they generate a QR code which needs to be scanned by you.
					</Text>
				</View>
				<View>
					<Button
						type="purple"
						title="Scan"
						onPress={()=>props.onConfirm()}
					/>
				</View>
			</View>
		</Dialog>
	)
}

const DrawerContent = (props: DrawerContentComponentProps) => {
	 
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { userAttributes } = useContext(AuthContext);
	
	const signOut = () => {
		props.navigation.navigate('Teaser');
	}

	const onScanConfirm = () => {
		setIsVisible(false);
		props.navigation.navigate('MerchantReturnQRCodeScan');
	}

	const onScanCancel = () => {
		setIsVisible(false);
	}

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
										source={require("../../../assets/images/placeholder5.png")}
										style={styles.image}
									/>
								</View>
								<View style={styles.usernameView}>
									<Text>
										{
											userAttributes?.[
												"custom:personal.tag"
											]
										}
									</Text>
									<View style={styles.inlineView}>
										<Text style={styles.fadeText}>
											Switch account
										</Text>
										<EvilIcons
											name="chevron-down"
											size={26}
											color={colors.purple}
										/>
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>
						{isExpanded && (
							<View>
								<TouchableWithoutFeedback
									onPress={() =>
										props.navigation.navigate("Tabs")
									}>
									<View style={styles.userInfo}>
										<View style={styles.imageView}>
											<Image
												source={require("../../../assets/images/placeholder5.png")}
												style={styles.image}
											/>
										</View>
										<View style={styles.usernameView}>
											<Text>
												{
													userAttributes?.[
														"custom:business.rbn"
													]
												}
											</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
								<TouchableWithoutFeedback
									onPress={() => console.log("some")}>
									<View style={styles.userInfo}>
										<View style={styles.imageView}>
											<Image
												source={require("../../../assets/images/placeholder5.png")}
												style={styles.image}
											/>
										</View>
										<View style={styles.usernameView}>
											<Text>Cashier</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
							</View>
						)}
					</View>
					<Text style={styles.berkAmount}>B$ 50.00</Text>
					<Drawer.Section>
						<DrawerItem
							label="Receive payment"
							onPress={() => {
								props.navigation.navigate("MerchantRequest");
							}}
						/>
						<DrawerItem
							label="Scan to pay"
							onPress={() => {
								props.navigation.navigate("MerchantQRCodeScan");
							}}
						/>
						<DrawerItem
							label="Make a return"
							onPress={() => {
								setIsVisible(true);
							}}
						/>
						<DrawerItem
							label="Load up B$"
							onPress={() => {
								props.navigation.navigate("MerchantLoadup");
							}}
						/>
						<DrawerItem
							label="Send B$ to someone"
							onPress={() => {
								props.navigation.navigate(
									"MerchantPayoutSelection"
								);
							}}
						/>
						<DrawerItem
							label="Cash out to USD"
							onPress={() => {
								props.navigation.navigate(
									"MerchantCashoutAmount"
								);
							}}
						/>
					</Drawer.Section>
					<Drawer.Section>
						<DrawerItem
							label="Report"
							onPress={() => {
								props.navigation.navigate("SignUpYourBusiness");
							}}
						/>
						<DrawerItem
							label="Settings"
							onPress={() => {
								props.navigation.navigate("Settings");
							}}
						/>
						<DrawerItem
							label="Help and Contact"
							onPress={() => {
								props.navigation.navigate("HelpAndContact");
							}}
						/>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomSection}>
				<DrawerItem
					icon={() => (
						<Octicons
							name="sign-out"
							size={24}
							color={colors.bodyText}
						/>
					)}
					label="Sign out"
					onPress={signOut}
				/>
			</Drawer.Section>
			{isVisible && (
				<ReturnPaymentDialog
					visible={isVisible}
					onConfirm={onScanConfirm}
					onCancel={onScanCancel}
				/>
			)}
		</View>
	);
}

const DrawerNav = createDrawerNavigator();

const MerchantTabs: React.FC = () => {
	return (
		<DrawerNav.Navigator initialRouteName="MerchantDashboard" drawerContent={ props => <DrawerContent {...props} />}>
			<DrawerNav.Screen name="MerchantDashboard" component={MerchantDashboard} />
			<DrawerNav.Screen name="MerchantRequest" component={MerchantRequest} />
			<DrawerNav.Screen name="MerchantQRCodeScan" component={MerchantQRCodeScan} />
			<DrawerNav.Screen name="MerchantReturnQRCodeScan" component={MerchantReturnQRCodeScan} />
			<DrawerNav.Screen name="MerchantCashoutAmount" component={MerchantCashoutAmount} />
			<DrawerNav.Screen name="MerchantLoadup" component={MerchantLoadup} />
			<DrawerNav.Screen name="MerchantPayoutSelection" component={MerchantPayoutSelection} />
			<DrawerNav.Screen name="SignUpYourBusiness" component={MerchantDashboard} />
			<DrawerNav.Screen name="Settings" component={MerchantDashboard} />
			<DrawerNav.Screen name="HelpAndContact" component={MerchantDashboard} />
		</DrawerNav.Navigator>
	);
}

export default MerchantTabs