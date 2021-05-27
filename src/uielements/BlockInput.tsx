import React from 'react';
import { TextInput } from 'react-native';
import { colors } from "../theme/colors";

type BlockInputStates = {}

type BlockInputProps = {
	onChange: any
	name?: string
	placeholder?: string
	value: any,
	style?: any
	keyboardType?: any
	onKeyPress?: any
	maxLength?: number
}

export class BlockInput extends React.Component<BlockInputProps, BlockInputStates> {
	render() {
		return (
			<TextInput
				style={{
					height: 60,
					fontSize: 16,
					backgroundColor: colors.white,
					borderRadius: 2,
					paddingHorizontal: 15,
					paddingVertical: 8,
					marginVertical: 8,
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
		)
	}
}

