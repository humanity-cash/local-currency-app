import React from 'react';
import { Dimensions, View, StyleSheet, ActivityIndicator } from "react-native";
import { Overlay } from 'react-native-elements';
import { colors } from "src/theme/colors";

type DataLoadingProps = {
	visible: boolean,
}

export const DIALOG_SCREEN_OFFSET = Dimensions.get('screen').height * 0.06;

const styles = StyleSheet.create({
	dialogBg: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	},
	closeBtn: {
		position: 'absolute',
		top: 10,
		right: 20
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	dialogWrap: {
		alignSelf: 'center',
		padding: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
    bottomView: {
		paddingBottom: 45
	}
});

const DataLoading = ({visible = false}: DataLoadingProps): JSX.Element => {

	return (
		<Overlay
			isVisible={visible}
			overlayStyle={styles.dialogBg}
			backdropStyle={{
				backgroundColor: 'transparent'
			}}
			animationType="fade"
		>
			<View style={styles.container}>
				<View style={styles.dialogWrap}>
                    <View style={styles.bottomView}>
                        <ActivityIndicator size="large" color={colors.white} />
                    </View>
				</View>
			</View>
		</Overlay>
	);
}

export default DataLoading;