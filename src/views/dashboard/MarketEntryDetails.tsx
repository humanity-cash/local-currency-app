import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from "../../uielements/header/Header";
import { Text } from 'react-native-elements';
import { baseHeader, viewBase } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { colors } from "../../theme/colors";
import { useShares } from "../../hooks/useShares";
import { useMarketEntry } from "../../hooks/useMarketEntry";
import { WalletBtn } from "../../uielements/header/WalletBtn";
import { OwnedShareCard } from "../../uielements/cards/OwnedShareCard";
import { ShareEntryCard } from "../../uielements/cards/ShareEntryCard";
import { ChartView } from "../../uielements/ChartView";
import { FileCard } from "../../uielements/cards/FileCard";
import { DocumentFile, ShareEntry } from "../../utils/types";
import { WantedAndOffersChart } from "../../uielements/WantedAndOffersChart";
import { DocumentModal } from "../../uielements/DocumentModal";
import { useUserDetails } from "../../hooks/useUserDetails";
import BuyTransaction from "../transactions/BuyTransaction";
import SellTransaction from "../transactions/SellTransaction";
import { FloatingButton } from "../../uielements/FloatingButton";
import CreateBuyOrder from "../createOrder/CreateBuyOrder";
import CreateSellOrder from "../createOrder/CreateSellOrder";
import { formatValue } from "../../utils/common";

type MarketEntryDetailsProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	view: {
		flex: 1
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		marginRight: 10,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	input: {
		flex: 1,
		marginVertical: 0
	},
	contentView: {
		padding: 10
	},
	aboutHeader: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 20,
		marginTop: 15
	},
	aboutText: {
		paddingBottom: 15
	},
	propertiesView: {

	},
	propertiesRowView: {
		flexDirection: "row",
		marginBottom: 20
	},
	propertiesCell: {
		flex: 1
	},
	propertiesLabel: {
		textAlign: "center"
	},
	propertiesText: {
		textAlign: "center",
		fontFamily: 'IBMPlexSansSemiBold',
	},
	expandableText: {
		textAlign: "center",
		fontFamily: 'IBMPlexSansSemiBold'
	}
});

const MarketEntryDetailsView = (props: MarketEntryDetailsProps) => {
	const { entryId } = props.route.params;
	const { getByMarketEntryId } = useShares();
	const { get } = useMarketEntry();
	const { personalDetails: { email }} = useUserDetails();
	const [documentVisible, setDocumentVisible] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [selectedDocument, setSelectedDocument] = useState<DocumentFile | null>(null);
	const [sellTransaction, setSellTransaction] = useState(false);
	const [buyTransaction, setBuyTransaction] = useState(false);
	const [shareEntry, setShareEntry] = useState<ShareEntry | null>(null);
	const [createSell, setCreateSell] = useState(false);
	const [createBuy, setCreateBuy] = useState(false);

	const entry = get(entryId);
	const share = getByMarketEntryId(entryId);

	const handleFilePress = (file: DocumentFile) => {
		setSelectedDocument(file);
		setDocumentVisible(true);
	}

	const handleFileOnClose = () => {
		setDocumentVisible(false);
		setSelectedDocument(null);
	}

	const handleFileOnAccept = (file: DocumentFile) => {
		setDocumentVisible(false);
		setSelectedDocument(null);
	}

	const handleBuyPress = (shareEntry: ShareEntry) => {
		setBuyTransaction(true);
		setShareEntry(shareEntry)
	}

	const handleBuyClose = () => {
		setBuyTransaction(false);
		setShareEntry(null)
	}

	const handleSellPress = (shareEntry: ShareEntry) => {
		setSellTransaction(true);
		setShareEntry(shareEntry)
	}

	const handleSellClose = () => {
		setSellTransaction(false);
		setShareEntry(null)
	}

	return (
		<View style={ viewBase }>
			<Header
				placement="left"
				style={{ backgroundColor: colors.text }}
				barStyle="light-content"
				leftComponent={<BackBtn color={colors.white} onClick={() => props.navigation.goBack()} />}
				rightComponent={<WalletBtn />}
			/>
			{entry && (
				<ScrollView style={styles.view}>
					<View style={[baseHeader, { paddingHorizontal: 10 }]}>
						<Text h1>{entry.name}</Text>
					</View>

					<View style={styles.contentView}>
						<OwnedShareCard share={share} marketEntry={entry} />
					</View>
					<ChartView labelsType='marketEntry' />

					{!expanded && (
						<View style={styles.contentView}>
							{entry.wanted.length > 0 && (
								<ShareEntryCard
									entry={entry.wanted[0]}
									ownedShare={share}
									onClick={handleSellPress}
								/>
							)}

							{entry.offered.length > 0 && (
								<ShareEntryCard
									entry={entry.offered[0]}
									ownedShare={share}
									onClick={handleBuyPress}
								/>
							)}
							<TouchableWithoutFeedback onPress={() => setExpanded(true)}>
								<Text style={styles.expandableText}>+ show all prices</Text>
							</TouchableWithoutFeedback>
						</View>
					)}

					{expanded && (
						<View style={styles.contentView}>
							{entry.wanted.map((offer, index) => (
								<ShareEntryCard
									key={`${entry.name}w${index}`}
									entry={offer}
									ownedShare={share}
									onClick={handleSellPress}
								/>
							))}

							{entry.offered.map((offer, index) => (
								<ShareEntryCard
									key={`${entry.name}se${index}`}
									entry={offer}
									ownedShare={share}
									onClick={handleBuyPress}
								/>
							))}
							<TouchableWithoutFeedback onPress={() => setExpanded(false)}>
								<Text style={styles.expandableText}>- hide all prices</Text>
							</TouchableWithoutFeedback>
						</View>
					)}

					<View style={[styles.contentView, { backgroundColor: colors.lightGold, paddingVertical: 20}]}>
						<View style={styles.propertiesView}>
							<View style={styles.propertiesRowView}>
								<View style={styles.propertiesCell}>
									<Text h3 style={styles.propertiesLabel}>nominal share value</Text>
									<Text style={styles.propertiesText}>{formatValue(entry.nominalValue)}</Text>
								</View>
								<View style={styles.propertiesCell}>
									<Text h3 style={styles.propertiesLabel}>dividend</Text>
									<Text style={styles.propertiesText}>{formatValue(entry.dividend)}</Text>
								</View>
							</View>

							<View style={styles.propertiesRowView}>
								<View style={styles.propertiesCell}>
									<Text h3 style={styles.propertiesLabel}>traded volume</Text>
									<Text style={styles.propertiesText}>{entry.tradedShares} shares</Text>
								</View>
								<View style={styles.propertiesCell}>
									<Text h3 style={styles.propertiesLabel}>traded value</Text>
									<Text style={styles.propertiesText}>{formatValue(entry.tradedValue)}</Text>
								</View>
							</View>

							<View style={styles.propertiesRowView}>
								<View style={styles.propertiesCell}>
									<Text h3 style={styles.propertiesLabel}>outstanding</Text>
									<Text style={styles.propertiesText}>{entry.totalShares} shares</Text>
								</View>
								<View style={styles.propertiesCell}>
									<Text h3 style={styles.propertiesLabel}>Company value</Text>
									<Text style={styles.propertiesText}>{formatValue(entry.companyValue)}</Text>
								</View>
							</View>
						</View>

						<WantedAndOffersChart wanted={entry.wanted} offers={entry.offered} />
					</View>

					<View style={styles.contentView}>
						<Text style={styles.aboutHeader}>About {entry.name}</Text>
						{entry.description.map((desc, index) => (
							<Text key={`${entry.name}desc${index}`} style={styles.aboutText}>{desc}</Text>
						))}

						{entry.files.map((file, index) => (
							<FileCard key={`file-${index}`} file={file} onClick={handleFilePress} />
						))}
					</View>
				</ScrollView>
			)}
			{selectedDocument && (
				<DocumentModal
					visible={documentVisible}
					onClose={handleFileOnClose}
					onAccept={handleFileOnAccept}
					document={selectedDocument}
					buttonText={`EMAIL TO ${email}`}
				/>
			)}
			{entry && shareEntry && (<BuyTransaction visible={buyTransaction} orderId={entry.id} share={shareEntry} onClose={handleBuyClose} />)}
			{entry && shareEntry && (<SellTransaction visible={sellTransaction} orderId={entry.id} share={shareEntry} onClose={handleSellClose} />)}
			<FloatingButton
				onBuyAction={() => setCreateBuy(true)}
				onSellAction={() => setCreateSell(true)}
				marketEntryId={entryId}
			/>
			<CreateBuyOrder onClose={() => setCreateBuy(false)} visible={createBuy} marketEntryId={entryId} />
			<CreateSellOrder onClose={() => setCreateSell(false)} visible={createSell} marketEntryId={entryId} />
		</View>
	);
}

const MarketEntryDetails = (props: MarketEntryDetailsProps) => {
	const navigation = useNavigation();
	return <MarketEntryDetailsView {...props} navigation={navigation}/>;
}
export default MarketEntryDetails