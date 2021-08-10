import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, Picker } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Header, Button, CancelBtn, BackBtn, BlockInput } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { Industry } from "src/utils/types";

type BusinessInfoProps = {
	navigation?: any,
	route?: any,
}

type BusinessInfoState = {
	registeredBusinessname: string,
	industry: Industry,
	ein: string,
}

const Industries: Industry[] = [
	Industry.ARTS_ENTERTAINMENT,
	Industry.COMMUNICATION_EDUCATION,
	Industry.FOOD_DRINK,
	Industry.HEALTH_WELLNESS,
	Industry.LODGING,
	Industry.SHOPPING,
	Industry.SERVICES
];

const styles = StyleSheet.create({
    headerText: {
		fontSize: 32,
        lineHeight: 32,
		color: colors.purple,
	},
    bodyText: {
        color: colors.bodyText
    },
	label: {
        color: colors.bodyText,
		fontSize: 10
    },
	input: {
		color: colors.purple,
		backgroundColor: colors.white
	},
	picker: {
		height: 55,
		borderRadius: 3,
		color: colors.purple,
		backgroundColor: colors.white,
		marginBottom: 10
	},
	formView: {
		paddingBottom: 40
	},
    bottomView: {
		paddingHorizontal: 20,
        paddingBottom: 50
	},
});

const BusinessInfo = (props: BusinessInfoProps) => {
	const { businessDetails, updateBusinessDetails } = useUserDetails();
	const [goNext, setGoNext] = useState<boolean>(false);
	const [state, setState] = useState<BusinessInfoState>({
		registeredBusinessname: "",
		industry: Industry.ARTS_ENTERTAINMENT,
		ein: ""
	});

	useEffect(() => {
		setState({
			registeredBusinessname: businessDetails.registeredBusinessname,
			industry: businessDetails.industry,
			ein: businessDetails.ein
		});
	}, [businessDetails]);

	useEffect(() => {
		setGoNext(businessDetails.registeredBusinessname !== "" && businessDetails.ein !== "");
	}, [businessDetails]);

	const onValueChange = (name: any, change: any) => {
		setState({
		  ...state,
		  [name]: change,
		} as any);
		updateBusinessDetails({ [name]: change });
	};

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text="Log out" onClick={() => props.navigation.navigate('Teaser')} />}
			/>
			<ScrollView style={wrappingContainerBase}>
                <View style={underlineHeaderB}>
                    <Text style={styles.headerText}>Business information</Text>
                </View>
                <Text style={styles.bodyText}></Text>

				<View style={styles.formView}>
					<Text style={styles.label}>REGISTERED BUSINESS NAME</Text>
					<BlockInput
						name="registeredBusinessname"
						placeholder="Registered business name"
						value={state.registeredBusinessname}
						onChange={onValueChange}
						style={styles.input}
					/>

					<Text style={styles.label}>INDUSTRY</Text>
					<Picker
						selectedValue={state.industry}
						style={styles.picker}
						onValueChange={(itemValue: Industry) => onValueChange("industry", itemValue)}
					>
						{
							Industries.map((type: Industry, idx: number) => <Picker.Item label={type} value={type} key={idx} />)
						}
					</Picker>

					<Text style={styles.label}>EMPLOYEE IDENTIFICATION NUMBER (EIN)</Text>
					<BlockInput
						name="ein"
						placeholder="Employee identification number"
						value={state.ein}
						onChange={onValueChange}
						style={styles.input}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						title="Next"
						disabled={!goNext}
						onPress={()=>props.navigation.navigate("BusinessAddress")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BusinessInfo