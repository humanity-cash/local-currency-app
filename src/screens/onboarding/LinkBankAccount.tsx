import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useModalStatusBar } from "src/hooks";
import { useUserDetails } from "src/hooks";
import { Button, Header } from "src/shared/uielements";
import { baseHeader, viewBaseWhite, wrappingContainerBase, modalViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { CancelBtn, Modal, ModalHeader } from "src/shared/uielements";

type LinkBankAccountProps = {
	navigation?: any
	route: any
}

const styles = StyleSheet.create({
	codeView: {
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		padding: 20,
	},
	image: {
		alignSelf: "center",
		width: 280,
		height: 280
	},
	imageView: {
		justifyContent: "center",
		textAlignVertical: "center",
		flex: 1
	},
	modalWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
	},
	modalHeader: {
		fontFamily: "IBMPlexSansSemiBold",
		fontSize: 25,
		marginBottom: 10,
		color: colors.blue
	},
});

const LinkBankAccountView = (props: LinkBankAccountProps) => {
	const [visible, setVisible] = useState(false);
	const { personalDetails: { email }} = useUserDetails();
	const { setUseHeader } = useModalStatusBar();

	const selectBank = () => {
		setVisible(false);
		props.navigation.navigate("SelectBank");
	}

	return (
		<View style={{...viewBaseWhite}}>
			<Header
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Tabs')} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1 style={{color: colors.blue}}>Welcome to Humanity Cash! Now it's time to add some BerkShares to your wallet.</Text>
				</View>
				<View style={styles.codeView}>
					<Text>Link you bank account to top up your BerkShares!</Text>
				</View>
				<View style={styles.imageView}>
					<Image
						source={require('../../../assets/images/onboarding4.png')}
						containerStyle={styles.image}
					/>
				</View>
			</View>
			<View style={styles.bottomView}>
				<Button
					type="darkRed"
					style={{backgroundColor: colors.blue}}
					title="Link bank account"
					textStyle={{color: colors.white}}
					onPress={() => setVisible(true)}
				/>
			</View>
			{visible && (
				<Modal visible={visible}>
					<View style={{ ...modalViewBase, height: "100%" }}>
						<ModalHeader
							rightComponent={<CancelBtn onClick={() => setVisible(false)} />}
						/>
						<View style={styles.modalWrap}>
							<Text h1 style={styles.modalHeader}>BerkShares uses Dwolla to link your bank</Text>
						</View>
						<View style={styles.bottomView}>
							<Button
								type="darkRed"
								style={{backgroundColor: colors.blue}}
								title="Continue"
								textStyle={{color: colors.white}}
								onPress={selectBank}
							/>
						</View>
					</View>
				</Modal>
			)}
		</View>
	);
}

const LinkBankAccount = (props:LinkBankAccountProps) => {
	const navigation = useNavigation();
	return <LinkBankAccountView {...props} navigation={navigation} />;
}
export default LinkBankAccount;