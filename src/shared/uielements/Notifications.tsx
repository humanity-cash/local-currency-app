import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Text } from "react-native-elements";
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerStateChangeEvent,
    State
} from "react-native-gesture-handler";
import { useNotifications } from "src/hooks";
import { colors } from "src/theme/colors";
import { Notification } from "src/utils/types";

const CONTAINER_WIDTH = Dimensions.get("window").width - 20;
const CONTAINER_HEIGHT = Dimensions.get("window").height * 0.10;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 20,
		left: 0,
		height: CONTAINER_HEIGHT,
		margin: 10,
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: 'white',
		width: CONTAINER_WIDTH,
		zIndex: 2
	},
	title: {
		fontFamily: 'IBMPlexSansSemiBold',
	},
	link: {
		color: colors.gold
	}
});

const TRANSLATE_Y_RANGE = -30;
const HIDDEN_POSITION = -CONTAINER_HEIGHT-10;
const VISIBLE_POSITION = 20;
const DURATION = 200;

const Notifications = () => {
	const navigation = useNavigation();
	const { notifications, getFirst } = useNotifications();
	const [notification, setNotification] = useState<Notification | null>(null);
	const [value] = useState(new Animated.Value(HIDDEN_POSITION))

	useEffect(()=>{
		if (notification) {
			Animated.timing(value, {
				toValue: VISIBLE_POSITION,
				duration: DURATION,
				useNativeDriver: false
			}).start();
		}
	}, [notification])


	useEffect(() => {
		const getLatestMessage = async () => {
			if (!notification) {
				const msg = await getFirst();
				setNotification(msg);
			}
		}
		getLatestMessage();
	}, [notifications]);

	if (!notification) {
		return null;
	}

	const panGestureEvent = (event: PanGestureHandlerGestureEvent) => {
		const { translationY, state } = event.nativeEvent;
		if (translationY < 0 && state === State.ACTIVE) {
			value.setValue(VISIBLE_POSITION + event.nativeEvent.translationY);
		}
	}

	const stateChangeEvent = (event: PanGestureHandlerStateChangeEvent) => {
		const { translationY, state } = event.nativeEvent;
		if (translationY < TRANSLATE_Y_RANGE && state === State.END) {
			Animated.timing(value, {
				toValue: HIDDEN_POSITION,
				duration: DURATION,
				useNativeDriver: false
			}).start(() => setNotification(null));
		}
		if (translationY > TRANSLATE_Y_RANGE && state === State.END) {
			Animated.timing(value, {
				toValue: VISIBLE_POSITION,
				duration: DURATION,
				useNativeDriver: false
			}).start();
		}
	}

	return (
		<PanGestureHandler onHandlerStateChange={stateChangeEvent} onGestureEvent={panGestureEvent}>
			<Animated.View style={[styles.container, { top: value }]}>
				<Text style={styles.title}>{notification.message}</Text>
				<TouchableWithoutFeedback onPress={() => navigation.navigate(notification.redirect)}>
					<Text style={styles.link}>Go to orders</Text>
				</TouchableWithoutFeedback>
			</Animated.View>
		</PanGestureHandler>
	)
}

export default Notifications;