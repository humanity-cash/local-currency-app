import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Drawer } from 'react-native-paper';
import { AuthContext } from 'src/auth';
import { colors } from "src/theme/colors";
import { baseHeader, wrappingContainerBase, dialogViewBase } from "src/theme/elements";
import { Dialog, Button } from "src/shared/uielements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { UserType } from 'src/utils/types';
import { BUTTON_TYPES } from 'src/constants';

import MerchantDashboard from "./MerchantDashboard";
import MerchantQRCodeScan from "../merchantPayment/MerchantQRCodeScan";
import MerchantRequest from "../merchantPayment/MerchantRequest";
import MerchantReturnQRCodeScan from "../merchantPayment/MerchantReturnQRCodeScan";
import MerchantCashoutAmount from "src/screens/merchantCashout/MerchantCashoutAmount";
import MerchantLoadup from "src/screens/merchantLoadup/MerchantLoadup";
import MerchantPayoutSelection from 'src/screens/merchantPayout/MerchantPayoutSelection';

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
	dialogBg: {
		backgroundColor: colors.overlayPurple
	}
});

type ReturnPaymentDialogProps = {
	visible: boolean,
	onConfirm: () => void,
	onCancel: () => void
}

const ReturnPaymentDialog = (props: ReturnPaymentDialogProps) => {
	return (
		<Dialog visible={props.visible} onClose={()=>props.onCancel()} backgroundStyle={styles.dialogBg}>
			<View style={dialogViewBase}>
				<View style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text style={styles.headerText}>
							{Translation.PAYMENT.SCAN_RECIPIENTS_QR}
						</Text>
					</View>
					<Text style={styles.detailText}>
						{Translation.PAYMENT.SCAN_RECIPIENTS_QR_DETAIL}
					</Text>
				</View>
				<View>
					<Button
						type={BUTTON_TYPES.PURPLE}
						title="Scan"
						onPress={()=>props.onConfirm()}
					/>
				</View>
			</View>
		</Dialog>
	)
}

type CashierViewDialogProps = {
	visible: boolean,
	onConfirm: ()=>void,
	onCancel: ()=>void
}

const CashierViewDialogDialog = (props: CashierViewDialogProps) => {
	return (
		<Dialog visible={props.visible} onClose={()=>props.onCancel()} backgroundStyle={styles.dialogBg}>
			<View style={dialogViewBase}>
				<View style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text style={styles.headerText}>{Translation.CASHIER.CASHIER_VIEW_SWITCH}</Text>
					</View>
					<Text style={styles.detailText}>{Translation.CASHIER.CASHIER_VIEW_SWITCH_DETAIL}</Text>
				</View>
				<View>
					<Button
						type={BUTTON_TYPES.PURPLE}
						title={Translation.BUTTON.SWITCH_VIEW}
						onPress={()=>props.onConfirm()}
					/>
				</View>
			</View>
		</Dialog>
	)
}

const DrawerContent = (props: DrawerContentComponentProps) => {
	const {setUserType} = useContext(AuthContext);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isCashierView, setIsCashierView] = useState<boolean>(false);
	
	const signOut = () => {
		props.navigation.navigate(Routes.TEASER);
	}

	const onScanConfirm = () => {
		setIsVisible(false);
		props.navigation.navigate(Routes.MERCHANT_RETURN_QRCODE_SCAN);
	}

	const onScanCancel = () => {
		setIsVisible(false);
	}

	const onCashierViewConfirm = () => {
		setIsCashierView(false);
		setUserType(UserType.CASHIER);
		props.navigation.navigate(Routes.CASHIER_DASHBOARD);
	}

	const onCashierViewCancel = () => {
		setIsCashierView(false);
	}

	const onPersonal = () => {
		setUserType(UserType.PERSONAL);
		props.navigation.navigate(Routes.DASHBOARD);
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
								<TouchableWithoutFeedback onPress={onPersonal}>
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
								<TouchableWithoutFeedback onPress={() => setIsCashierView(true)}>
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
						<DrawerItem label={Translation.TABS.RECEIVE_PAYMENT}  onPress={() => {props.navigation.navigate(Routes.MERCHANT_REQUEST)}} />
						<DrawerItem label={Translation.TABS.SCAN_TO_PAY} onPress={() => {props.navigation.navigate(Routes.MERCHANT_QRCODE_SCAN)}} />
						<DrawerItem label={Translation.TABS.MAKE_RETURN}  onPress={() => {setIsVisible(true)}} />
						<DrawerItem label={Translation.TABS.LOADUP}  onPress={() => {props.navigation.navigate(Routes.MERCHANT_LOADUP)}} />
						<DrawerItem label={Translation.TABS.SEND_TO_SOMEONE}  onPress={() => {props.navigation.navigate(Routes.MERCHANT_PAYOUT_SELECTION)}} />
						<DrawerItem label={Translation.TABS.CASHOUT}  onPress={() => {props.navigation.navigate(Routes.MERCHANT_CASHOUT_AMOUNT)}} />
					</Drawer.Section>
					<Drawer.Section>
						<DrawerItem label={Translation.TABS.REPORT}  onPress={() => {props.navigation.navigate(Routes.REPORT)}} />
						<DrawerItem label={Translation.TABS.SETTINGS}  onPress={() => {props.navigation.navigate(Routes.MERCHANT_SETTINGS)}} />
						<DrawerItem label={Translation.TABS.HELP_AND_CONTACT}  onPress={() => {props.navigation.navigate(Routes.MERCHANT_HELP_AND_CONTACT)}} />
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomSection}>
				<DrawerItem 
						icon={() => 
						<Feather 
							name="log-out"
							size={24}
							color={colors.purple}
						/>}
						label={Translation.TABS.SIGN_OUT} 
						onPress={signOut} 
				/>
			</Drawer.Section>
			{ isVisible && <ReturnPaymentDialog visible={isVisible} onConfirm={onScanConfirm} onCancel={onScanCancel} /> }
			{ isCashierView && <CashierViewDialogDialog visible={isCashierView} onConfirm={onCashierViewConfirm} onCancel={onCashierViewCancel} /> }
		</View>
	)
}

const DrawerNav = createDrawerNavigator();

const MerchantTabs: React.FC = () => {
	return (
		<DrawerNav.Navigator initialRouteName={Routes.MERCHANT_DASHBOARD} drawerContent={ props => <DrawerContent {...props} />}>
			<DrawerNav.Screen name={Routes.MERCHANT_DASHBOARD} component={MerchantDashboard} />
			<DrawerNav.Screen name={Routes.MERCHANT_REQUEST} component={MerchantRequest} />
			<DrawerNav.Screen name={Routes.MERCHANT_QRCODE_SCAN} component={MerchantQRCodeScan} />
			<DrawerNav.Screen name={Routes.MERCHANT_RETURN_QRCODE_SCAN} component={MerchantReturnQRCodeScan} />
			<DrawerNav.Screen name={Routes.MERCHANT_CASHOUT_AMOUNT} component={MerchantCashoutAmount} />
			<DrawerNav.Screen name={Routes.MERCHANT_LOADUP} component={MerchantLoadup} />
			<DrawerNav.Screen name={Routes.MERCHANT_PAYOUT_SELECTION} component={MerchantPayoutSelection} />
			<DrawerNav.Screen name={Routes.REPORT} component={MerchantDashboard} />
			<DrawerNav.Screen name={Routes.MERCHANT_SETTINGS} component={MerchantDashboard} />
			<DrawerNav.Screen name={Routes.MERCHANT_HELP_AND_CONTACT} component={MerchantDashboard} />
		</DrawerNav.Navigator>
	);
}

export default MerchantTabs