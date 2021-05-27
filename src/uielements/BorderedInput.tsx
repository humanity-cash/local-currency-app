import React from 'react';
import { TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-elements';
import { colors } from "../theme/colors";

type BorderedInputState = {}

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

export class BorderedInput extends React.Component<BorderedInputProps, BorderedInputState> {
	input: any

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => this.input.focus()}>
				<View style={{
					height: 60,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: colors.white,
					marginVertical: 8,
					paddingHorizontal: 15
				}}>
					<Text style={{
						textAlignVertical: "center",
						opacity: 0.6,
						flex: 1,
					}}>
						{this.props.label}
					</Text>
					{this.props.prefix && (
						<View style={{ alignItems: "center" }}>
							<Text style={{
								textAlignVertical: "center",
								fontSize: 20,
								height: 60,
								lineHeight: 60,
								fontFamily: 'IBMPlexSansSemiBold',
								textAlign: 'right',
							}}>
								{this.props.prefix}
							</Text>
						</View>
					)}
					<TextInput
						ref={component => this.input = component}
						style={{
							textAlign: 'right',
							fontSize: 20,
							fontFamily: 'IBMPlexSansSemiBold',
							paddingLeft: 5,
							borderWidth: 0,
							color: colors.text,
							...this.props.style,
						}}
						placeholderTextColor={colors.grey1}
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

