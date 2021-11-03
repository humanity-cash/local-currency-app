import { AntDesign, Entypo } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';
import {
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	TouchableOpacity
} from 'react-native';
import { Image, Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import * as Routes from 'src/navigation/constants';
import { Header } from 'src/shared/uielements';
import { colors } from 'src/theme/colors';
import { baseHeader, viewBase, wrappingContainerBase } from 'src/theme/elements';
import Translation from 'src/translation/en.json';
import DwollaDialog from './DwollaDialog';
import { Button, Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { BUTTON_TYPES } from "src/constants";
import { LoadingScreenTypes } from 'src/utils/types';
import { loadPersonalWallet } from 'src/store/wallet/wallet.actions';
import { loadPersonalFundingSource } from 'src/store/funding-source/funding-source.actions';
import { WalletState } from 'src/store/wallet/wallet.reducer';
import { FundingSourceState } from 'src/store/funding-source/funding-source.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'src/store';
import { UserType } from 'src/auth/types';
import { showLoadingProgress, hideLoadingProgress } from '../../store/loading/loading.actions';
import { UserAPI } from 'src/api';
import { INotificationResponse } from '../../api/types';
import BankLinkDialog from 'src/shared/uielements/BankLinkDialog';

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
	warningView: {
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
	warningIcon: {
		color: colors.alert,
		fontWeight: 'bold',
	},
	infoView: {
		borderLeftWidth: 5,
		borderRadius: 4,
		borderLeftColor: colors.info,
		backgroundColor: colors.white,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	infoIcon: {
		color: colors.info,
		fontWeight: 'bold',
	},
	errorView: {
		borderLeftWidth: 5,
		borderRadius: 4,
		borderLeftColor: colors.error,
		backgroundColor: colors.white,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	errorIcon: {
		color: colors.error,
		fontWeight: 'bold',
	},
	notificationText: {
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

const Dashboard = (): JSX.Element => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { customerDwollaId } = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isLoadup, setIsLoadup] = useState<boolean>(false);
	const [isPayment, setIsPayment] = useState<boolean>(false);
	const [notifications, setNotifications] = useState<INotificationResponse[]>([])

	const { personalWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;
	const { personalFundingSource } = useSelector((state: AppState) => state.fundingSourceReducer) as FundingSourceState;

	useEffect(() => {
		if (customerDwollaId) {
			(async () => {
				dispatch(showLoadingProgress(LoadingScreenTypes.LOADING_DATA))
				await dispatch(loadPersonalFundingSource(customerDwollaId));
				dispatch(hideLoadingProgress())
			})();
		}

		updateNotification()
		const timer = setInterval(() => {
			updateNotification()
		}, 20000)

		return(() => {
			clearInterval(timer)
		})
	}, []);

	const updateNotification = async () => {
		if(customerDwollaId) {
			dispatch(loadPersonalWallet(customerDwollaId));
			const notis = await UserAPI.getNotifications(customerDwollaId)
			setNotifications(notis)
			if(notis.length > 0) {
				setTimeout(() => {
					setNotifications([])
				}, 5000)

				for(let i = 0; i < notis.length; i++) {
					await UserAPI.deleteNotification(customerDwollaId, notis[i].dbId)
				}
			}
		}
	}

	const selectBank = () => {
		if (personalFundingSource) {
			navigation.navigate(Routes.LOAD_UP);
		} else {
			navigation.navigate(Routes.SELECT_BANK);
		}
		onClose();
	}

	const onClose = () => {
		setIsVisible(false);
		setIsPayment(false);
		setIsLoadup(false);
	};

	const onPressScan = () => {
		if(personalWallet.availableBalance > 0) {
			if(personalFundingSource) {
				navigation.navigate(Routes.QRCODE_SCAN)
			} else {
				navigation.navigate(Routes.RECEIVE_PAYMENT)
			}
		} else {
			setIsPayment(true)
		}
	}

	return (
		<View style={viewBase}>
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
					<Text style={styles.text}>B$ {personalFundingSource ? personalWallet.availableBalance : '-'}</Text>
					<TouchableOpacity
						style={styles.topupButton}
						onPress={() => personalFundingSource ? navigation.navigate(Routes.LOAD_UP) : setIsLoadup(true)}>
						<Text style={styles.topupText}>Load up B$</Text>
					</TouchableOpacity>
				</View>
				<ScrollView>
					<View style={styles.content}>
						{!personalFundingSource ? (
							<View style={styles.warningView}>
								<AntDesign
									name='exclamationcircleo'
									size={18}
									style={styles.warningIcon}
								/>
								<Text style={styles.notificationText}>
									{Translation.BANK_ACCOUNT.ACCOUNT_ALERT} &nbsp;
									<Text
										style={styles.warningIcon}
										onPress={() => setIsVisible(true)}>
										{Translation.BANK_ACCOUNT.ACCOUNT_LINK_TEXT}{' '}
										&gt;
									</Text>
								</Text>
							</View>
						) : notifications.length > 0 && (
							<View style={
								notifications[notifications.length-1].level === "INFO" ? styles.infoView
								: notifications[notifications.length-1].level === "WARN" ? styles.warningView
								: styles.errorView
							}>
								<AntDesign
									name={
										notifications[notifications.length-1].level === "INFO" ? 'checkcircleo'
										: notifications[notifications.length-1].level === "WARN" ? 'exclamationcircleo'
										: 'closecircleo'
									}
									size={18}
									style={
										notifications[notifications.length-1].level === "INFO" ? styles.infoIcon
										: notifications[notifications.length-1].level === "WARN" ? styles.warningIcon
										: styles.errorIcon
									}
								/>
								<Text style={styles.notificationText}>
									{notifications[notifications.length-1].message} &nbsp;
								</Text>
							</View>
						)}

						<View style={styles.feedView}>
							<View style={styles.feedHeader}>
								<Text h3>Merchant of the month</Text>
								<Text h3>{feedData[0].month}</Text>
							</View>
							<Text h2>{feedData[0].author}</Text>
							<Text style={styles.bodyText}>{feedData[0].content}</Text>
							<Image
								source={require('../../../assets/images/feed1.png')}
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
								source={require('../../../assets/images/feed2.png')}
								containerStyle={styles.image}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
			<TouchableOpacity onPress={onPressScan} style={styles.scanButton}>
				<Image
					source={require('../../../assets/images/qr_code_consumer.png')}
					containerStyle={styles.qrIcon}
				/>
				<Text style={styles.scanBtnText}>{Translation.BUTTON.SCAN}</Text>
			</TouchableOpacity>
			{isVisible && (
				<DwollaDialog visible={isVisible} onClose={onClose} userType={UserType.Customer} />
			)}

			<BankLinkDialog 
				visible={isLoadup || isPayment}
				description={isLoadup ? Translation.LOAD_UP.LOAD_UP_NO_BANK_DETAIL 
					: personalWallet.availableBalance > 0 
						? Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL
						: Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL}
				buttonTitle={
					personalFundingSource 
						? Translation.BUTTON.LOAD_UP_BERKSHARES
						: Translation.BUTTON.LINK_BANK
				}
				onConfirm={selectBank}
				onCancel={onClose}
			/>
		</View>
	);
};

export default Dashboard;
