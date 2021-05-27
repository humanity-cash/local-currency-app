import React from 'react';
import { View } from 'react-native';
import { Modal } from "../../uielements/Modal";
import { CreateSellOrderNavigator } from "../../navigation/CreateSellOrderNavigator";
import { useMarketEntry } from "../../hooks/useMarketEntry";
import { MarketEntry, OrderType, Share, ShareEntry } from "../../utils/types";
import { useShares } from "../../hooks/useShares";
import { CreateBuyOrderNavigator } from "../../navigation/CreateBuyOrderNavigator";
import { useModalStatusBar } from "../../hooks/useModalStatusBar";

type CreateSellOrderProps = {
	navigation?: any,
	route?: any,
	visible?: boolean,
	onClose: () => void,
	marketEntryId?: string
}

const CreateSellOrder = (props: CreateSellOrderProps) => {
	const { get } = useMarketEntry();
	const { getByMarketEntryId } = useShares();
	const { marketEntryId } = props;
	const entry = marketEntryId && get(marketEntryId);
	const ownedShare = marketEntryId && getByMarketEntryId(marketEntryId);
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setUseHeader(false);
		props.onClose();
	}

	const createEntry = () => {
		if (!ownedShare) {
			return {};
		}
		const share: ShareEntry = {
			quantity: 0,
			price: 0,
			type: OrderType.SELL
		};
		share.price = ownedShare?.price;
		share.quantity = (ownedShare as Share).quantity;
		return { share };
	}
	return (
		<View>
			{props.visible && (
				<Modal visible={props.visible} onShow={() => setUseHeader(true)}>
					<CreateSellOrderNavigator
						marketEntryId={props.marketEntryId}
						onClose={onClose}
						style={{ backgroundColor: 'transparent' }}
						showBack={false}
						{...createEntry()}
					/>
				</Modal>
			)}
		</View>
	);
}

export default CreateSellOrder