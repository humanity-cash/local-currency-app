import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from "src/theme/colors";

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
	}, darkRed: {
		button: {
			height: 55,
			backgroundColor: colors.darkRed,
			paddingTop: 10,
			paddingBottom: 10,
			alignItems: 'center',
			borderRadius: 30
		},
		buttonText: {
			color: colors.white
		},
		view: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center"
		}
	}, darkGreen: {
		button: {
			height: 55,
			backgroundColor: colors.darkGreen,
			paddingTop: 10,
			paddingBottom: 10,
			alignItems: 'center',
			borderRadius: 30
		},
		buttonText: {
			color: colors.white
		},
		view: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center"
		}
	}, transparent: {
		button: {
			height: 55,
			backgroundColor: colors.transparent,
			paddingTop: 10,
			paddingBottom: 10,
			alignItems: 'center',
			borderRadius: 30
		},
		buttonText: {
			color: colors.darkRed
		},
		view: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center"
		}
	}
}

type ButtonProps = {
	onPress: any
	title: any
	type: string
	style?: any
	textStyle?: any
	disabled?: boolean
}

const Button = (props: ButtonProps) => {

	return (
		<TouchableOpacity
			onPress={() => {
				if (props.disabled) return;
				props.onPress()
			}}
			disabled={props.disabled}
			style={{
				...styles[props.type].button,
				...(props.disabled ? { opacity: 0.5 } : {}),
				...props.style
			} as any}
		>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{
					...styles[props.type].buttonText,
					...props.textStyle
				}}>
					{props.title}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export default Button;