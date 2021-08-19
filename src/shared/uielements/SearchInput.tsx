import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useLayoutEffect } from 'react';
import { TextInput, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { colors } from "src/theme/colors";

type SearchInputProps = {
	onChange: any
	label: string
	name?: string
	placeholder?: string
	value: any
	style?: any
	textColor?: any
	keyboardType?: any
	onKeyPress?: any
	maxLength?: number
}

const styles = StyleSheet.create({
	container: {
		height: 55,
		flexDirection: "row",
		justifyContent: "center",
		borderRadius: 3,
		alignItems: "center",
		backgroundColor: colors.inputBg,
		marginVertical: 8,
		paddingHorizontal: 15
	},
	iconView: {
		alignItems: "center"
	},
	inputText: {
		textAlign: 'left',
		fontSize: 20,
		fontFamily: 'IBMPlexSansSemiBold',
		paddingLeft: 15,
		borderWidth: 0,
		color: colors.text,
		flex: 1
	}
});

const SearchInput = (props: SearchInputProps) => {
	const inputRef = useRef<TextInput | null>(null);
	
	return (
		<TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
			<View style={{ ...styles.container, ...props.style }}>
				<View style={styles.iconView}>
					<AntDesign
						name="search1"
						size={20}
						color={props.textColor ? props.textColor : colors.text}
					/>
				</View>
				<TextInput
					ref={inputRef}
					style={{
						...styles.inputText,
						...props.style
					}}
					placeholderTextColor={props.textColor ? props.textColor : colors.lightGreen}
					keyboardType={props.keyboardType || 'default' }
					placeholder={props.placeholder ? props.placeholder : ''}
					onChangeText={newValue => props.onChange(props.name, newValue)}
					value={props.value}
					onKeyPress={props.onKeyPress}
					maxLength={props.maxLength}
				/>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default SearchInput;