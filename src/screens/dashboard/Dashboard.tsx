import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Text, Image } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase, wrappingContainerBase, baseHeader } from "src/theme/elements";
import Button from "src/shared/uielements/Button";
import DwollaDialog from "./DwollaDialog";

type DashboardProps = {
	navigation?: any;
	route?: any;
};

const styles = StyleSheet.create({
	content: { paddingBottom: 40 },
	inlineView: {flexDirection: 'row'},
	headerText: {
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
	feedView: {
		backgroundColor: colors.card,
		padding: 10,
	},
	feedHeader: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		marginBottom: 20, 
		marginTop: 10
	},
	bodyText: {
		paddingVertical: 10
	},
	image: {
		alignItems: "center",
		width: '100%',
		height: 300,
		marginRight: 20,
		borderRadius: 5
	},
	scanButton: {
		width: '90%',
		position: 'absolute',
		bottom: 45,
		left: '5%'
	},
	topupButton: {
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		backgroundColor: colors.darkGreen,
	},
	topupText: {color: colors.white, fontSize: 16}
});

const DashboardView = (props: DashboardProps) => {
	const [showQRScan, setShowQRScan] = useState(false);
	const [alert, setAlert] = useState(false);
	const [amount, setAmount] = useState("");
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		setAlert(amount === "");
	}, [amount]);

	const onScanClose = () => {
		setShowQRScan(false);
	}

	const onClose = () => {
		setIsVisible(false);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={
					<TouchableWithoutFeedback onPress={() => props.navigation.toggleDrawer()}>
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
						<Text style={styles.headerText}>BerkShares</Text>
					</View>
					<View style={styles.amountView}>
						<Text style={styles.text}>B$ -</Text>
						<TouchableOpacity style={styles.topupButton} onPress={()=>props.navigation.navigate("TopUp")}>
							<Text style={styles.topupText}>Load up B$</Text>
						</TouchableOpacity>	
					</View>
					{alert && 
						<View style={styles.alertView}>
							<AntDesign name="exclamationcircleo" size={18} style={styles.alertIcon} />
							<Text style={styles.alertText}>Link your bank account to start using the app. &nbsp;
								<Text style={styles.alertIcon} onPress={()=>setIsVisible(true)}>Link bank account &gt;</Text>
							</Text>
						</View>
					}

					<View style={styles.feedView}>
						<View style={styles.feedHeader}>
							<Text h3 >Merchant of the month</Text>
							<Text h3 >SeptemebEr</Text>
						</View>
						<Text h2>Dory & Ginger</Text>
						<Text style={styles.bodyText}>
							Our motto is Live and Give. We have treasures for your home and lifestyle, along with the perfect gift for that special someone or that occasion that begs for something unique.
						</Text>
						<Image
							source={require('../../../assets/images/feed1.png')}
							containerStyle={styles.image}
						/>
					</View>
				</View>
			</ScrollView>
			<Button
				type="darkGreen"
				title="Scan to Pay or Request"
				style={styles.scanButton}
				onPress={()=>props.navigation.navigate("QRCodeScan")}
			/>

			{ isVisible && <DwollaDialog visible={isVisible} onClose={onClose} /> }
		</View>
	);
}

const Dashboard = (props: DashboardProps) => {
	const navigation = useNavigation();
	return <DashboardView {...props} navigation={navigation} />;
};
export default Dashboard