import React from 'react';
import { View } from 'react-native';
import { Modal } from "../../uielements/Modal";
import { CreateBuyOrderNavigator } from "../../navigation/CreateBuyOrderNavigator";
import { useMarketEntry } from "../../hooks/useMarketEntry";
import { MarketEntry, OrderType, ShareEntry } from "../../utils/types";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

type CreateBuyOrderProps = {
	navigation?: any,
	route?: any,
	visible?: boolean,
	onClose: () => void,
	marketEntryId?: string
}

const CreateBuyOrder = (props: CreateBuyOrderProps) => {
	const { get } = useMarketEntry();
	const { marketEntryId } = props;
	const entry = marketEntryId && get(marketEntryId);
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}

	const createEntry = () => {
		if (!entry) {
			return;
		}
		const share: ShareEntry = {
			quantity: 0,
			price: 0,
			type: OrderType.BUY
		};
		share.price = (entry as MarketEntry).price;
		share.quantity = (entry as MarketEntry).totalShares - (entry as MarketEntry).tradedShares;
		return share;
	}

	return (
		<View>
			{props.visible && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<CreateBuyOrderNavigator
						marketEntryId={props.marketEntryId}
						onClose={onClose}
						style={{ backgroundColor: 'transparent' }}
						showBack={false}
						share={createEntry()}
					/>
				</Modal>
			)}
		</View>
	);
}

export default CreateBuyOrder