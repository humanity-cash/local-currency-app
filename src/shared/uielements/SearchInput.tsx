import { AntDesign } from "@expo/vector-icons";
import React from 'react';
import { TextInput, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { colors } from "src/theme/colors";

type SearchInputProps = {
	onChange: any
	label: string
	name?: string
	placeholder?: string
	value: any,
	style?: any
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

class SearchInput extends React.Component<SearchInputProps> {
	input: any

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => this.input.focus()}>
				<View style={styles.container}>
					<View style={styles.iconView}>
						<AntDesign
							name="search1"
							size={20}
							color={colors.text}
						/>
					</View>
					<TextInput
						ref={component => this.input = component}
						style={{
							...styles.inputText,
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

export default SearchInput;