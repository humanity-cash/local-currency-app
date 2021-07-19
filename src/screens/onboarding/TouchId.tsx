import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Header } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";


type TouchIdProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
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
	}
});

const TouchIdView = (props: TouchIdProps) => {
	const { updateAuthorization } = useUserDetails();
	const [touchId, setTouchId] = useState('');

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ { ...baseHeader} }>
					<Text h1>No Matching codes... please try again.</Text>
				</View>
				<View style={styles.codeView}>
					
				</View>
			</View>
		</View>
	);
}

const TouchId = (props:TouchIdProps) => {
	const navigation = useNavigation();
	return <TouchIdView {...props} navigation={navigation} />;
}
export default TouchId