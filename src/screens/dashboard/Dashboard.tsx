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

type DashboardProps = {
	navigation?: any;
	route?: any;
};

const styles = StyleSheet.create({
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
		borderLeftColor: colors.darkGreen,
		backgroundColor: colors.lightGreen,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10
	},
	alertText: {
		color: colors.white, 
		width: '75%'
	},
	feedView: {
		backgroundColor: colors.lightGreen1,
		padding: 10,
	},
	feedHeader: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		marginBottom: 20, 
		marginTop: 10
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
	}
});

const DashboardView = (props: DashboardProps) => {
	const [showQRScan, setShowQRScan] = useState(false);
	const [alert, setAlert] = useState(false);
	const [amount, setAmount] = useState("");

	useEffect(() => {
		setAlert(amount === "");
	}, [amount]);

	const onScanClose = () => {
		setShowQRScan(false);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={
					<TouchableWithoutFeedback onPress={() => props.navigation.toggleDrawer()}>
						<View style={{flexDirection: 'row'}}>
							<Entypo
								style={{ marginRight: 5 }}
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
				<View style={{ paddingBottom: 40 }}>
					<View style={baseHeader}>
						<Text style={styles.headerText}>BerkShares</Text>
					</View>
					<View style={styles.amountView}>
						<Text style={styles.text}>B$ -</Text>
						<TouchableOpacity style={styles.topupButton} onPress={()=>props.navigation.navigate("TopUp")}>
							<Text style={{color: colors.white, fontSize: 14}}>Top up B$</Text>
						</TouchableOpacity>	
					</View>
					{alert && 
						<View style={styles.alertView}>
							<AntDesign name="exclamationcircleo" size={18} />
							<Text style={styles.alertText}>Welcome in the community! your BerkShares to start spending BerkShares</Text>
							<TouchableOpacity>
								<Entypo name="cross" size={30} color={colors.white} onPress={()=>setAlert(false)} />
							</TouchableOpacity>	
						</View>
					}

					<View style={styles.feedView}>
						<View style={styles.feedHeader}>
							<Text h3 style={{color: colors.lightGreen}}>Merchant of the month</Text>
							<Text h3 style={{color: colors.lightGreen}}>SeptemebEr</Text>
						</View>
						<Text h2>Dory & Ginger</Text>
						<Text style={{paddingTop: 10, paddingBottom: 10	}}>
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

			{/* <MakePayment visible={showQRScan} onClose={onScanClose} /> */}
		</View>
	);
}

const Dashboard = (props: DashboardProps) => {
	const navigation = useNavigation();
	return <DashboardView {...props} navigation={navigation} />;
};
export default Dashboard