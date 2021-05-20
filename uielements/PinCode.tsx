import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from "../theme/colors";

type PinCodeProps = {
	value: string,
	length: number,
	onChange?: (text: string) => void,
	onComplete?: (text: string) => void,
	autoFocus?: boolean,
	setRef?: (ref: any) => void
	setStyleOfRef?: (ref: any) => void
};
type PinCodeState = {
	value: string
}

export class PinCode extends React.Component<PinCodeProps, PinCodeState> {
	input: any = null

	constructor (props: PinCodeProps) {
		super(props)

		this.state = {
			value: props.value
		}
	}

	UNSAFE_componentWillReceiveProps (nextProps: PinCodeProps) {
		if ('value' in nextProps && nextProps.value !== this.state.value) {
			this.setValue(nextProps.value)
		}

		if (nextProps.autoFocus !== this.props.autoFocus) {
			setTimeout(() => {
				if (this.input) {
					this.input.blur();
				}
			}, 1);
		}

		// if (nextProps.autoFocus) {
		// 	if (nextProps.value.length < this.props.length) {
		// 		if (this.props.autoFocus) {
		// 			setTimeout(() => {
		// 				this.input.focus();
		// 			}, 1);
		// 		}
		// 	} else {
		// 		setTimeout(() => {
		// 			this.input.blur();
		// 		}, 1);
		// 	}
		// }
	}

	componentDidMount() {
		if (this.props.autoFocus) {
			setTimeout(() => {
				if (this.input) {
					this.input.focus();
				}
			}, 100);
		}
	}

	setValue(value: string) {
		this.setState({ value })
	}

	async changeText (value: string) {
		await this.setValue(value)

		if (this.props.onChange) {
			await this.props.onChange(this.state.value)
		}

		if (this.state.value.length < this.props.length) {
			return;
		}

		if (this.props.onComplete) {
			setTimeout(() => {
				if (this.props.onComplete) {
					this.props.onComplete(this.state.value);
				}
			}, 250)
		}
	}

	renderBoxes () {
		let elements = [];
		let vals = this.state.value.split('')
		for (let i = 0; i < this.props.length; i += 1) {
			elements.push(
				<View style={styles.box} key={i}>
					<View style={[styles.circle, vals[i] ? styles.circleFilled : {}]}/>
				</View>
			);
		}

		return elements;
	}

	render () {
		return (
			<TouchableOpacity onPress={() => { this.input.focus() }}>
				<View style={styles.container}>
					<TextInput
						ref={(component) => {
							this.input = component;
							if (this.props.setRef) {
								this.props.setRef(component);
							}
							if (this.props.setStyleOfRef) {
								this.props.setStyleOfRef(component);
							}
						}}
						style={styles.input}
						autoCorrect={false}
						autoCapitalize='characters'
						value={this.state.value}
						blurOnSubmit={false}
						keyboardType="number-pad"
						maxLength={this.props.length}
						disableFullscreenUI
						clearButtonMode='never'
						spellCheck={false}
						returnKeyType='go'
						underlineColorAndroid='transparent'
						onChangeText={(text) => this.changeText(text)}
						caretHidden/>
					{this.renderBoxes()}
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 50
	},
	input: {
		width: 1,
		height: 1,
		opacity: 0
	},
	box: {
		width: 15,
		marginHorizontal: 5
	},
	circle: {
		width: 10,
		height: 10,
		marginHorizontal: 5,
		borderWidth: 2,
		borderColor: colors.text,
		borderRadius: 15
	},
	circleFilled: {
		backgroundColor: colors.brown,
		borderColor: colors.brown,
	}
});

export default PinCode;