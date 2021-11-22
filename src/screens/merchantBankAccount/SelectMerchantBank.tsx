import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { UserAPI } from 'src/api';
import { loadBusinessFundingSource } from 'src/store/funding-source/funding-source.actions';
import { useDispatch } from 'react-redux';
import { Dwolla } from 'src/contexts';

export const WEBVIEW_SCREEN = Dimensions.get('screen').height - 150;

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
        lineHeight: 32,
		color: colors.purple
	},
    bankView: {
		flex: 1,
		height: WEBVIEW_SCREEN,
		paddingBottom: 10
	},
	bottomView: {
		paddingBottom: 45
	},
});

const SelectMerchantBank = (): JSX.Element => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { businessDwollaId } = useContext(Dwolla.Context);
	const [iavToken, setIAVToken] = useState<string>("");
	let webview: WebView<{ ref: unknown; style: { flex: number; height: number; paddingBottom: number; }; source: { uri: string; }; }> | null = null;

	useEffect(() => {
		if (businessDwollaId) {
			(async () => {
				const response = await UserAPI.iavToken(businessDwollaId);
				if (response.data) {
					setIAVToken(response?.data?.iavToken);
					webview?.reload();
				}
			})();
		}
	}, [businessDwollaId]);

	const onClose = () => {
		if (businessDwollaId) {
			dispatch(loadBusinessFundingSource(businessDwollaId));
		}
		navigation.navigate(Routes.MERCHANT_DASHBOARD);
	}

	return (
		<View style={viewBaseWhite}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={onClose} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				{iavToken !== "" && (
					<WebView
						ref={(ref) => (webview = ref)}
						style={styles.bankView}
						source={{ uri: `https://d11t12p3449df1.cloudfront.net/?iavToken=${iavToken}` }}
					/>
				)}
			</ScrollView>
			{iavToken === "" && (
				<View style={styles.bottomView}>
					<ActivityIndicator size="large" color={colors.purple} />
				</View>
			)}
		</View>
	);
}

export default SelectMerchantBank