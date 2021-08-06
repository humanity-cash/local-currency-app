import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";
import { AccordionEntry } from "src/utils/types";

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.inputBg,
		padding: 20,
		marginBottom: 5
	},
	header: {
		flexDirection: "row",
		backgroundColor: colors.inputBg,
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
		marginTop: 15,
		paddingHorizontal: 10
	},
	contentText: {
		fontSize: 10,
		lineHeight: 14,
		color: colors.bodyText
	}
});

const AccordionCard = (props: AccordionEntry) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpanded)}>
				<View style={styles.header}>
					<Text style={styles.headerText}>{props.title}</Text>
					<View style={styles.headerIcon}>
						<Entypo 
							style={isExpanded ? styles.headerActive : {}}
							name="chevron-down" 
							size={16} 
							color={colors.text} 
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
			{isExpanded && (
				<View style={styles.textContainer}>
					<Text style={styles.contentText}>{props.content}</Text>
				</View>
			)}
		</View>
	)
}

export default AccordionCard;