import React, { useContext } from 'react';
import { Image, Text } from 'react-native-elements';
import { TouchableOpacity,  View  } from 'react-native';
import { CustomerScanQrCodeStyle } from 'src/style';
import * as Routes from 'src/navigation/constants';
import { UserContext } from "src/contexts";
import { BackBtn, Header } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { styles } from 'src/views/TransactionList/style';

import { WalletContext } from "src/contexts";
import { TransactionList } from "src/views";
import { useNavigation } from '@react-navigation/native';

const CustomerTransactions = (): React.ReactElement => {
	const { customerWalletData } = useContext(WalletContext);
	const { customerDwollaId, user } = useContext(UserContext);
	const navigation = useNavigation();

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn text="Home" onClick={() => navigation.goBack()} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.PAYMENT.MY_TRANSACTIONS}</Text>
				</View>
				<View style={styles.totalAmountView}>
					<Text style={styles.amountText}>B$ {customerWalletData?.availableBalance?.toFixed(2)}</Text>
				</View>
				<TransactionList userId={customerDwollaId} />
			</View>

				<TouchableOpacity onPress={() => navigation.navigate(Routes.QRCODE_SCAN, {
					senderId: customerDwollaId,
					walletData: customerWalletData,
					username: user?.customer?.tag,
					styles: CustomerScanQrCodeStyle,
					recieveRoute: Routes.PAYMENT_REQUEST,
					cancelRoute: Routes.DASHBOARD
				})} style={styles.scanButton}>
					<Image
						source={require('../../../../assets/images/qr_code_consumer.png')}
						containerStyle={styles.qrIcon}
					/>
					<Text style={styles.scanBtnText}>{Translation.PAYMENT.SCAN_TO_PAY_REQUEST}</Text>
				</TouchableOpacity>
		</View>
	)
}

export default CustomerTransactions;