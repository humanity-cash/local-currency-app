import React from 'react';
import { TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-elements';
import { colors } from "src/theme/colors";

type BorderedInputProps = {
	onChange: any
	label: string
	prefix?: string
	name?: string
	placeholder?: string
	value: any,
	style?: any
	keyboardType?: any
	onKeyPress?: any
	maxLength?: number
}

class BorderedInput extends React.Component<BorderedInputProps> {
	input: any

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => this.input.focus()}>
				<View style={{
					height: 60,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: colors.inputBg,
					marginVertical: 8,
					paddingHorizontal: 15
				}}>
					{this.props.prefix && (
						<View style={{ alignItems: "center" }}>
							<Text style={{
								textAlignVertical: "center",
								fontSize: 20,
								height: 60,
								lineHeight: 60,
								fontFamily: 'IBMPlexSansSemiBold',
								textAlign: 'left',
							}}>
								{this.props.prefix}
							</Text>
						</View>
					)}
					<TextInput
						ref={component => this.input = component}
						style={{
							textAlign: 'left',
							fontSize: 20,
							fontFamily: 'IBMPlexSansSemiBold',
							paddingLeft: 15,
							borderWidth: 0,
							color: colors.text,
							flex: 1,
							...this.props.style,
						}}
						placeholderTextColor={colors.lightGreen}
						keyboardType={this.props.keyboardType || 'default' }
						placeholder={this.props.placeholder ? this.props.placeholder : ''}
						onChangeText={newValue => this.props.onChange(this.props.name, newValue)}
						value={this.props.value}
						onKeyPress={this.props.onKeyPress}
						maxLength={this.props.maxLength}
					/>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

export default BorderedInput;