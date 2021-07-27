import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Switch } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BorderedInput } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type RequestProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
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
});

const Request = (props: RequestProps) => {

	const [state, setState] = useState({
		amount: "1",
		costs: "1"
	});
	const [goNext, setGoNext] = useState(false);
	const [isEnabled, setIsEnabled] = useState(true);

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
		// update({ [name]: change });
	};

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Dashboard')} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<Switch
							ios_backgroundColor="#3e3e3e"
							// onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
				</View>
				<View>
					<Text style={{ marginTop: 30, color: colors.text, fontSize: 12 }}>MOST FREQUENTLY USED</Text>
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
					<View>
						<Text style={{ marginTop: 5, color: colors.text, fontSize: 12 }}>REQUEST AMOUNT</Text>
					</View>
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
						type="darkGreen"
						disabled={!goNext}
						title="Share QR for Request"
						onPress={() => props.navigation.navigate("PaymentPending")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default Request