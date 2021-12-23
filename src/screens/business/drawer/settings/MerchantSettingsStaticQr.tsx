import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, BackBtn } from "src/shared/uielements";
import { underlineHeaderB, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import { useNavigation } from '@react-navigation/core';
import { BUTTON_TYPES } from 'src/constants';
import MerchantStaticQRCodeGen from './MerchantStaticQRCodeGen';
import { showToast } from 'src/utils/common';
import { ToastType } from 'src/utils/types';
import { UserContext } from 'src/contexts/user';
// import * as MailComposer from 'expo-mail-composer'
import { PaymentMode, SECURITY_ID } from "src/utils/types";
import QRCode from 'react-native-qrcode-svg';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	text: {
		color: colors.bodyText,
		paddingVertical: 5
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
	},
	mainText: {
		color: colors.purple
	}
});

const MerchantSettingsStaticQr = (): JSX.Element => {
	const navigation = useNavigation();
	const [isStaticQRCode, setIsStaticQRCode] = useState<boolean>(false);
	const { businessDwollaId, user } = useContext(UserContext);
	
	const businessName = user?.business?.tag || undefined
	const addressStr = JSON.stringify({
        securityId: SECURITY_ID,
        to: businessDwollaId,
        amount: 0,
        mode: PaymentMode.OPEN_AMOUNT
    });

	let qrRef = useRef()


	const onSuccess = (amount: number) => {
		showToast(ToastType.INFO, "Succeeded!", "You have received B$ " + amount);
		setIsStaticQRCode(false);
	}

	const onClose = () => {
		setIsStaticQRCode(false);
	}

	const onPressShowMyQR = () => {
		// qrRef.toDataURL(sendEmail)
	}

	// const sendEmail = (dataURL: string) => {
  //       const to = ["info@berkshares.org"] // string or array of email addresses
  //       const path = `data:imgae/png;base64,${dataURL}`

  //       MailComposer.composeAsync({
  //           subject: 'From BerkShare',
  //           recipients: to,
  //           body: `<div>
	// 				<p>Shared QR code of ${businessName}</p>
	// 				<img src="${path}" alt="Red dot" />
	// 			</div>`,
  //           isHtml: true
  //       })
  //   }

	return (
		<View style={viewBase}>
			<View style={{position: 'absolute', opacity: 0}}>
				<QRCode
					value={addressStr}
					size={200}
					getRef={c => { qrRef = c }}
				/>
			</View>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} color={colors.purple} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ underlineHeaderB }>
					<Text style={styles.headerText}>{Translation.OTHER.STATIC_QR}</Text>
				</View>
				<Text style={styles.text}>{Translation.OTHER.STATIC_QR_DETAIL1}</Text>
				<Text style={styles.text}>{Translation.OTHER.STATIC_QR_DETAIL2}</Text>
				<Text style={styles.text}>{Translation.OTHER.STATIC_QR_DETAIL3}</Text>
				<Text style={styles.text}>{Translation.OTHER.STATIC_QR_DETAIL4}</Text>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.TRANSPARENT}
					textStyle={styles.mainText}
					title={Translation.BUTTON.SHOW_MY_QR}
					onPress={() => setIsStaticQRCode(true)}
				/>
				<Button
					type={BUTTON_TYPES.PURPLE}
					title={Translation.BUTTON.MAIL_QR_CODE}
					onPress={onPressShowMyQR}
				/>
			</SafeAreaView>

			{isStaticQRCode && (
				<MerchantStaticQRCodeGen visible={isStaticQRCode} onSuccess={onSuccess} onClose={onClose} />
			)}
		</View>
	);
}

export default MerchantSettingsStaticQr