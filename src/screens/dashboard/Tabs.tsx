import { EvilIcons, Feather, AntDesign } from "@expo/vector-icons";
import {
	createDrawerNavigator,
	DrawerContentComponentProps,
	DrawerContentOptions,
	DrawerContentScrollView,
	DrawerItem
} from "@react-navigation/drawer";
import { DrawerActions } from '@react-navigation/native';
import React, { useContext, useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
	TouchableOpacity
} from "react-native";
import { Drawer } from "react-native-paper";
import { AuthContext } from "src/auth";
import { UserType } from "src/auth/types";
import { useUserDetails } from "src/hooks";
import * as Routes from "src/navigation/constants";
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import CashoutAmount from "../cashout/CashoutAmount";
import BusinessDictionary from "../business/BusinessDictionary";
import PaymentRequest from "../payment/PaymentRequest";
import QRCodeScan from "../payment/QRCodeScan";
import Settings from "../settings/Settings";
import SettingsHelpAndContact from "../settings/SettingsHelpAndContact";
import BusinessAccount from "../signupBusiness/BusinessAccount";
import MyTransactions from "../transactions/MyTransactions";
import Dashboard from "./Dashboard";
import { Button, Dialog } from "src/shared/uielements";
import { baseHeader, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import { BUTTON_TYPES } from "src/constants";
import { WalletState } from 'src/store/wallet/wallet.reducer';
import { FundingSourceState } from 'src/store/funding-source/funding-source.reducer';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';
import BankLinkDialog from 'src/shared/uielements/BankLinkDialog';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 40,
		fontWeight: "400",
		lineHeight: 40,
	},
	drawerWrap: {
		flex: 1,
		backgroundColor: colors.lightGreen,
		paddingVertical: 30,
	},
	closeBtnView: {
		paddingLeft: 15,
		paddingBottom: 20,
		flexDirection: 'row'
	},
	closeBtnText: {
		fontSize: 18,
		marginLeft: 10,
		color: colors.bodyText
	},
	imageView: {
		justifyContent: "center",
		alignItems: "center",
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: colors.white,
	},
	image: {
		width: "70%",
		height: "70%",
		borderRadius: 20,
	},
	infoView: {
		paddingVertical: 10,
		backgroundColor: colors.lightGreen1,
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 5,
		paddingHorizontal: 10,
		backgroundColor: colors.lightGreen1,
	},
	usernameView: {
		paddingHorizontal: 10,
	},
	fadeText: {
		color: colors.darkGreen,
	},
	berkAmount: {
		fontSize: 32,
		color: colors.lightBg,
		paddingHorizontal: 15,
		paddingTop: 10,
	},
	bottomSection: {
		paddingBottom: 10,
	},
	inlineView: {
		flexDirection: "row",
	}
});

const DrawerContent = (
	props: DrawerContentComponentProps<DrawerContentOptions>
) => {
	const { signOut, cognitoId, updateUserType, userAttributes, completedBusinessVerification } = useContext(AuthContext);
	const { authorization } = useUserDetails();
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [isBankDialog, setIsBankDialog] = useState<boolean>(false);
	const [isLoadupDialog, setIsLoadupDialog] = useState<boolean>(false);

	const { personalWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;
	const { personalFundingSource } = useSelector((state: AppState) => state.fundingSourceReducer) as FundingSourceState;

	const onBusiness = () => {
		updateUserType(cognitoId, UserType.Business);
	};

	const onCashier = () => {
		updateUserType(cognitoId, UserType.Cashier);
	};

	const onBankDialogConfirm = () => {
		setIsBankDialog(false);
		props.navigation.navigate(Routes.SELECT_BANK);
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

	const onPressScanToPay = () => {
		if(personalWallet.availableBalance > 0) {
			props.navigation.navigate(Routes.QRCODE_SCAN)
		} else {
			if(personalFundingSource) {
				setIsLoadupDialog(true)
			} else {
				setIsBankDialog(true)
			}
		} 
	}

	const customerTag = userAttributes?.["custom:personal.tag"];
	const businessTag = userAttributes?.["custom:business.tag"];

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
							onPress={() =>
								!businessTag ? null : setIsExpanded(!isExpanded)
							}>
							<View style={styles.userInfo}>
								<View style={styles.imageView}>
									<Image
										source={require("../../../assets/images/placeholder5.png")}
										style={styles.image}
									/>
								</View>
								<View style={styles.usernameView}>
									<Text>{customerTag}</Text>
									{completedBusinessVerification && <View style={styles.inlineView}>
										<Text style={styles.fadeText}>
											{Translation.COMMON.SWITCH_ACCOUNT}
										</Text>
										<EvilIcons
											name="chevron-down"
											size={26}
											color={colors.darkGreen}
										/>
									</View>}
								</View>
							</View>
						</TouchableWithoutFeedback>
						{isExpanded && (
							<View>
								<TouchableWithoutFeedback
									onPress={() =>
										businessTag ? onBusiness() : null
									}>
									{businessTag ? (
										<View style={styles.userInfo}>
											<View style={styles.imageView}>
												<Image
													source={require("../../../assets/images/placeholder5.png")}
													style={styles.image}
												/>
											</View>
											<View style={styles.usernameView}>
												<Text>{businessTag}</Text>
											</View>
										</View>
									) : null}
								</TouchableWithoutFeedback>
								{authorization.cashierView ? (
									<TouchableWithoutFeedback
										onPress={() =>
											businessTag ? onCashier() : null
										}>
										{businessTag ? (
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
										) : null}
									</TouchableWithoutFeedback>
								) : null}
							</View>
						)}
					</View>
					<Text style={styles.berkAmount}>B$ {personalWallet.availableBalance}</Text>
					<Drawer.Section>
						<DrawerItem
							label={Translation.TABS.SCAN_TO_PAY}
							onPress={onPressScanToPay}
						/>
						<DrawerItem
							label={Translation.TABS.RECEIVE_PAYMENT}
							onPress={() => props.navigation.navigate(Routes.RECEIVE_PAYMENT)}
						/>
						<DrawerItem
							label={Translation.TABS.LOADUP}
							onPress={() => personalFundingSource ? props.navigation.navigate(Routes.LOAD_UP) : setIsBankDialog(true)}
						/>
						<DrawerItem
							label={Translation.TABS.CASHOUT}
							onPress={() => personalFundingSource ? props.navigation.navigate(Routes.CASHOUT_AMOUNT) : setIsBankDialog(true)}
						/>
					</Drawer.Section>
					<Drawer.Section>
						<DrawerItem
							label="My Transactions"
							onPress={() => {
								props.navigation.navigate(
									Routes.MY_TRANSACTIONS
								);
							}}
						/>
						<DrawerItem
							label="Where to spend"
							onPress={() => {
								props.navigation.navigate(
									Routes.WHERE_TO_SPEND
								);
							}}
						/>
						<DrawerItem
							label="Sign up your business"
							onPress={() => {
								props.navigation.navigate(
									Routes.BUSINESS_ACCOUNT
								);
							}}
						/>
						<DrawerItem
							label="Settings"
							onPress={() => {
								props.navigation.navigate(Routes.SETTINGS);
							}}
						/>
						<DrawerItem
							label="Help and Contact"
							onPress={() => {
								props.navigation.navigate(Routes.HELP_CONTACT);
							}}
						/>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomSection}>
				<DrawerItem
					icon={() => (
						<Feather name="log-out" size={24} color={colors.text} />
					)}
					label="Sign out"
					onPress={signOut}
				/>
			</Drawer.Section>
			<BankLinkDialog 
				visible={isBankDialog}
				description={Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL}
				buttonTitle={Translation.BUTTON.LINK_BANK}
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
};

const DrawerNav = createDrawerNavigator();

const Tabs = (): JSX.Element => {
	return (
		<DrawerNav.Navigator
			initialRouteName={Routes.DASHBOARD}
			drawerContent={(props) => <DrawerContent {...props} />}>
			<DrawerNav.Screen name={Routes.DASHBOARD} component={Dashboard} />
			<DrawerNav.Screen
				name={Routes.QRCODE_SCAN}
				component={QRCodeScan}
			/>
			<DrawerNav.Screen
				name={Routes.RECEIVE_PAYMENT}
				component={PaymentRequest}
			/>
			<DrawerNav.Screen
				name={Routes.CASHOUT_AMOUNT}
				component={CashoutAmount}
			/>
			<DrawerNav.Screen
				name={Routes.MY_TRANSACTIONS}
				component={MyTransactions}
			/>
			<DrawerNav.Screen
				name={Routes.WHERE_TO_SPEND}
				component={BusinessDictionary}
			/>
			<DrawerNav.Screen
				name={Routes.BUSINESS_ACCOUNT}
				component={BusinessAccount}
			/>
			<DrawerNav.Screen name={Routes.SETTINGS} component={Settings} />
			<DrawerNav.Screen
				name={Routes.HELP_CONTACT}
				component={SettingsHelpAndContact}
			/>
		</DrawerNav.Navigator>
	);
};

export default Tabs;
