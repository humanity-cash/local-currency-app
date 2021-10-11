import React, { useEffect, useState } from 'react';
import { ImageRequireSource, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { CancelBtn, ModalHeader } from "./header";
import Modal from "./Modal";

type SelectModalProps = {
	name: string,
	onChange: (name: string, value: string) => void,
	modalHeader?: string,
	modalDescription?: string,
	modalMainOption?: SelectionProps,
	modalListLabel?: string,
	modalList?: SelectionProps[],
	value: string,
	style?: any
}

export type SelectionProps = {
	value: string,
	name: string,
	fullName?: string,
	icon?: ImageRequireSource,
	initialParams?: any
}

const styles = StyleSheet.create({
	modalHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingBottom: 10
	},
	modalDescription: {
		paddingBottom: 10
	},
	modalMainItemView: {
		flexDirection: "row",
		paddingVertical: 15,
		marginVertical: 10
	},
	modalItemView: {
		flexDirection: "row",
		paddingVertical: 5,
		marginVertical: 5
	},
	flagImage: {
		width: 27,
		height: 23,
		marginRight: 10
	},
	flagNoImage: {
		backgroundColor: colors.text,
		width: 27,
		height: 23,
		marginRight: 10
	}
});

const SelectModal = ({
	name,
	onChange,
	modalHeader,
	modalDescription,
	modalListLabel,
	modalMainOption,
	modalList,
	value,
	style
}: SelectModalProps) => {
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState<SelectionProps>({ name: '', value: '' });

	useEffect(() => {
		if (modalMainOption && modalMainOption.value === value) {
			setSelected(modalMainOption);
			return;
		}
		const option = modalList?.find(item => item.value === value);
		if (option) {
			setSelected(option);
			return;
		}
		setSelected({ name: '', value: '' });
	}, [value]);

	const onOptionSelect = (item: SelectionProps) => {
		onChange(name, item.value);
		setVisible(false);
	};

	return (
		<View>
			<TouchableOpacity onPress={() => setVisible(true)}>
				<View style={{
					flexDirection: "row",
					backgroundColor: colors.white,
					borderColor: colors.white,
					borderWidth: 0,
					borderRadius: 2,
					marginVertical: 8,
					paddingLeft: 10,
					alignItems: "center",
					...style
				}}>
					{selected?.icon && (<Image source={selected?.icon} containerStyle={styles.flagImage} />)}
					{!selected.icon && (<Image source={{}} containerStyle={styles.flagNoImage} />)}
					<Text style={{
						color: colors.text,
						fontSize: 16,
						lineHeight: 60,
						height: 60,
						justifyContent: "center",
						paddingHorizontal: 5,
						textAlignVertical: "center",
					}}>
						{selected.name}
					</Text>
				</View>
			</TouchableOpacity>

			{visible && (
				<Modal visible={visible} style={{backgroundColor: colors.white }}>
					<View>
						<ModalHeader
							rightComponent={<CancelBtn onClick={() => setVisible(false)} />}
						/>
						<ScrollView style={{ padding: 10, height: '100%' }}>
							{modalHeader && (<Text h2 style={styles.modalHeader}>{modalHeader}</Text>)}
							{modalDescription && (<Text style={styles.modalDescription}>{modalDescription}</Text>)}
							{modalMainOption && (
								<TouchableOpacity
									onPress={() => modalMainOption && onOptionSelect(modalMainOption)}
								>
									<View style={styles.modalMainItemView}>
										{modalMainOption?.icon && (<Image source={modalMainOption?.icon} containerStyle={styles.flagImage} />)}
										{!modalMainOption.icon && (<Image source={{ }} containerStyle={styles.flagNoImage} />)}
										<Text>
											{
												modalMainOption.fullName ?
												modalMainOption.fullName :
												modalMainOption.name
											}
										</Text>
									</View>
								</TouchableOpacity>
							)}
							{modalListLabel && (<Text h3>{modalListLabel}</Text>)}
							{modalList && (
								modalList.map((item, i) => (
									<TouchableOpacity key={i} onPress={() => onOptionSelect(item)}>
										<View style={styles.modalItemView}>
											<Image source={{}} containerStyle={styles.flagNoImage} />
											<Text>{item.fullName ? item.fullName : item.name}</Text>
										</View>
									</TouchableOpacity>
								))
							)}
						</ScrollView>
					</View>
				</Modal>
			)}
		</View>
	);
};

export default SelectModal;