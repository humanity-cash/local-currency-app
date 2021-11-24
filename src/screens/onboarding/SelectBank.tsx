import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header, CancelBtn } from "src/shared/uielements";
import { viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import * as Routes from 'src/navigation/constants';
import { colors } from "src/theme/colors";
import { UserAPI } from 'src/api';
import { loadPersonalFundingSource } from 'src/store/funding-source/funding-source.actions';
import { useDispatch } from 'react-redux';
import { UserContext } from 'src/contexts';

export const WEBVIEW_SCREEN = Dimensions.get('screen').height - 150;

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
        lineHeight: 32
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

const SelectBank = (): JSX.Element => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { customerDwollaId } = useContext(UserContext);
	const [iavToken, setIAVToken] = useState<string>("");
	let webview: WebView<{ ref: unknown; style: { flex: number; height: number; paddingBottom: number; }; source: { uri: string; }; }> | null = null;

	useEffect(() => {
		if (customerDwollaId) {
			(async () => {
				const response: any = await UserAPI.iavToken(customerDwollaId);
				if (response?.data) {
					setIAVToken(response?.data?.iavToken);
					webview?.reload();
				}
			})();
		}
	}, [customerDwollaId]);

	const onClose = () => {
		if (customerDwollaId) {
			dispatch(loadPersonalFundingSource(customerDwollaId));
		}
		navigation.navigate(Routes.DASHBOARD);
	}

	return (
		<View style={viewBaseWhite}>
			<Header
				rightComponent={<CancelBtn text="Close" onClick={onClose} />}
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
					<ActivityIndicator size="large" color={colors.darkGreen} />
				</View>
			)}
		</View>
	);
}

export default SelectBank
