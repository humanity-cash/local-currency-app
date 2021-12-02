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

class SecurityEyeButton extends React.Component<SecurityEyeButtonProps>{
	render() {
		return (
			<TouchableOpacity 
				onPress={this.props.onPress} 
				style={{
					...styles.container,
					...this.props.style,
				}}
			>
				<Ionicons 
					name={this.props.isSecurity ? "eye" : "eye-off"}
					size={24}
					color={colors.grey}
				/>
			</TouchableOpacity>
		)
	}
}

export default SecurityEyeButton;