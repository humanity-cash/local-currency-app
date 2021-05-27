import React from 'react';
import { DocumentFile } from "../../utils/types";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Text } from 'react-native-elements';
import { colors } from "../../theme/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FileCardProps = {
	file: DocumentFile,
	onClick: (file: DocumentFile) => void
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		padding: 10,
		paddingHorizontal: 20,
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center"
	},
	text: {
		textAlignVertical: "center",
		marginLeft: 20,
		fontFamily: 'IBMPlexSansSemiBold',
	}
});

export const FileCard = (props: FileCardProps) => {
	return (
		<TouchableWithoutFeedback onPress={() => props.onClick(props.file)}>
			<View style={styles.container}>
				<MaterialCommunityIcons
					name="file-pdf-outline"
					size={40}
					color={colors.text}
				/>
				<Text style={styles.text}>{props.file.name}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}