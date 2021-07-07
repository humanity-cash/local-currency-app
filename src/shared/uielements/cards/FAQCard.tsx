import { AntDesign } from "@expo/vector-icons";
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";

interface FAQCardProps {
	question: string,
	answer: string
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		padding: 20,
		marginBottom: 5
	},
	header: {
		flexDirection: "row",
		backgroundColor: colors.white,
	},
	headerText: {
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16
	},
	headerIcon: {
		flexDirection: "row",
		alignItems: "center"
	},
	headerActive: {
		transform: [{ rotate: '180deg' }]
	},
	textContainer: {
		marginTop: 10
	}
});

const FAQCard = (props: FAQCardProps) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
				<View style={styles.header}>
					<Text style={styles.headerText}>{props.question}</Text>
					<View style={styles.headerIcon}>
						<AntDesign
							style={expanded ? styles.headerActive : {}}
							name='caretdown'
							size={10}
							color={colors.text}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
			{expanded && (
				<View style={styles.textContainer}>
					<Text>{props.answer}</Text>
				</View>
			)}
		</View>
	)
}

export default FAQCard;