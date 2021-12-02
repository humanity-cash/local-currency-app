import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from "src/theme/colors";
import {Ionicons} from "@expo/vector-icons"

type SecurityEyeButtonProps = {
	style?: any
	isSecurity?: boolean
	onPress?: (()=>void)
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	}
});

const SecurityEyeButton = (props: SecurityEyeButtonProps) => {
	return (
		<TouchableOpacity 
			onPress={props.onPress} 
			style={{
				...styles.container,
				...props.style,
			}}
		>
			<Ionicons 
				name={props.isSecurity ? "eye" : "eye-off"}
				size={24}
				color={colors.grey}
			/>
		</TouchableOpacity>
	)
}

export default SecurityEyeButton;