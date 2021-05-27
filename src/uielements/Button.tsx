import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { colors } from "../theme/colors";

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

type ButtonStates = {}

type ButtonProps = {
	onPress: any
	title: any
	type: string
	style?: any
	textStyle?: any
	disabled?: boolean
}

export class Button extends React.Component<ButtonProps, ButtonStates> {
	render() {
		return (
			<TouchableOpacity
				onPress={() => {
					if (this.props.disabled) return;
					this.props.onPress()
				}}
				disabled={this.props.disabled}
				style={{
					...styles[this.props.type].button,
					...(this.props.disabled ? { opacity: 0.5 } : {}),
					...this.props.style
				} as any}
			>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text style={{
						...styles[this.props.type].buttonText,
						...this.props.textStyle
					}}>
						{this.props.title}
					</Text>
				</View>
			</TouchableOpacity>
		)
	}
}