import React, { useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from "src/theme/colors";

type PinCodeProps = {
	value: string,
	length: number,
	onChange?: (text: string) => void,
	onComplete?: (text: string) => void,
	autoFocus?: boolean,
	setRef?: (ref: any) => void
	setStyleOfRef?: (ref: any) => void
};

const PinCode = (props: PinCodeProps) => {
	const { value, autoFocus: focus, length: pinCodeRequiredLength, onChange, onComplete} = props
	const [pinCode, setPinCode] = React.useState<string>(value)
	const [autoFocus, setAutoFocus] = React.useState<boolean | undefined>(focus)
  const textInput = React.useRef<TextInput | null>(null);
	useEffect(() => {
			if (value !== pinCode) {
			setPinCode(value)
		}

		if (focus !== autoFocus) {
			setAutoFocus(focus)
			setTimeout(() => {
				if (textInput) {
					textInput?.current?.blur();
				}
			}, 1);
		}
	}, [value, autoFocus])


	useEffect(() => {
		if (autoFocus) {
			setTimeout(() => {
				if (textInput) {
					textInput?.current?.focus();
				}
			}, 100);
		}
	},[])

	const changeText = async (value: string)  => {
		setPinCode(value)
		if (onChange) {
			await onChange(value)
		}
		if (pinCode.length + 1 < pinCodeRequiredLength) {
			return;
		}
		if (onComplete) {
			setTimeout(() => {
				if (onComplete) {
					onComplete(value);
				}
			}, 250)
		}
	}

	const renderBoxes = () => {
		const elements = [];
		const vals = pinCode.split('')
		for (let i = 0; i < pinCodeRequiredLength; i += 1) {
			elements.push(
				<View style={styles.box} key={i}>
					<View style={[styles.circle, vals[i] ? styles.circleFilled : {}]}/>
				</View>
			);
		}

		return elements;
	}
 function handleClick() {
    textInput?.current?.focus();  
}
	return (
		<TouchableOpacity onPress={handleClick}>
			<View style={styles.container}>
				<TextInput
					ref={textInput}
					style={styles.input}
					autoCorrect={false}
					autoCapitalize='characters'
					value={pinCode}
					blurOnSubmit={false}
					keyboardType="number-pad"
					maxLength={pinCodeRequiredLength}
					disableFullscreenUI
					clearButtonMode='never'
					spellCheck={false}
					returnKeyType='go'
					underlineColorAndroid='transparent'
					onChangeText={(text) => changeText(text)}
					caretHidden/>
				{renderBoxes()}
			</View>
		</TouchableOpacity>
	)
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
