
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { colors } from "../../../theme/colors";

type ButtonProps = {
	onPress: any
	title: any
	type: string
	style?: any
	textStyle?: any
	disabled?: boolean
}

const Button = (props: ButtonProps): React.ReactElement => {
	const { disabled, onPress, textStyle, title, type, style } = props
	return (
		<TouchableOpacity
		onPress={() => {
			if (disabled) return;
			else onPress()
		}}
		disabled={disabled}
		style={{
			...styles[type].button,
			...(disabled ? { opacity: 0.5 } : {}),
			...style
		} as any}
	>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{
					...styles[type].buttonText,
					...textStyle
				}}>
				{title}
			</Text>
		</View>
	</TouchableOpacity>
	)
}

const styles: any = {
	fluidDark: {
		button: {
			backgroundColor: colors.button,
			paddingTop: 10,
			paddingBottom: 10,
			height: 60,
			justifyContent: "center",
			alignItems: "center",
		},
		buttonText: {
			color: "white",
			fontSize: 16
		},
		view: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center"
		}
	}, fluidLight: {
		button: {
			backgroundColor: colors.button,
			paddingTop: 10,
			paddingBottom: 10,
			alignItems: 'center',
			borderRadius: 18
		},
		buttonText: {
			color: colors.grey1
		},
		view: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center"
		}
	}
}

export default Button;
