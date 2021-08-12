import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Switch } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BorderedInput } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import QRCodeGen from "./QRCodeGen";

type RequestProps = {
	navigation?: any,
	route?: any,
}

type AmountState = {
	amount: string,
	cost: string
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	switchView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
	contentView: { 
		marginTop: 5
	},
	label: { 
		marginTop: 20, 
		color: colors.text, 
		fontSize: 12 
	},
	defaultAmountView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingTop: 5,
	},
	defaultAmountItem: {
		width: 100,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.darkGreen,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	selectedAmountItem: {
		width: 100,
		height: 40,
		backgroundColor: colors.lightGreen,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	openBtn: {
		marginBottom: 10
	}
});

const Request = (props: RequestProps) => {

	const [state, setState] = useState({
		amount: "1",
		costs: "1"
	});
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isEnabled, setIsEnabled] = useState<boolean>(true);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isOpenAmount, setIsOpenAmount] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(state.costs !== "");
	}, [state]);

	const onValueChange = (name: any, change: any) => {
		const costs = change;
		setState({
		  ...state,
		  [name]: change,
		  costs: costs,
		} as any);
	};

	const toggleSwitch = () => {
		setIsEnabled(previousState => !previousState);
		if (isEnabled) {
			props.navigation.navigate("QRCodeScan");
		}
	}

	const openAmount = () => {
		setIsOpenAmount(true);
		setIsVisible(true);
	}

	const requestAmount = () => {
		setIsOpenAmount(false);
		setIsVisible(true);
	}

	const onClose = () => {
		setIsVisible(false);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Dashboard')} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<View style={styles.switchView}>
						<Switch
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
				</View>
				<View style={styles.contentView}>
					<Text style={styles.label}>MOST FREQUENTLY USED</Text>
					<View style={styles.defaultAmountView}>
						<TouchableOpacity 
							style={state.amount=='5' ? styles.selectedAmountItem : styles.defaultAmountItem} 
							onPress={()=>onValueChange('amount', "5")}
						>
							<Text>B$ 5.00</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={state.amount=='1' ? styles.selectedAmountItem : styles.defaultAmountItem}  
							onPress={()=>onValueChange('amount', "1")}
						>
							<Text>B$ 1.00</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={state.amount=='0.2' ? styles.selectedAmountItem : styles.defaultAmountItem} 
							onPress={()=>onValueChange('amount', "0.2")}
						>
							<Text>B$ 0.2</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.label}>REQUEST AMOUNT</Text>
					<BorderedInput
						label="Amount"
						name="amount"
						keyboardType="number-pad"
						placeholder="Amount"
						prefix="B$"
						value={state.amount}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						disabled={!goNext}
						title="Open amount"
						style={styles.openBtn}
						onPress={openAmount}
					/>
					<Button
						type="darkGreen"
						disabled={!goNext}
						title="Next"
						onPress={requestAmount}
					/>
				</View>
			</KeyboardAvoidingView>
			{ isVisible && <QRCodeGen visible={isVisible} onClose={onClose} isOpenAmount={isOpenAmount} amount={state.amount} /> }
		</View>
	);
}

export default Request