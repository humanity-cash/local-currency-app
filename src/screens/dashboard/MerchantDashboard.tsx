import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase, baseHeader } from "src/theme/elements";
import { Button, SearchInput } from "src/shared/uielements";
import MerchantTransactionList from "./MerchantTransactionList";
import { MyTransactionItem } from "src/utils/types";
import transactionList from "src/mocks/transactions";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type MerchantDashboardProps = {
	navigation?: any;
	route?: any;
};

const styles = StyleSheet.create({
	mainTextColor: {
		color: colors.purple,
	},
	content: { paddingBottom: 40 },
	inlineView: {flexDirection: 'row'},
	headerText: {
		color: colors.purple,
		fontSize: 40,
		fontWeight: '400',
		lineHeight: 40
	},
	amountView: {
		borderBottomColor: colors.darkGreen,
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 2,
		marginBottom: 10
	},
	text: {
		color: colors.purple,
		fontSize: 18,
		fontWeight: 'bold',
		paddingLeft: 5,
		paddingRight: 5
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
		marginBottom: 10
	},
	alertIcon: {
		color: colors.alert,
		fontWeight: 'bold'
	},
	alertText: {
		color: colors.black, 
		width: '90%'
	},
	bodyText: {
		paddingVertical: 10
	},
	filterView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	filterInput: {
		flex: 1,
		marginRight: 10
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	filterBtn: {
		width: 55,
		height: 55,
		marginTop: 8,
		borderRadius: 3,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center'
	},
	scanButton: {
		width: '90%',
		position: 'absolute',
		bottom: 45,
		left: '5%'
	}
});

const MerchantDashboardView = (props: MerchantDashboardProps) => {
	const [searchText, setSearchText] = useState<string>("");
	const [isDetailViewOpen, setIsDetailViewOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<MyTransactionItem>({
		transactionId: 0,
		avatar: "",
		name: "",
		type: "",
		amount: "",
		date: ""
	});

	const onSearchChange = (name: string, change: string) => {
		setSearchText(change);
	}

	const viewDetail = (item: MyTransactionItem) => {
		setSelectedItem(item);
		setIsDetailViewOpen(true);
		console.log(selectedItem, isDetailViewOpen);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={
					<TouchableWithoutFeedback onPress={() => props.navigation.toggleDrawer()}>
						<View style={styles.inlineView}>
							<Entypo
								name='menu'
								size={25}
								color={colors.purple}
							/>
							<Text style={styles.mainTextColor}>{Translation.BUTTON.MENU}</Text>
						</View>
					</TouchableWithoutFeedback>
				}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={styles.content}>
					<View style={baseHeader}>
						<Text style={styles.headerText}>{Translation.LANDING_PAGE.TITLE}</Text>
					</View>
					<View style={styles.amountView}>
						<Text style={styles.text}>B$ 382.91</Text>
					</View>

					<View style={styles.alertView}>
						<AntDesign name="exclamationcircleo" size={18} style={styles.alertIcon} />
						<Text style={styles.alertText}>{Translation.PROFILE.PERSONAL_PROFILE_ALERT} &nbsp;
							<Text style={styles.alertIcon} onPress={()=>props.navigation.navigate(Routes.PERSONAL_PROFILE)}>{Translation.BUTTON.GOTO_SETUP} &gt;</Text>
						</Text>
					</View>

					<View style={styles.filterView}>
						<View style={styles.filterInput}>
							<SearchInput
								label="Search"
								name="searchText"
								keyboardType="default"
								placeholder="Search"
								style={styles.input}
								textColor={colors.greyedPurple}
								value={searchText}
								onChange={onSearchChange}
							/>
						</View>
						<TouchableOpacity style={styles.filterBtn}>
							<Octicons 
								name="settings"
								size={24}
								color={colors.purple}
							/>
						</TouchableOpacity>
					</View>
					<MerchantTransactionList data={transactionList} onSelect={viewDetail} />
				</View>
			</ScrollView>
			<Button
				type="purple"
				title={Translation.BUTTON.RECEIVE_OR_SCAN}
				style={styles.scanButton}
				onPress={()=>props.navigation.navigate(Routes.MERCHANT_QRCODE_SCAN)}
			/>
		</View>
	);
}

const MerchantDashboard = (props: MerchantDashboardProps): ReactElement => {
	const navigation = useNavigation();
	return <MerchantDashboardView {...props} navigation={navigation} />;
};
export default MerchantDashboard