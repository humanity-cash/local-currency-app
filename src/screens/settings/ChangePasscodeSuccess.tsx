import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { Button, ModalHeader } from "src/shared/uielements";
import { modalBaseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

type ChangePasscodeSuccessProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	modalHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingBottom: 10
	},
	codeView: {
		flex: 1
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	},
	image: {
		alignSelf: "center",
		width: 220,
		height: 220
	},
	imageView: {
		marginTop: 30,
		textAlignVertical: "center",
		flex: 1
	}
});

const ChangePasscodeSuccess = (props: ChangePasscodeSuccessProps) => {
	return (
		<View style={modalViewBase}>
			<ModalHeader />
			<View style={{ ...wrappingContainerBase, paddingTop: 0, flex: 1 }}>
				<Text style={modalBaseHeader}>Passcode changed successfully</Text>
				<View style={styles.codeView}>
					<View style={styles.imageView}>
						<Image
							source={require('../../../assets/images/baloons.png')}
							containerStyle={styles.image}
						/>
					</View>
				</View>
			</View>
			<Button
				type="fluidDark"
				title="DONE"
				onPress={props.route.params.onClose}
			/>
		</View>
	);
}
export default ChangePasscodeSuccess