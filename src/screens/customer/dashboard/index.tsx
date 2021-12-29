import { AntDesign, Entypo } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import {
	ScrollView,
	StyleSheet, TouchableOpacity, TouchableWithoutFeedback,
	View
} from 'react-native';
import { Image, Text } from 'react-native-elements';
import { DwollaAPI } from 'src/api';
import { BUTTON_TYPES } from "src/constants";
import { UserContext, WalletContext } from 'src/contexts';
import { useCustomerWallet } from 'src/hooks';
import * as Routes from 'src/navigation/constants';
import { LoadingPage } from "src/views";
import { Button, Dialog, Header } from 'src/shared/uielements';
import { colors } from 'src/theme/colors';
import { baseHeader, dialogViewBase, viewBase, wrappingContainerBase } from 'src/theme/elements';
import Translation from 'src/translation/en.json';
import { DwollaDialog } from 'src/views';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SettingDialog from 'src/shared/uielements/SettingDialog';
import { EventsContext } from 'src/contexts/events';
import EventItem from 'src/shared/uielements/EventItem';
import { CustomerScanQrCodeStyle } from 'src/style';

const styles = StyleSheet.create({
	content: { paddingBottom: 80 },
	inlineView: { flexDirection: 'row' },
	headerText: {
		fontSize: 40,
		fontWeight: '400',
		lineHeight: 40,
	},
	amountView: {
		borderBottomColor: colors.darkGreen,
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 2,
		marginBottom: 10,
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		paddingLeft: 5,
		paddingRight: 5,
	},
	alertView: {
		borderLeftWidth: 5,
		borderRadius: 4,
		borderLeftColor: colors.alert,
		backgroundColor: colors.white,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	alertIcon: {
		color: colors.alert,
		fontWeight: 'bold',
	},
	alertText: {
		color: colors.black,
		width: '90%',
	},
	feedView: {
		backgroundColor: colors.card,
		padding: 10,
		marginVertical: 5,
		borderRadius: 2
	},
	feedHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
		marginTop: 10,
	},
	bodyText: {
		paddingVertical: 10,
	},
	image: {
		alignItems: 'center',
		width: '100%',
		height: 300,
		marginRight: 20,
		borderRadius: 5,
	},
	qrIcon: {
		width: 24,
		height: 24,
		marginRight: 20
	},
	scanButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%',
		height: 55,
		position: 'absolute',
		bottom: 45,
		color: colors.white,
		backgroundColor: colors.darkGreen,
		alignSelf: 'center',
		borderRadius: 30
	},
	scanBtnText: {
		color: colors.white
	},
	topupButton: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		backgroundColor: colors.darkGreen,
	},
	topupText: { color: colors.white, fontSize: 16 },
	dialog: {
		height: 320
	},
	dialogWrap: {
		paddingHorizontal: 10,
		flex: 1
	},
	dialogHeader: {
		fontSize: 30,
		lineHeight: 32,
		marginTop: 20,
		marginBottom: 10,
	},
	dialogBottom: {
		paddingTop: 20,
	}
});

const feedData = [
	{
		month: 'SEPTEMBER',
		author: 'Dory & Ginger',
		content:
			'Our motto is Live and Give. We have treasures for your home and lifestyle, along with the perfect gift for that special someone or that occasion that begs for something unique.',
	}, {
		month: 'SEPTEMBER',
		author: 'The Mahican (Muh-he-ka-new)',
		content:
			'Native American clan lived in the territory that presently makes up Berkshire County.',
	}
];


const CustomerDashboard = (): JSX.Element => {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isLoadup, setIsLoadup] = useState<boolean>(false);
	const [isPayment, setIsPayment] = useState<boolean>(false);
	const [isSetting, setIsSetting] = useState(false)
	const { customerDwollaId, user } = useContext(UserContext)
	const { customerWalletData, updateCustomerWalletData } = useContext(WalletContext)
	const { events, getEvents, deleteEvent, updateEvents } = useContext(EventsContext)
	const { isLoading: isWalletLoading } = useCustomerWallet();
	const personalFundingSource = customerWalletData?.availableFundingSource;
	const availableBalance = customerWalletData?.availableBalance;
	const [showEvents, setShowEvents] = useState(false)

	useEffect(() => {
		updateEvents([])
	}, [])

	useEffect(() => {
		const timerId = setInterval(async () => {
			if (customerDwollaId) {
				const userWallet = await DwollaAPI.loadWallet(customerDwollaId)
				const fundingSource = await DwollaAPI.loadFundingSource(customerDwollaId)
				updateCustomerWalletData(({ ...userWallet, availableFundingSource: fundingSource }))
				await getEvents(customerDwollaId)
				setShowEvents(true)
			}
		}, 1000);
		return () => clearInterval(timerId);
	}, [customerDwollaId]);

	const selectBank = () => {
		navigation.navigate(Routes.SELECT_BANK);
		onClose();
	}

	const onClose = () => {
		setIsVisible(false);
		setIsPayment(false);
		setIsLoadup(false);
	};

	const onPressScan = async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync();
		if (status === 'granted') {
			if (personalFundingSource && availableBalance > 0) {
				navigation.navigate(Routes.QRCODE_SCAN, {
					senderId: customerDwollaId,
					walletData: customerWalletData,
					username: user?.customer?.tag,
					styles: CustomerScanQrCodeStyle,
					recieveRoute: Routes.PAYMENT_REQUEST,
					cancelRoute: Routes.DASHBOARD
				})
			} else {
				navigation.navigate(Routes.RECEIVE_PAYMENT)
			}
		} else {
			setIsSetting(true)
		}
	}

	return (
		<View style={viewBase}>
			<LoadingPage visible={isWalletLoading} isData={true} />
			<Header
				leftComponent={
					<TouchableWithoutFeedback
						onPress={() =>
							navigation.dispatch(DrawerActions.toggleDrawer())
						}>
						<View style={styles.inlineView}>
							<Entypo
								name='menu'
								size={25}
								color={colors.darkGreen}
							/>
							<Text>Menu</Text>
						</View>
					</TouchableWithoutFeedback>
				}
			/>
			<View style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>
						{Translation.LANDING_PAGE.TITLE}
					</Text>
				</View>
				<View style={styles.amountView}>
					<Text style={styles.text}>B$ {personalFundingSource ? availableBalance.toFixed(2) : '-'}</Text>
					<TouchableOpacity
						style={styles.topupButton}
						onPress={() => { personalFundingSource ? navigation.navigate(Routes.LOAD_UP, { userId: customerDwollaId }) : setIsVisible(true) }}>
						<Text style={styles.topupText}>{Translation.LOAD_UP.TITLE}</Text>
					</TouchableOpacity>
				</View>
				<ScrollView>
					<View style={styles.content}>
						{!personalFundingSource && !isWalletLoading && (
							<View style={styles.alertView}>
								<AntDesign
									name='exclamationcircleo'
									size={18}
									style={styles.alertIcon}
								/>
								<Text style={styles.alertText}>
									{Translation.BANK_ACCOUNT.ACCOUNT_ALERT} &nbsp;
									<Text
										style={styles.alertIcon}
										onPress={() => setIsVisible(true)}>
										{`${Translation.BANK_ACCOUNT.LINK_PERSONAL_BANK_ACCOUNT} `}
										&gt;
									</Text>
								</Text>
							</View>
						)}
						{showEvents && events.length > 0 &&
							<EventItem
								event={events[events.length - 1]}
								onDelete={() => { deleteEvent(customerDwollaId, events[events.length - 1].dbId) }}
							/>
						}
						<View style={styles.feedView}>
							<View style={styles.feedHeader}>
								<Text h3>Merchant of the month</Text>
								<Text h3>{feedData[0].month}</Text>
							</View>
							<Text h2>{feedData[0].author}</Text>
							<Text style={styles.bodyText}>{feedData[0].content}</Text>
							<Image
								source={require('../../../../assets/images/feed1.png')}
								containerStyle={styles.image}
							/>
						</View>

						<View style={styles.feedView}>
							<View style={styles.feedHeader}>
								<Text h3>Merchant of the month</Text>
								<Text h3>{feedData[1].month}</Text>
							</View>
							<Text h2>{feedData[1].author}</Text>
							<Text style={styles.bodyText}>{feedData[1].content}</Text>
							<Image
								source={require('../../../../assets/images/feed2.png')}
								containerStyle={styles.image}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
			<TouchableOpacity onPress={onPressScan} style={styles.scanButton}>
				<Image
					source={require('../../../../assets/images/qr_code_consumer.png')}
					containerStyle={styles.qrIcon}
				/>
				<Text style={styles.scanBtnText}>{Translation.BUTTON.SCAN}</Text>
			</TouchableOpacity>
			{isVisible && (
				<DwollaDialog title={Translation.BANK_ACCOUNT.USE_DWOLLA_PERSONAL} visible={isVisible} onClose={onClose} />
			)}
			{(isLoadup || isPayment) && (
				<Dialog visible={isLoadup || isPayment} onClose={onClose} style={styles.dialog}>
					<View style={dialogViewBase}>
						{isLoadup && (
							<View style={styles.dialogWrap}>
								<Text style={styles.dialogHeader}>{Translation.LOAD_UP.LOAD_UP_NO_BANK_TITLE}</Text>
								<Text>{Translation.LOAD_UP.LOAD_UP_NO_BANK_DETAIL}</Text>
							</View>
						)}
						{isPayment && (
							<View style={styles.dialogWrap}>
								<Text style={styles.dialogHeader}>{Translation.PAYMENT.PAYMENT_NO_BANK_TITLE}</Text>
								<Text>{Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL}</Text>
							</View>
						)}
						<View style={styles.dialogBottom}>
							<Button
								type={BUTTON_TYPES.DARK_GREEN}
								title={Translation.BUTTON.LINK_PERSONAL_BANK}
								onPress={selectBank}
							/>
						</View>
					</View>
				</Dialog>
			)}

			<SettingDialog
				visible={isSetting}
				onCancel={() => setIsSetting(false)}
				description={Translation.OTHER.NO_CAMERA_PERMISSION_DETAIL}
			/>

		</View>
	);
};

export default CustomerDashboard;
