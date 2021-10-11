import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import WebView from "react-native-webview";
import { DocumentFile } from "src/utils/types";
import Button from "./Button";
import { CancelBtn, ModalHeader } from "./header";
import Modal from "./Modal";

type DocumentModalProps = {
	visible: boolean,
	onClose: () => void,
	onAccept: (document: any) => void,
	document: DocumentFile,
	buttonText?: string
}

const styles = StyleSheet.create({
	modalWrap: {
		paddingHorizontal: 10,
		height: '100%',
		flex: 1
	},
	modalHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		marginBottom: 10
	}
});

const DocumentModal = (props: DocumentModalProps) => {
	const { visible, document, onClose, onAccept } = props;
	return (
		<Modal visible={visible}>
			<View style={{ height: '100%'}}>
				<ModalHeader
					rightComponent={<CancelBtn onClick={onClose} />}
				/>
				<View style={styles.modalWrap}>
					<Text style={styles.modalHeader}>{document.name}</Text>
					<WebView source={document.filename} />
				</View>
				<Button
					type="fluidDark"
					textStyle={{ textTransform: 'uppercase' }}
					title={props.buttonText || "ACCEPT AND EMAIL ME A COPY"}
					onPress={onAccept}
				/>
			</View>
		</Modal>
	);
}

export default DocumentModal;