import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { useMessages, useUserDetails, useWallet } from "src/hooks";
import { BottomSheet, Button, CancelBtn, Modal, ModalHeader, SettingsListItem } from "src/shared/uielements";
import { HEADER_HEIGHT } from "src/shared/uielements/header/Header";
import { colors } from "src/theme/colors";
import { modalViewBase, viewDashboardBase } from "src/theme/elements";
import { Message } from "src/utils/types";

type WalletProps = {
	visible: boolean
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: colors.text,
		zIndex: 100
	},
	headerView: {
		flexDirection: "row",
		marginTop: 30,
		marginBottom: 10
	},
	signOutView: {
		fontSize: 20,
		position: 'absolute',
		bottom: 0,
		right: 0,
		marginBottom: 10,
		color: colors.white
	},
	signOutButton: {
		fontSize: 20,
		fontFamily: 'IBMPlexSansSemiBold',
		position: 'absolute',
		bottom: 0,
		right: 0,
		marginBottom: 10,
		color: colors.white
	},
	view: {
		marginTop: 5,
		backgroundColor: colors.white,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	header: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 20,
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		paddingLeft: 10,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrow: {
		marginVertical: 15
	},
	inbox: {
		marginTop: 30
	},
	inboxHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		color: colors.white,
		marginBottom: 5
	},
	message: {
		backgroundColor: colors.white,
		padding: 15,
		marginBottom: 10,
		flexDirection: "row"
	},
	messageTitle: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		marginTop: 2
	},
	dotView: {
		alignItems: "center",
		width: 20,
		justifyContent: "center"
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 10
	},
	unread: {
		backgroundColor: colors.text,
	},
	modalContainer: {
		paddingHorizontal: 10,
		paddingTop: 10,
		height: '100%',
		flex: 1
	},
	modalHeader: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 16,
		marginBottom: 10,
	},
	modalText: {
		marginVertical: 20
	}
})

const HEIGHT = Dimensions.get("window").height - HEADER_HEIGHT;

export const SettingsOverlay = (props: WalletProps) => {
	const { personalDetails, resetState } = useUserDetails();
	const { resetWallet } = useWallet();
	const { messages } = useMessages();
	const navigation = useNavigation();
	const [signOut, setSignOut] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const [currentMessage, setCurrentMessage] = useState<Message | null>(null);

	const onConfirmSignOut = async () => {
		setSignOut(false);
		await resetState();
		await resetWallet();
		navigation.navigate('Teaser');
	}

	const onCancelSignOut = async () => {
		setSignOut(false);
	}

	const onMessageShow = (message: Message) => {
		setShowMessage(true);
		setCurrentMessage(message);
	}

	const onMessageClose = () => {
		setShowMessage(false);
		setCurrentMessage(null);
	}

	return (
		<View>
			{props.visible && (
				<View style={[styles.container, { height: HEIGHT }]}>
					<View style={viewDashboardBase}>
						<ScrollView style={{ flex: 1, padding: 10 }}>
							<View style={styles.headerView}>
								<Text h1 style={{ color: colors.white, marginBottom: 0 }}>Hi {personalDetails.firstname}</Text>
								<View style={{ flex: 1 }}>
									<TouchableWithoutFeedback onPress={() => setSignOut(true)}>
										<Text style={styles.signOutButton}>Sign out</Text>
									</TouchableWithoutFeedback>
								</View>
							</View>
							<View>
								<SettingsListItem
									name="Personal Profile"
									onPress={() => navigation.navigate('SelectAccountType')}
								/>
								<SettingsListItem
									name="Settings"
									onPress={() => navigation.navigate('Settings')}
								/>
								<SettingsListItem
									name="Terms and conditions"
									onPress={() => navigation.navigate('SettingsTermsAndConditions')}
								/>
								<SettingsListItem
									name="Help and contact"
									onPress={() => navigation.navigate('SettingsHelpAndContact')}
								/>
							</View>
							<View style={styles.inbox}>
								<Text style={styles.inboxHeader}>Inbox</Text>
								{messages.map(message => (
									<TouchableWithoutFeedback key={`message${message.id}`} onPress={() => onMessageShow(message)}>
										<View style={styles.message}>
												<View style={styles.dotView}>
													<View style={{ ...styles.dot, backgroundColor: message.unread ? colors.text : colors.white }} />
												</View>
												<View>
													<Text h3>{moment(message.created).format('dddd DD MMMM YYYY - hh:mm')}</Text>
													<Text style={styles.messageTitle}>{message.title}</Text>
													<Text>
														{message.text.length && message.text[0].substr(0, Math.min(35, message.text[0].length))}...
													</Text>
												</View>
										</View>
									</TouchableWithoutFeedback>
								))}
							</View>
						</ScrollView>
					</View>
					<BottomSheet visible={signOut} onClose={onCancelSignOut} text="Are you sure?">
						<View>
							<Button
								style={{ flex: 1, margin: 5, backgroundColor: colors.textWarning }}
								type="fluidDark"
								title="YES, SIGN OUT"
								onPress={onConfirmSignOut}
							/>
							<Button
								style={{ margin: 5, backgroundColor: colors.white }}
								textStyle={{ color: colors.text }}
								type="fluidDark"
								title="CANCEL"
								onPress={onCancelSignOut}
							/>
						</View>
					</BottomSheet>

					{showMessage && currentMessage && (
						<Modal visible={showMessage}>
							<View style={{ ...modalViewBase, height: '100%', backgroundColor: colors.white }}>
								<ModalHeader
									rightComponent={<CancelBtn onClick={onMessageClose} />}
								/>
								<ScrollView style={styles.modalContainer}>
									<Text style={styles.modalHeader}>{currentMessage.title}</Text>
									<Text h3>
										{moment(currentMessage.created).format('dddd DD MMMM YYYY - hh:mm')}
									</Text>
									{currentMessage.text.map((part, index) => (
										<Text key={index} style={styles.modalText}>{part}</Text>
									))}
								</ScrollView>
							</View>
						</Modal>
					)}
				</View>
			)}
		</View>
	);
}