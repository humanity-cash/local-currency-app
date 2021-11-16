import { EvilIcons, Feather, AntDesign } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Drawer } from 'react-native-paper';
import { AuthContext } from 'src/auth';
import { UserType } from 'src/auth/types';
import { useUserDetails } from "src/hooks";
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import BusinessCashoutAmount from "src/screens/businessCashout/BusinessCashoutAmount";
import BusinessLoadup from "src/screens/businessLoadup/BusinessLoadup";
import BusinessPayoutSelection from 'src/screens/businessPayout/BusinessPayoutSelection';
import Report from 'src/screens/report/Report';
import { Button, Dialog } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import BusinessQRCodeScan from "../businessPayment/BusinessQRCodeScan";
import BusinessRequest from "../businessPayment/BusinessRequest";
import BusinessReturnQRCodeScan from "../businessPayment/BusinessReturnQRCodeScan";
import BusinessDashboard from "./BusinessDashboard";
import BusinessSettings from "src/screens/businessSettings/BusinessSettings";
import BusinessSettingsHelpAndContact from 'src/screens/businessSettings/BusinessSettingsHelpAndContact';
import { WalletState } from 'src/store/wallet/wallet.reducer';
import { FundingSourceState } from 'src/store/funding-source/funding-source.reducer';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';
import BankLinkDialog from 'src/shared/uielements/BankLinkDialog';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SettingDialog from 'src/shared/uielements/SettingDialog';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 30,
		lineHeight: 35,
		color: colors.purple
	},
	drawerWrap: {
		flex: 1,
		backgroundColor: colors.greyedPurple,
		paddingVertical: 30
	},
	closeBtnView: {
		paddingLeft: 15,
		paddingBottom: 10,
		flexDirection: 'row'
	},
	closeBtnText: {
		fontSize: 18,
		marginLeft: 10,
		color: colors.bodyText
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
	const { cognitoId, userAttributes } = useContext(AuthContext);
	const { signOut, updateUserType, completedCustomerVerification } = useContext(AuthContext);
	const { authorization } = useUserDetails();
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isCashierView, setIsCashierView] = useState<boolean>(false);
	const [isBankDialog, setIsBankDialog] = useState<boolean>(false);
	const [isLoadupDialog, setIsLoadupDialog] = useState<boolean>(false);

	const { businessWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;
	const { businessFundingSource } = useSelector((state: AppState) => state.fundingSourceReducer) as FundingSourceState;
	const [isSetting, setIsSetting] = useState(false)

	const onScanConfirm = () => {
		setIsVisible(false);
		props.navigation.navigate(Routes.BUSINESS_RETURN_QRCODE_SCAN);
	}

	const onScanCancel = () => {
		setIsVisible(false);
	}

	const onCashierViewConfirm = () => {
		setIsCashierView(false);
		updateUserType(cognitoId, UserType.Cashier);
	}

	const onCashierViewCancel = () => {
		setIsCashierView(false);
	}

	const onBankDialogConfirm = () => {
		setIsBankDialog(false);
		props.navigation.navigate(Routes.BUSINESS_BANK_ACCOUNT);
	}

	const onBankDialogCancel = () => {
		setIsBankDialog(false);
	}

	const onLoadupDialogConfirm = () => {
		setIsLoadupDialog(false);
		props.navigation.navigate(Routes.LOAD_UP);
	}

	const onLoadupDialogCancel = () => {
		setIsLoadupDialog(false);
	}

	const onPersonal = () => {
		updateUserType(cognitoId, UserType.Customer);
	}

	const onMakeReturn = async () => {
		const {status} = await BarCodeScanner.requestPermissionsAsync();
		if(status === 'granted') {
			if(businessFundingSource) {
				setIsVisible(true)
			} else {
				setIsBankDialog(true)
			}
		} else {
			setIsSetting(true)
		}
	}

	const onPressScanToPay = () => {
		if(businessWallet.availableBalance > 0) {
			props.navigation.navigate(Routes.BUSINESS_QRCODE_SCAN)
		} else {
			if(businessFundingSource) {
				setIsLoadupDialog(true)
			} else {
				setIsBankDialog(true)
			}
		} 
	}

	const userTag = userAttributes?.["custom:personal.tag"] || undefined
	const businessTag = userAttributes?.["custom:business.tag"] || undefined

	return (
		<View style={styles.drawerWrap}>
			<DrawerContentScrollView {...props}>
				<View>
					<TouchableOpacity 
						onPress={() => 
							props.navigation.dispatch(DrawerActions.toggleDrawer())
						}>
						<View style={styles.closeBtnView}>
							<AntDesign name="close" size={24} color={colors.bodyText} />
							<Text style={styles.closeBtnText}>Menu</Text>
						</View>
					</TouchableOpacity>
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
									<Text>{businessTag}</Text>
									{(completedCustomerVerification || isCashierView) && <View style={styles.inlineView}>
										<Text style={styles.fadeText}>
											Switch account
										</Text>
										<EvilIcons
											name="chevron-down"
											size={26}
											color={colors.purple}
										/>
									</View>}
								</View>
							</View>
						</TouchableWithoutFeedback>
						{isExpanded && (
							<View>
								{userTag ? (
									<TouchableWithoutFeedback
										onPress={onPersonal}>
										<View style={styles.userInfo}>
											<View style={styles.imageView}>
												<Image
													source={require("../../../assets/images/placeholder5.png")}
													style={styles.image}
												/>
											</View>
											<View style={styles.usernameView}>
												<Text>{userTag}</Text>
											</View>
										</View>
									</TouchableWithoutFeedback>
								) : null}
								{authorization.cashierView ? (<TouchableWithoutFeedback
									onPress={() => setIsCashierView(true)}>
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
								) : null}
							</View>
						)}
					</View>
					<Text style={styles.berkAmount}>B$ {businessWallet.availableBalance}</Text>
					<Drawer.Section>
						<DrawerItem
							label={Translation.TABS.RECEIVE_PAYMENT}
							onPress={() => props.navigation.navigate(Routes.BUSINESS_REQUEST)}
						/>
						<DrawerItem
							label={Translation.TABS.SCAN_TO_PAY}
							onPress={onPressScanToPay}
						/>
						<DrawerItem
							label={Translation.TABS.MAKE_RETURN}
							onPress={onMakeReturn}
						/>
						<DrawerItem
							label={Translation.TABS.LOADUP}
							onPress={() => businessFundingSource ?  props.navigation.navigate(Routes.BUSINESS_LOADUP) : setIsBankDialog(true)}
						/>
						<DrawerItem
							label={Translation.TABS.SEND_TO_SOMEONE}
							onPress={() => businessFundingSource ?  props.navigation.navigate(Routes.BUSINESS_PAYOUT_SELECTION) : setIsBankDialog(true)}
						/>
						<DrawerItem
							label={Translation.TABS.CASHOUT}
							onPress={() => props.navigation.navigate(Routes.BUSINESS_CASHOUT_AMOUNT)}
						/>
					</Drawer.Section>
					<Drawer.Section>
						<DrawerItem
							label={Translation.TABS.REPORT}
							onPress={() => {
								props.navigation.navigate(Routes.REPORT);
							}}
						/>
						<DrawerItem
							label={Translation.TABS.SETTINGS}
							onPress={() => {
								props.navigation.navigate(
									Routes.BUSINESS_SETTINGS
								);
							}}
						/>
						<DrawerItem
							label={Translation.TABS.HELP_AND_CONTACT}
							onPress={() => {
								props.navigation.navigate(
									Routes.BUSINESS_HELP_AND_CONTACT
								);
							}}
						/>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomSection}>
				<DrawerItem
					icon={() => (
						<Feather
							name="log-out"
							size={24}
							color={colors.purple}
						/>
					)}
					label={Translation.TABS.SIGN_OUT}
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
			<SettingDialog
				visible={isSetting}
				onCancel={() => setIsSetting(false)}
				description={Translation.OTHER.NO_CAMERA_PERMISSION_DETAIL}
			/>
			{isCashierView && (
				<CashierViewDialogDialog
					visible={isCashierView}
					onConfirm={onCashierViewConfirm}
					onCancel={onCashierViewCancel}
				/>
			)}

			<BankLinkDialog 
				visible={isBankDialog}
				description={Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL}
				buttonTitle={Translation.BUTTON.LOAD_UP_BERKSHARES}
				onConfirm={onBankDialogConfirm}
				onCancel={onBankDialogCancel}
			/>
			<BankLinkDialog 
				visible={isLoadupDialog}
				description={Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL}
				buttonTitle={Translation.BUTTON.LOAD_UP_BERKSHARES}
				onConfirm={onLoadupDialogConfirm}
				onCancel={onLoadupDialogCancel}
			/>
		</View>
	);
}

const DrawerNav = createDrawerNavigator();

const BusinessTabs: React.FC = () => {
	return (
		<DrawerNav.Navigator initialRouteName={Routes.BUSINESS_DASHBOARD} drawerContent={ props => <DrawerContent {...props} />}>
			<DrawerNav.Screen name={Routes.BUSINESS_DASHBOARD} component={BusinessDashboard} />
			<DrawerNav.Screen name={Routes.BUSINESS_REQUEST} component={BusinessRequest} />
			<DrawerNav.Screen name={Routes.BUSINESS_QRCODE_SCAN} component={BusinessQRCodeScan} />
			<DrawerNav.Screen name={Routes.BUSINESS_RETURN_QRCODE_SCAN} component={BusinessReturnQRCodeScan} />
			<DrawerNav.Screen name={Routes.BUSINESS_CASHOUT_AMOUNT} component={BusinessCashoutAmount} />
			<DrawerNav.Screen name={Routes.BUSINESS_LOADUP} component={BusinessLoadup} />
			<DrawerNav.Screen name={Routes.BUSINESS_PAYOUT_SELECTION} component={BusinessPayoutSelection} />
			<DrawerNav.Screen name={Routes.REPORT} component={Report} />
			<DrawerNav.Screen name={Routes.BUSINESS_SETTINGS} component={BusinessSettings} />
			<DrawerNav.Screen name={Routes.BUSINESS_HELP_AND_CONTACT} component={BusinessSettingsHelpAndContact} />
		</DrawerNav.Navigator>
	);
}

export default BusinessTabs