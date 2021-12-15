import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, CancelBtn, Button } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
	},
});

const LoadUpSuccess = (): JSX.Element => {
	const navigation = useNavigation();
	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} onClick={() => navigation.navigate(Routes.TABS)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.LOAD_UP.LOAD_UP_SUCCESS}</Text>
				</View>
				<Text>{Translation.LOAD_UP.LOAD_UP_SUCCESS_DETAIL}</Text>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type="darkGreen"
					title={Translation.BUTTON.EXPLORE_BERKSHARES}
					onPress={() => navigation.navigate(Routes.TABS)}
				/>
			</SafeAreaView>
		</View>
	);
}

export default LoadUpSuccess