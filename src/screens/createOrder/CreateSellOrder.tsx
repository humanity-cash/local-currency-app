import React from 'react';
import { View } from 'react-native';
import { useMarketEntry, useModalStatusBar, useShares } from "src/hooks";
import { CreateSellOrderNavigator } from "src/navigation/CreateSellOrderNavigator";
import { Modal } from "src/shared/uielements";
import { OrderType, Share, ShareEntry } from "src/utils/types";

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