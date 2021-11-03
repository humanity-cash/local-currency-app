import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { UserContext } from 'src/api/context';
import { AuthContext } from 'src/auth';
import * as Routes from 'src/navigation/constants';
import { BackBtn, BusinessProfileForm, Button, CancelBtn, Header } from 'src/shared/uielements';
import { colors } from "src/theme/colors";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
	buttonText: {
		color: colors.white
	},
	mainColor: {
		color: colors.purple
	},
	headerText: {
		fontSize: 32,
		color: colors.purple,
		lineHeight: 35
	},
	formView: {
		paddingBottom: 80
	},
	bottomButton: {
		width: '90%',
		position: 'absolute',
		bottom: 45,
		left: '5%'
	},
});

const BusinessProfile = (): ReactElement => {
	const navigation = useNavigation();
	const { getBusinessData } = useContext(UserContext);
	const business = getBusinessData();
	const { signOut } = useContext(AuthContext);
	const [goNext, setGoNext] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(business?.tag !== "");
	}, [business?.tag]);

	const onNextPress = () => {
		navigation.navigate(Routes.BUSINESS_DETAIL);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.LOGOUT} onClick={signOut} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PROFILE.SETUP_PROFILE}</Text>
				</View>
				<ScrollView>
					<View style={styles.formView}>
						<BusinessProfileForm
						/>
					</View>
				</ScrollView>
			</View>
			<Button
				type="purple"
				title={Translation.BUTTON.NEXT}
				disabled={!goNext}
				onPress={onNextPress}
				style={styles.bottomButton}
			/>
		</View>
	);
}

export default BusinessProfile;