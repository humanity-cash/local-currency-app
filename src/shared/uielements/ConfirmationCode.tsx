import _ from 'lodash';
import React from 'react';
import { StyleSheet, TextInput, View } from "react-native";
import { Text } from 'react-native-elements';
import { colors } from "src/theme/colors";

type ConfirmationCodeProps = {
	onComplete: (code: string) => void
};

type ConfirmationCodeState = {
	codes: string[]
	currentIndex: number
};

const CODE_LENGTH = 6;

class ConfirmationCode extends React.Component<ConfirmationCodeProps, ConfirmationCodeState> {
	inputRefs: any[];

	constructor(props: ConfirmationCodeProps) {
		super(props);

		this.state = {
			codes: Array(CODE_LENGTH).fill(''),
			currentIndex: 0
		};

		this.inputRefs = [];
	}

	onKeyPress = (evt: any) => {
		const { currentIndex, codes } = this.state;
		if (evt.nativeEvent.key === 'Backspace') {
			const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
			this.setFocus(nextIndex);
			const newCodeArr = _.clone(codes);
			if (currentIndex !== 0) {
				newCodeArr[currentIndex - 1] = '';
			}
			this.setState(oldState => ({
				codes: newCodeArr,
				currentIndex: oldState.currentIndex - 1
			}));
		}
	}

	onFocus = (index: number) => {
		const { codes } = this.state;
		const newCodeArr = _.clone(codes);
		const currentEmptyIndex = _.findIndex(newCodeArr, (c: any) => !c);
		if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
			return this.setFocus(currentEmptyIndex);
		}
		for (let i = 0; i < newCodeArr.length; i+=1) {
			if (i >= index) {
				newCodeArr[i] = '';
			}
		}

		this.setState(oldState => ({
			codes: newCodeArr,
			currentIndex: index
		}));
	}

	setFocus = (index: number) => {
		this.inputRefs[index].focus();
	}

	blur = (index: number) => {
		this.inputRefs[index].blur();
	}

	onChange = (text: string, index: number) => {
		const { codes, currentIndex } = this.state;
		const newCodeArr = _.clone(codes);
		newCodeArr[currentIndex] = text;

		if (text !== '') {
			this.setState(oldState => ({
				codes: newCodeArr,
				currentIndex: oldState.currentIndex + 1
			}));

			if (index === CODE_LENGTH - 1) {
				const code = newCodeArr.join('');
				this.props.onComplete(code);
				this.blur(currentIndex);
			} else {
				this.setFocus(currentIndex + 1);
			}
		} else {
			if (currentIndex !== 0) {
				newCodeArr[currentIndex - 1] = '';
			}
			this.setState(oldState => ({
				codes: newCodeArr,
				currentIndex: oldState.currentIndex - 1
			}));
		}
	}

	render () {
		return (
			<View style={styles.container}>
				{Array(3).fill('').map((value, index) => (
					<TextInput
						key={index}
						ref={ref => this.inputRefs[index] = ref}
						style={styles.codeInput}
						keyboardType={'number-pad'}
						value={this.state.codes[index] ? this.state.codes[index].toString() : ''}
						onFocus={() => this.onFocus(index)}
						onChangeText={text => this.onChange(text, index)}
						onKeyPress={this.onKeyPress}
						maxLength={1}
					/>
				))}
				<Text style={styles.dividingLine}>-</Text>
				{Array(CODE_LENGTH/2).fill('').map((value, index) => (
					<TextInput
						key={index}
						ref={ref => this.inputRefs[index + CODE_LENGTH/2] = ref}
						style={styles.codeInput}
						keyboardType={'number-pad'}
						value={this.state.codes[index + CODE_LENGTH/2] ? this.state.codes[index + CODE_LENGTH/2].toString() : ''}
						onFocus={() => this.onFocus(index + CODE_LENGTH/2)}
						onChangeText={text => this.onChange(text, index + CODE_LENGTH/2)}
						onKeyPress={this.onKeyPress}
						maxLength={1}
					/>
				))}
			</View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	codeInput: {
		textAlign: 'center',
		padding: 0,
		width: 44,
		height: 60,
		fontSize: 40,
		backgroundColor: colors.azure,
		borderWidth: 0,
		color: colors.text,
		margin: 2
	},
	dividingLine: {
		textAlign: 'center',
		height: 60,
		lineHeight: 60,
		fontSize: 40,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default ConfirmationCode;