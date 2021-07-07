import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";
import { CreditCardDetails } from "src/utils/types";
import Button from "../Button";

interface CreditCardCardProps {
	card: CreditCardDetails,
	onRemovePress?: (id: string) => void
}

const styles = StyleSheet.create({
	view: {
		marginTop: 15,
		backgroundColor: colors.white,
		padding: 0,
		// flexDirection: 'row',
		paddingHorizontal: 20,
		paddingVertical: 20,
		opacity: 0.8
	},
	line: {
		marginBottom: 15
	},
	text: {
		fontSize: 20,
		lineHeight: 30,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrow: {
		marginVertical: 20
	}
})

const CreditCardCard = (props: CreditCardCardProps) => {
	const { number, expireYear, expireMonth, cvc, id} = props.card;
	const renderCardTitle = () => {
		const firstTwo = number.substring(0,2);
		const lastFour = number.substring(number.length - 4, number.length);
		return `${firstTwo} **** **** **** ${lastFour}`;
	}

	const renderExpireDate = () => {
		let month = expireMonth;
		while (month.length !== 2) {
			month = '0' + month;
		}
		let year = expireYear;
		while (year.length !== 2) {
			year = '0' + year;
		}
		return `${month} - ${year}`;
	}

	return (
		<View>
			<View style={styles.view}>
				<View style={styles.line}>
					<Text h3>Credit card number</Text>
					<Text style={styles.text}>{renderCardTitle()}</Text>
				</View>

				<View style={styles.line}>
					<Text h3>EXPIRATION DATE (MM-YY)</Text>
					<Text style={styles.text}>{renderExpireDate()}</Text>
				</View>

				<View style={styles.line}>
					<Text h3>CVC CODE</Text>
					<Text style={styles.text}>{cvc}</Text>
				</View>
			</View>
			<Button
				type="fluidDark"
				title="REMOVE CARD"
				style={{ backgroundColor: colors.textWarning }}
				onPress={() => props.onRemovePress && props.onRemovePress(id)}
			/>
		</View>
	)
}
export default CreditCardCard;