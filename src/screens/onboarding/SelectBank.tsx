import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { BackBtn, Header, CancelBtn, BlockInput, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import listOfBanks from "src/mocks/banks";

type SelectBankProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	view: {
		marginTop: 5,
		backgroundColor: colors.white,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	search: {
		width: '100%',
		height: 40,
		backgroundColor: colors.lightBlue,
		borderRadius: 13,
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrow: {
		marginVertical: 15
	},
	imageView: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	image: {
		// alignSelf: "center",
		width: '48%',
		height: 100
	},
	bottomView: {
		padding: 20,
	},
});

const SelectBankView = (props: SelectBankProps) => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [goNext, setGoNext] = useState(false);
	const [bank, setBank] = useState('');

	useEffect(() => {
		setGoNext(bank !== "");
	},[bank]);

	const onValueChange = (name: any, change: any) => {
		setSearchPhrase(change);
	}

	const getBgColor = (bankId: string) => {
		if (bankId == bank) {
			return colors.blue;
		} else {
			return '#fff';
		}
	}

	const renderBanks = () => {
		let found: any[] = [];
		if (searchPhrase !== '') {
			found = listOfBanks.filter(entry => entry.name.toLowerCase().includes(searchPhrase.toLowerCase()));
		}

		if (searchPhrase === '') {
			found = listOfBanks;
		}

		return found.map((entry, i) => (
			<TouchableWithoutFeedback key={i} onPress={() => setBank(entry.id)} style={{backgroundColor: getBgColor(entry.id)}}>
				<Image
					source={require('../../../assets/images/bank.png')}
					containerStyle={styles.image}
				/>
			</TouchableWithoutFeedback>
		))
	}

	return (
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Tabs')} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1 style={{color: colors.blue}}>Select your bank</Text>
					<BlockInput
						style={styles.search}
						placeholder="Search"
						name="name"
						value={searchPhrase}
						onChange={onValueChange}
					/>
				</View>
				<View style={styles.imageView}>
					{renderBanks()}
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkRed"
						style={{backgroundColor: colors.blue}}
						title="Continue"
						textStyle={{color: colors.white}}
						disabled={!goNext}
						onPress={() => props.navigation.navigate("LoginToBank")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const SelectBank = (props: SelectBankProps) => {
	const navigation = useNavigation();
	return <SelectBankView {...props} navigation={navigation} />;
}
export default SelectBank