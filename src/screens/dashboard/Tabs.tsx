import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
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
	Text, TouchableOpacity, TouchableWithoutFeedback,
	View
} from "react-native";
import { Drawer } from "react-native-paper";
import { UserType } from "src/auth/types";
import { AuthContext, NavigationViewContext, UserContext, WalletContext } from "src/contexts";
import { ViewState } from "src/contexts/navigation";
import * as Routes from "src/navigation/constants";
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import CashoutAmount from "../cashout/CashoutAmount";
import MerchantDictionary from "../merchant/MerchantDictionary";
import PaymentRequest from "../payment/PaymentRequest";
import Settings from "../settings/Settings";
import SettingsHelpAndContact from "../settings/SettingsHelpAndContact";
import BusinessAccount from "../signupBusiness/BusinessAccount";
import MyTransactions from "../transactions/MyTransactions";
import Dashboard from "./Dashboard";
import { BarCodeScanner } from 'expo-barcode-scanner';
import SettingDialog from 'src/shared/uielements/SettingDialog';
import BankLinkDialog from 'src/shared/uielements/BankLinkDialog';
import { PaymentsModule } from "src/modules";
import { CustomerScanQrCodeStyle } from "src/style";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: "400",
		lineHeight: 32,
	},
	detailText: {
		fontSize: 16,
		lineHeight: 20,
		paddingTop: 20
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

type BankLinkDialogStateProps = {
	visible: boolean,
	title: string,
	description: string,
	buttoTitle: string,
	confirmAction?: () => void,
	cancelAction?: () => void
}

const initBankDialogState: BankLinkDialogStateProps = {
	visible: false,
	title: "",
	description: "",
	buttoTitle: ""
}

const DrawerContent = (
	props: DrawerContentComponentProps<DrawerContentOptions>
) => {
	const { signOut, userEmail } = useContext(AuthContext);
	const { updateSelectedView } = useContext(NavigationViewContext);
	const { user, updateUserType, customerDwollaId } = useContext(UserContext)
	const authorization = { cashierView: user?.verifiedBusiness };
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [bankDialogState, setBankDialogState] = useState<BankLinkDialogStateProps>(initBankDialogState);

	const { customerWalletData } = useContext(WalletContext)
	const personalFundingSource = customerWalletData?.availableFundingSource;
	const availableBalance = customerWalletData?.availableBalance;
	const [isSetting, setIsSetting] = useState(false)

	const onMerchant = () => {
		updateUserType(UserType.Business, userEmail);
		updateSelectedView(ViewState.Business);
	};

	const onCashier = () => {
		updateUserType(UserType.Cashier, userEmail);
		updateSelectedView(ViewState.Cashier);
	};

	const onBankDialogConfirm = () => {
		setBankDialogState(initBankDialogState);
		props.navigation.navigate(Routes.SELECT_BANK);
	}

	const onBankDialogCancel = () => {
		setBankDialogState(initBankDialogState);
	}

	const onLoadupDialogConfirm = () => {
		setBankDialogState(initBankDialogState);
		props.navigation.navigate(Routes.LOAD_UP, { userId: customerDwollaId });
	}

	const onLoadupDialogCancel = () => {
		setBankDialogState(initBankDialogState);
	}

	const onPressScanToPay = async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync();
		if (status === 'granted') {
			if (availableBalance > 0) {
				props.navigation.navigate(Routes.QRCODE_SCAN, {
					senderId: customerDwollaId,
					walletData: customerWalletData,
					username: user?.customer?.tag,
					styles: CustomerScanQrCodeStyle,
					recieveRoute: Routes.PAYMENT_REQUEST,
					cancelRoute: Routes.DASHBOARD
				})
			} else {
				if (personalFundingSource) {
					setBankDialogState({
						visible: true,
						title: Translation.LOAD_UP.LOAD_UP_NO_BANK_TITLE,
						description: Translation.LOAD_UP.LOAD_UP_NO_BANK_DETAIL,
						buttoTitle: Translation.BUTTON.LOAD_UP,
						confirmAction: onLoadupDialogConfirm,
						cancelAction: onLoadupDialogCancel
					})

				} else {
					setBankDialogState({
						visible: true,
						title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
						description: Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL,
						buttoTitle: Translation.BUTTON.LINK_PERSONAL_BANK,
						confirmAction: onBankDialogConfirm,
						cancelAction: onBankDialogCancel
					})
				}
			}
		} else {
			setIsSetting(true)
		}

	}

	const customerTag = user?.customer?.tag || undefined
	const businessTag = user?.business?.tag || undefined
	const isVerifiedBusiness = user?.verifiedBusiness;

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
									<Text>@{customerTag}</Text>
									{isVerifiedBusiness && <View style={styles.inlineView}>
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
										businessTag ? onMerchant() : null
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
					<Text style={styles.berkAmount}>B$ {customerWalletData?.availableBalance?.toFixed(2)}</Text>
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
							onPress={() => customerWalletData?.availableFundingSource
								? props.navigation.navigate(Routes.LOAD_UP, 
									{ userId: customerDwollaId })
								: setBankDialogState({
									visible: true,
									title: Translation.LOAD_UP.LOAD_UP_NO_BANK_TITLE,
									description: Translation.LOAD_UP.LOAD_UP_NO_BANK_DETAIL,
									buttoTitle: Translation.BUTTON.LINK_PERSONAL_BANK,
									confirmAction: onBankDialogConfirm,
									cancelAction: onBankDialogCancel
								})
							}
						/>
						<DrawerItem
							label={Translation.TABS.CASHOUT}
							onPress={() => {
								customerWalletData?.availableFundingSource
									? props.navigation.navigate(Routes.CASHOUT_AMOUNT,
										{ userId: customerDwollaId, walletData: customerWalletData })
									: setBankDialogState({
										visible: true,
										title: Translation.CASH_OUT.CASH_OUT_NO_BANK_TITLE,
										description: Translation.CASH_OUT.CASH_OUT_NO_BANK_DETAIL,
										buttoTitle: Translation.BUTTON.LINK_PERSONAL_BANK,
										confirmAction: onBankDialogConfirm,
										cancelAction: onBankDialogCancel
									})
							}
							}
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
						{
							!user?.verifiedBusiness && <DrawerItem
								label="Sign up your business"
								onPress={() => {
									props.navigation.navigate(
										Routes.BUSINESS_ACCOUNT
									);
								}}
							/>
						}
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
					onPress={() => {
						signOut();
					}}
				/>
			</Drawer.Section>
			<BankLinkDialog
				visible={bankDialogState.visible}
				title={bankDialogState.title}
				buttonTitle={bankDialogState.buttoTitle}
				description={bankDialogState.description}
				onConfirm={() => { bankDialogState.confirmAction && bankDialogState.confirmAction() }}
				onCancel={() => { bankDialogState.cancelAction && bankDialogState.cancelAction() }}
			/>
			<SettingDialog
				visible={isSetting}
				onCancel={() => setIsSetting(false)}
				description={Translation.OTHER.NO_CAMERA_PERMISSION_DETAIL}
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
				component={PaymentsModule.Send}
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
				component={MerchantDictionary}
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
