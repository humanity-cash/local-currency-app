import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, Picker } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Header, Button, CancelBtn, BackBtn } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { BusinessType } from "src/utils/types";

type BusinessDetailProps = {
	navigation?: any,
	route?: any,
}

const BusinessTypes: BusinessType[] = [
	BusinessType.SOLE_PROPRIETORSHIP,
	BusinessType.CORPORATION,
	BusinessType.LLC,
	BusinessType.PARTNERSHIP,
	BusinessType.NON_PROFIT
];

const styles = StyleSheet.create({
    headerText: {
		fontSize: 32,
        lineHeight: 32,
		color: colors.purple,
	},
    bodyView: {
        paddingTop: 50,
        paddingHorizontal: 17
    },
    bodyText: {
        color: colors.bodyText
    },
	label: {
		marginTop: 30,
        color: colors.bodyText,
		fontSize: 10
    },
	picker: {
		height: 55,
		borderRadius: 3,
		color: colors.purple,
		backgroundColor: colors.white
	},
    bottomView: {
		paddingHorizontal: 20,
        paddingBottom: 50
	},
});

const BusinessDetail = (props: BusinessDetailProps) => {
	const { businessDetails, updateBusinessDetails } = useUserDetails();
	const [businessType, setBusinessType] = useState<BusinessType>(BusinessType.SOLE_PROPRIETORSHIP);

	useEffect(() => {
		updateBusinessDetails({ "businessType": businessType });
	}, [businessType]);

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text="Log out" onClick={() => props.navigation.navigate('Teaser')} />}
			/>
			<ScrollView style={wrappingContainerBase}>
                <View style={underlineHeaderB}>
                    <Text style={styles.headerText}>Business details</Text>
                </View>
                <Text style={styles.bodyText}>We use your business information to set up your Wallet. The type of entity determines the required information.</Text>

				<Text style={styles.label}>TYPE OF BUSINESS</Text>
				<Picker
					selectedValue={businessType}
					style={styles.picker}
					onValueChange={(itemValue: BusinessType) => setBusinessType(itemValue)}
				>
					{
						BusinessTypes.map((type: BusinessType, idx: number) => <Picker.Item label={type} value={type} key={idx} />)
					}
				</Picker>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						title="Next"
						onPress={()=>props.navigation.navigate("BusinessOwnerDetail")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BusinessDetail