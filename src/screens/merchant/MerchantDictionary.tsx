import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { Modal, ModalHeader, Header, CancelBtn, BackBtn } from "src/shared/uielements";
import { underlineHeader, viewBase, wrappingContainerBase, modalViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import list from "src/mocks/merchants";
import { MerchantCategory, MerchantEntry } from "src/utils/types";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

type CategoryViewProps = {
	category: MerchantCategory,
	onSelect: (item: MerchantEntry) => void
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	underlineView: {
		marginTop: 20,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.lightGreen
	},
	content: {
		paddingBottom: 40
	},
	categoryText: {
		fontSize: 10,
		fontWeight: 'bold'
	},
	popularMerchantView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 20,
		paddingBottom: 20
	},
	popularTextView: {
		width: '60%',
		fontSize: 16
	},
	popularTitle: {
		fontSize: 18,
		lineHeight: 18, 
		fontWeight: 'bold',
	},
	popularText: {
		paddingTop: 10,
		fontSize: 16,
		lineHeight: 20
	},
	popularImage: {
		width: 110,
		height: 150,
		borderRadius: 5,
	},
	image: {
		width: 96,
		height: 132,
		borderRadius: 5,
	},
	merchantsView: {
		flexDirection: 'row',
		overflow: 'scroll'
	},
	merchantItem: {
		width: 105,
		alignItems: 'center',
	},
	text: {
		fontSize: 10,
		textAlign: 'center'
	},
	modalWrap: {
		paddingHorizontal: 10,
		marginBottom: 10
	},
	modalHeader: {
		fontSize: 26,
		lineHeight: 45,
		marginBottom: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.darkGreen
	},
	feedView: {
		backgroundColor: colors.lightGreen1,
		padding: 20,
	},
	feedImage: {
		alignItems: "center",
		width: '100%',
		height: 203,
		borderRadius: 5,
		marginTop: 20,
		marginBottom: 20
	},
	rightText: {
		fontSize: 14,
		textAlign: 'right',
		alignSelf: 'stretch',
	}
});

const CategoryView = (props: CategoryViewProps) => {
	const data: MerchantCategory = props.category;

	return (
		<View>
			<View style={ styles.underlineView }>
				<Text style={styles.categoryText}>{ data.name }</Text>
			</View>
			<ScrollView horizontal={true} style={ styles.merchantsView }>
				{
					data.merchants.map((item: MerchantEntry, idx: number) => (
						<TouchableOpacity style={styles.merchantItem} key={idx} onPress={() => props.onSelect(item)}>
							<Image
								source={require('../../../assets/images/feed1.png')}
								containerStyle={styles.image}
							/>
							<Text style={styles.text}>{ item.title }</Text>
						</TouchableOpacity>
					))
				}
			</ScrollView>
		</View>
	)
}

const MerchantDictionary = (): JSX.Element => {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [selected, setSelected] = useState<MerchantEntry>({
		title: "",
		description: "",
		image: "",
		addressLine1: "",
		addressLine2: "",
		phone: ""
	});
	const merchantList: MerchantCategory[] = list;

	const handleSelect = (item: MerchantEntry) => {
		setSelected(item);
		setIsVisible(true);
	}

	const handleDeSelect = () => {
		setSelected({
			title: "",
			description: "",
			image: "",
			addressLine1: "",
			addressLine2: "",
			phone: ""
		});
		setIsVisible(false);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn text="Home" onClick={() => navigation.goBack()} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>Where to spend</Text>
				</View>
				<ScrollView>
					<View style={styles.content}>
						<View style={ styles.underlineView }>
							<Text style={styles.categoryText}>MERCHANT OF THE MONTH</Text>
						</View>
						<View style={styles.popularMerchantView}>
							<View style={styles.popularTextView}>
								<Text style={styles.popularTitle}>{merchantList[0].merchants[0].title}</Text>
								<Text style={styles.popularText}>{merchantList[0].merchants[0].description}</Text>
							</View>
							<Image
								source={require('../../../assets/images/feed1.png')}
								containerStyle={styles.popularImage}
							/>
						</View>
						{
							merchantList.map((category: MerchantCategory, idx: number) => (
								<CategoryView category={category} onSelect={handleSelect} key={idx} />
							))
						}
					</View>
				</ScrollView>
			</View>
			{isVisible && (
				<Modal visible={isVisible}>
					<View style={ modalViewBase }>
						<ModalHeader
							rightComponent={<CancelBtn text="Close" onClick={handleDeSelect} />}
						/>
						<ScrollView style={styles.modalWrap}>
							<Text style={styles.modalHeader}>{selected.title}</Text>
							<View style={styles.feedView}>
								<Text h2>{selected.title}</Text>
								<Text style={styles.popularText}>{selected.description}</Text>
								<Image
									source={require('../../../assets/images/feed1.png')}
									containerStyle={styles.feedImage}
								/>
								<Text style={styles.rightText}>{selected.addressLine1}</Text>
								<Text style={styles.rightText}>{selected.addressLine2}</Text>
								<Text style={styles.rightText}>{selected.phone}</Text>
							</View>
						</ScrollView>
					</View>
				</Modal>
			)}
		</View>
	);
}

export default MerchantDictionary