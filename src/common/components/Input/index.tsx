import React from 'react';
import { TextInput } from 'react-native';
import { colors } from "../../../theme/colors";

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

const BlockInput = (props: BlockInputProps) => {
	const { onChange, name, placeholder, value, style, keyboardType, onKeyPress, maxLength } = props;

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
			...style,
		}}
		placeholderTextColor={colors.grey1}
		keyboardType={keyboardType || 'default' }
		placeholder={placeholder ? placeholder : ''}
		onChangeText={newValue => onChange(name, newValue)}
		value={value}
		onKeyPress={onKeyPress}
		maxLength={maxLength} />
		)
}

export default BlockInput;
