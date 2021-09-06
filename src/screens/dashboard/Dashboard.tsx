import { AntDesign, Entypo } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	TouchableOpacity
} from 'react-native';
import { Image, Text } from 'react-native-elements';
import * as Routes from 'src/navigation/constants';
import { Header } from 'src/shared/uielements';
import { colors } from 'src/theme/colors';
import { baseHeader, viewBase, wrappingContainerBase } from 'src/theme/elements';
import Translation from 'src/translation/en.json';
import DwollaDialog from './DwollaDialog';

const styles = StyleSheet.create({
	content: { paddingBottom: 40 },
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
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		backgroundColor: colors.darkGreen,
	},
	topupText: { color: colors.white, fontSize: 16 },
});

const feedData = {
	month: 'SEPTEMBER',
	author: 'Dory & Ginger',
	content:
		'Our motto is Live and Give. We have treasures for your home and lifestyle, along with the perfect gift for that special someone or that occasion that begs for something unique.',
};

const Dashboard = (): JSX.Element => {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const onClose = () => {
		setIsVisible(false);
	};

	const alert = false;

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
			<ScrollView style={wrappingContainerBase}>
				<View style={styles.content}>
					<View style={baseHeader}>
						<Text style={styles.headerText}>
							{Translation.LANDING_PAGE.TITLE}
						</Text>
					</View>
					<View style={styles.amountView}>
						<Text style={styles.text}>B$ -</Text>
						<TouchableOpacity
							style={styles.topupButton}
							onPress={() => navigation.navigate(Routes.LOAD_UP)}>
							<Text style={styles.topupText}>Load up B$</Text>
						</TouchableOpacity>
					</View>
					{alert && (
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
									{Translation.BANK_ACCOUNT.ACCOUNT_LINK_TEXT}{' '}
									&gt;
								</Text>
							</Text>
						</View>
					)}

					<View style={styles.feedView}>
						<View style={styles.feedHeader}>
							<Text h3>Merchant of the month</Text>
							<Text h3>{feedData.month}</Text>
						</View>
						<Text h2>{feedData.author}</Text>
						<Text style={styles.bodyText}>{feedData.content}</Text>
						<Image
							source={require('../../../assets/images/feed1.png')}
							containerStyle={styles.image}
						/>
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity onPress={()=>navigation.navigate(Routes.QRCODE_SCAN)} style={styles.scanButton}>
				<Image
					source={require('../../../assets/images/qr_code_consumer.png')}
					containerStyle={styles.qrIcon}
				/>
				<Text style={styles.scanBtnText}>{Translation.BUTTON.SCAN}</Text>
			</TouchableOpacity>
			{isVisible && (
				<DwollaDialog visible={isVisible} onClose={onClose} />
			)}
		</View>
	);
};

export default Dashboard;
