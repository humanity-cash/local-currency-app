import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";
import { DocumentFile } from "src/utils/types";

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

const FileCard = (props: FileCardProps) => {
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

export default FileCard;