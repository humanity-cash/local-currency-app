import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from "react-native-elements";
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBaseB, wrappingContainerBase, dialogViewBase } from "src/theme/elements";
import { Button, CancelBtn, Dialog} from "src/shared/uielements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type CashierDashboardProps = {
	navigation?: any;
	route?: any;
};

const styles = StyleSheet.create({
	container: {
        marginVertical: 80
    },
    itemView: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 3,
        padding: 20,
        marginVertical: 5
    },
    receiveBtn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18
    },
    image: {
        width: 45,
        height: 45,
        marginBottom: 20
    },
    text: {
        fontSize: 16,
        color: colors.purple
    },
    icon: {
        marginTop: 4,
        marginRight: 10
    },
    bottomBtn: {
        marginBottom: 45
    },
    dialogBg: {
		backgroundColor: colors.overlayPurple
	},
    headerText: {
		fontSize: 32,
		lineHeight: 35,
		color: colors.purple
	},
    detailText: {
		fontSize: 16,
		color: colors.bodyText
	},
});

const CashierDashboardView = (props: CashierDashboardProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const onLogout = () => {
        setIsVisible(true);
    }

    const onCancel = () => {
        setIsVisible(false);
    }

    const onConfirm = () => {
        setIsVisible(false);
        props.navigation.navigate(Routes.TEASER);
    }

	return (
		<View style={viewBaseB}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.LOGOUT} color={colors.purple} onClick={onLogout} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={styles.container}>
					<TouchableOpacity style={styles.itemView} onPress={()=>props.navigation.navigate(Routes.CASHIER_REQUEST)}>
                        <View style={styles.receiveBtn}>
                            <Image
                                source={require("../../../assets/images/coin.png")}
                                style={styles.image}
                            />
                            <Text style={styles.text}>Receive payment</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemView} onPress={()=>props.navigation.navigate(Routes.CASHIER_TRANSACTIONS)}>
                        <Feather name="server" size={20} color={colors.purple} style={styles.icon} />
                        <Text style={styles.text}>Transactions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemView}>
                        <Feather name="rotate-ccw" size={20} color={colors.purple} style={styles.icon} />
                        <Text style={styles.text}>Make a return</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemView} onPress={()=>props.navigation.navigate(Routes.REPORT)}>
                        <AntDesign name="profile" size={20} color={colors.purple} style={styles.icon} />
                        <Text style={styles.text}>Make a report</Text>
                    </TouchableOpacity>
				</View>
			</ScrollView>
			<Button
				type="transparent"
				title={Translation.BUTTON.NEED_HELP}
                textStyle={styles.text}
                style={styles.bottomBtn}
				onPress={()=>props.navigation.navigate(Routes.CASHIER_HELP)}
			/>

            {isVisible && 
            <Dialog visible={isVisible} onClose={()=>onCancel()} backgroundStyle={styles.dialogBg}>
                <View style={dialogViewBase}>
                    <View style={wrappingContainerBase}>
                        <View style={ baseHeader }>
                            <Text style={styles.headerText}>{Translation.CASHIER.LOGOUT_CONFIRM}</Text>
                        </View>
                        <Text style={styles.detailText}>{Translation.CASHIER.LOGOUT_CONFIRM_DETAIL}</Text>
                    </View>
                    <View>
                        <Button
                            type="transparent"
                            title={Translation.BUTTON.LOGOUT}
                            textStyle={styles.text}
                            onPress={()=>props.navigation.navigate(Routes.TEASER)}
                        />
                        <Button
                            type="purple"
                            title={Translation.BUTTON.TAKE_ME_BACK}
                            onPress={()=>onConfirm()}
                        />
                    </View>
                </View>
            </Dialog>}
		</View>
	);
}

const CashierDashboard = (props: CashierDashboardProps): ReactElement => {
	const navigation = useNavigation();
	return <CashierDashboardView {...props} navigation={navigation} />;
};
export default CashierDashboard