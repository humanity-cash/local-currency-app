import { AntDesign, Entypo } from "@expo/vector-icons";
import React from 'react';
import { TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Text, Image } from 'react-native-elements';
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

class SearchInput extends React.Component<SearchInputProps> {
	input: any

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => this.input.focus()}>
				<View style={{
					height: 55,
					flexDirection: "row",
					justifyContent: "center",
					borderRadius: 3,
					alignItems: "center",
					backgroundColor: colors.inputBg,
					marginVertical: 8,
					paddingHorizontal: 15
				}}>
					<View style={{ alignItems: "center" }}>
						<AntDesign
							name="search1"
							size={20}
							color={colors.text}
						/>
					</View>
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

export default SearchInput;