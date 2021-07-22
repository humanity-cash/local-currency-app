import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Text, Image } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header, Notifications, WalletBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseWhite, wrappingContainerBase, baseHeader } from "src/theme/elements";
import { SettingsOverlay } from "../settings/SettingsOverlay";
import Button from "src/shared/uielements/Button";

const styles = StyleSheet.create({
	headerText: {
		color: colors.darkRed,
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16
	},
	text: {
		color: colors.darkRed,
		fontWeight: 'bold',
		paddingLeft: 5,
		paddingRight: 5
	},
	alertView: {
		backgroundColor: colors.brown,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 10,
		marginTop: 10,
		marginBottom: 20
	},
	communityChestView: {
		backgroundColor: colors.lightBlue,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignItems: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	feedView: {
		backgroundColor: colors.lightBlue,
		padding: 10,
		marginTop: 10,
		marginBottom: 10
	},
	image: {
		alignSelf: "center",
		width: 60,
		height: 60,
		marginRight: 20
	},
	scanButton: {
		width: '90%',
		position: 'absolute',
		bottom: 30,
		left: '5%'
	}
});

const Dashboard = () => {
	const [showSettings, setShowSettings] = useState(false);
	return (
		<View style={viewBaseWhite}>
			<Notifications />
			<Header
				placement="left"
				style={{ backgroundColor: colors.white }}
				barStyle="light-content"
				centerComponent={<Text style={styles.headerText}>Dashboard</Text>}
				leftComponent={
					<TouchableWithoutFeedback onPress={() => setShowSettings(!showSettings)}>
						<View>
							{!showSettings && (
								<Entypo
									style={{ paddingTop: 2 }}
									name='menu'
									size={25}
									color={colors.darkRed}
								/>
							)}
							{showSettings && (
								<AntDesign
									style={{ paddingTop: 2 }}
									name="arrowleft"
									size={25}
									color={colors.darkRed}
								/>
							)}
						</View>
					</TouchableWithoutFeedback>
				}
				rightComponent={<WalletBtn />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={baseHeader}>
						<Text h1 style={styles.headerText}>BerkShares</Text>
					</View>
					<View
						style={{
							borderBottomColor: colors.darkRed,
							borderBottomWidth: 1,
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingBottom: 10
						}}>
						<Text style={styles.text}>B$0.00</Text>
						<TouchableOpacity style={{flexDirection: 'row'}}>
							<Entypo name="arrow-with-circle-up" size={18} color={colors.darkRed} style={{ paddingTop: 3 }} />
							<Text style={styles.text}>Top Up</Text>
						</TouchableOpacity>	
					</View>
					<View style={styles.alertView}>
						<Text style={{color: colors.white, width: '90%'}}>Welcome in the community! your BerkShares to start spending BerkShares</Text>
						<TouchableOpacity>
							<Entypo name="cross" size={30} color={colors.white} />
						</TouchableOpacity>	
					</View>

					<Text style={styles.text}>Community Chest Balance</Text>
					<View style={styles.communityChestView}>
						<View>
							<Text h3 style={{color: colors.green, marginBottom: 10}}>COMMUNITY CHEST</Text>
							<Text h2 style={{color: colors.green}}>8,7%</Text>
						</View>
						<TouchableOpacity>
							<Image
								source={require('../../../assets/images/berksharecurrency.png')}
								containerStyle={styles.image}
							/>
						</TouchableOpacity>	
					</View>

					<Text style={styles.text}>Feed</Text>
					<View style={styles.feedView}>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<Text h3 style={{color: colors.darkRed}}>COMMUNITY CHEST TOP UP</Text>
							<Text h3 style={{color: colors.darkRed}}>7 MIN AGO</Text>
						</View>
						<View style={{flexDirection: 'row', padding: 10}}>
							<Image
								source={require('../../../assets/images/berksharecurrency.png')}
								containerStyle={styles.image}
							/>
							<Text style={{color: colors.blue, flex: 1}}>Someone just topped up the community chest with B$0.34</Text>
						</View>	
					</View>

					<View style={styles.feedView}>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<Text h3 style={{color: colors.darkRed}}>BERKSHIRE FACT</Text>
							<Text h3 style={{color: colors.darkRed}}>23 MIN AGO</Text>
						</View>
						<View style={{flexDirection: 'row', padding: 10}}>
							<Text style={{color: colors.blue, flex: 1}}>The Mahican (Muh-he-ka-new) Native American clan lived in the territory that presently makes up Berkshire Country.</Text>
						</View>	
					</View>
				</View>
			</ScrollView>
			<Button
				type="darkRed"
				title="Scan to Pay or Request"
				style={styles.scanButton}
				onPress={()=>setShowSettings(!showSettings)}
			/>
			<SettingsOverlay visible={showSettings} />
		</View>
	);
}

export default Dashboard