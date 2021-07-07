import React, { useRef } from 'react';
import { Animated, StyleSheet } from "react-native";
import ActionButton from 'react-native-action-button';
import { Text } from "react-native-elements";
import { useMarketEntry, useShares } from "src/hooks";
import { colors } from "src/theme/colors";

// FIXING ERROR OF USENATIVEDRIVER warning
// @ts-ignore
ActionButton.prototype.animateButton = function(animate = true) {
	// @ts-ignore
	if (this.state.active) return this.reset();

	if (animate) {
		// @ts-ignore
		Animated.spring(this.anim, { toValue: 1, useNativeDriver: false }).start();
	} else {
		// @ts-ignore
		this.anim.setValue(1);
	}
	// @ts-ignore
	this.setState({ active: true, resetToken: this.state.resetToken });
}
// @ts-ignore
ActionButton.prototype.reset = function (animate = true) {
	// @ts-ignore
	if (this.props.onReset) this.props.onReset();

	if (animate) {
		// @ts-ignore
		Animated.spring(this.anim, { toValue: 0, useNativeDriver: false }).start();
	} else {
		// @ts-ignore
		this.anim.setValue(0);
	}

	setTimeout(() => {
		// @ts-ignore
		if (this.mounted) {
			// @ts-ignore
			this.setState({ active: false, resetToken: this.state.resetToken });
		}
	}, 250);
}

interface FloatingButtonProps {
	onBuyAction?: () => void;
	onSellAction?: () => void;
	marketEntryId?: string
}


const FloatingButton = (props: FloatingButtonProps) => {
	const { marketEntryId } = props;
	const floatingAction = useRef(null);
	const { shares, getByMarketEntryId } = useShares();
	const { get } = useMarketEntry();
	const marketEntry = marketEntryId && get(marketEntryId);
	const marketEntryShare = marketEntryId && getByMarketEntryId(marketEntryId);

	const canSell = () => {
		if (marketEntry && !marketEntryShare) {
			return false;
		}
		return !!(shares.length);
	};

	return (
		<ActionButton
			ref={floatingAction}
			buttonColor={colors.text}
			autoInactive={false}
			spacing={0}
			size={66}
		>
			<ActionButton.Item
				onPress={() => {
					if (!canSell()) {
						return;
					}
					if (props.onSellAction) {
						props.onSellAction();
					}
					// @ts-ignore
					floatingAction?.current?.reset();
				}}
				shadowStyle={styles.actionButtonItem}
			>
				<Text style={!canSell() ? { opacity: 0.5 } : {}}>New sell order</Text>
			</ActionButton.Item>
			<ActionButton.Item
				onPress={() => {
					if (props.onBuyAction) {
						props.onBuyAction();
					}
					// @ts-ignore
					floatingAction?.current?.reset()
				}}
				shadowStyle={styles.actionButtonItem}
			>
				<Text>New buy order</Text>
			</ActionButton.Item>
		</ActionButton>
);
}

const styles = StyleSheet.create({
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	},
	actionButtonItem: {
		borderRadius: 40,
		width: 'auto',
		height: 'auto',
		paddingHorizontal: 15,
		paddingVertical: 15,
		backgroundColor: colors.white
	}
});

export default FloatingButton;