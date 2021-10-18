import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import { AuthContext } from "src/auth";
import { Header, BlockInput, Button, BackBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, underlineHeaderB } from "src/theme/elements";
import { IMap } from "src/utils/types";
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';
import { isPasswordValid } from 'src/utils/validation';
import { showToast } from 'src/utils/common';
import { ToastType } from 'src/utils/types';
import { LoadingScreenTypes } from 'src/utils/types';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { useDispatch } from 'react-redux';

interface SecurityProps extends IMap {
	password: string;
	newPassword: string;
	newPassowrdConfirm: string;
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		color: colors.purple,
		lineHeight: 40
	},
	content: {
		flex: 1, 
		paddingHorizontal: 10,
		paddingBottom: 40
	},
	view: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 80,
		backgroundColor: colors.white,
		flexDirection: 'row',
		paddingHorizontal: 20,
		marginTop: 10,
		borderRadius: 3
	},
	text: {
		fontSize: 16,
		color: colors.purple
	},
	label : {
		fontSize: 10,
		color: colors.bodyText
	},
	inlineView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	errorText: {
		color: colors.mistakeRed,
		fontSize: 10,
	},
	input: {
		color: colors.purple,
		backgroundColor: colors.white
	},
	bottomView: {
		marginBottom: 40,
		marginHorizontal: 20
	},
	saveButton: {
		fontFamily: 'GothamBold',
		color: colors.darkRed
	}
});

export const MerchantSettingsSecurity = (): JSX.Element => {
	const navigation = useNavigation();
	const {authorization, updateAuthorization} = useUserDetails();
	const { changePassword } = useContext(AuthContext);
	const dispatch = useDispatch();
	const [isTouchId, setIsTouchId] = useState<boolean>(true);
	const [isCashierView, setIsCashierView] = useState<boolean>(true);
	const [canSave, setCanSave] = useState<boolean>(false);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
	const [state, setState] = useState<SecurityProps>({
		password: "",
		newPassword: "",
		newPassowrdConfirm: ""
	});

	useEffect(() => {
		setIsTouchId(authorization.touchID);
		setIsCashierView(authorization.cashierView);
	}, [authorization]);

	useEffect(() => {
		setIsValidPassword(state.newPassword === state.newPassowrdConfirm);
	}, [state.newPassowrdConfirm, state.newPassword]);

	useEffect(() => {
		setCanSave(
			Object.keys(state).every((key) => state[key] !== "") && 
			state.newPassword === state.newPassowrdConfirm && 
			isPasswordValid(state.newPassword) && 
			isPasswordValid(state.password)
		);
	}, [state]);

	const onTouchIdOption = (value: boolean) => {
		updateAuthorization({ touchID: value });
	}

	const onCashierViewOption = (value: boolean) => {
		updateAuthorization({ cashierView: value });
	}

	const onValueChange = (name: string, value: string) => {
		setState({
			...state,
			[name]: value
		});
	}

	const handleSave = async () => {
		dispatch(updateLoadingStatus({
			isLoading: true,
			screen: LoadingScreenTypes.LOADING_DATA
		}));
		const response = await changePassword({
			oldPassword: state.password, 
			newPassword: state.newPassword
		});
		dispatch(updateLoadingStatus({
			isLoading: false,
			screen: LoadingScreenTypes.LOADING_DATA
		}));
		
		if (!response?.success) {
			showToast(ToastType.ERROR, 'FAILED', Translation.OTHER.CHANGE_PASSWORD_FAILED);
			return;
		}
		showToast(ToastType.SUCCESS, 'SUCCESS', Translation.OTHER.CHANGE_PASSWORD_SUCCESS);
		navigation.goBack();
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} color={colors.purple} />}
			/>
			<ScrollView style={styles.content}>
				<View style={ underlineHeaderB }>
					<Text style={styles.headerText}>{Translation.COMMUNITY_CHEST.SECURITY}</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.text}>{Translation.COMMUNITY_CHEST.ALLOW_TOUCH}</Text>
					<Switch
						trackColor={{ false: colors.green, true: colors.green }}
						thumbColor={colors.white}
						ios_backgroundColor={colors.white}
						onValueChange={onTouchIdOption}
						value={isTouchId}
					/>
				</View>
				<View style={styles.view}>
					<Text style={styles.text}>{Translation.OTHER.ENABLE_CASHIER_VIEW}</Text>
					<Switch
						trackColor={{ false: colors.green, true: colors.green }}
						thumbColor={colors.white}
						ios_backgroundColor={colors.white}
						onValueChange={onCashierViewOption}
						value={isCashierView}
					/>
				</View>

				<View style={ underlineHeaderB }></View>
				<View>
					<Text style={styles.label}>{Translation.LABEL.OLD_PASSWORD}</Text>
					<BlockInput
						name="password"
						placeholder="password"
						value={state.password}
						secureTextEntry={true}
						style={styles.input}
						onChange={onValueChange}
					/>

					<Text style={styles.label}>{Translation.LABEL.NEW_PASSWORD}</Text>
					<Text style={styles.label}>({Translation.LABEL.PASSWORD_REG})</Text>
					<BlockInput
						name="newPassword"
						placeholder="new password"
						value={state.newPassword}
						secureTextEntry={true}
						style={styles.input}
						onChange={onValueChange}
					/>

					<View style={styles.inlineView}>
						<Text style={styles.label}>{Translation.LABEL.CONFIRM_NEW_PASSWORD}</Text>
						{!isValidPassword && (
							<Text style={styles.errorText}>REPEAT NEW PASSWORD</Text>
						)}
					</View>
					<BlockInput
						name="newPassowrdConfirm"
						placeholder="new password confirm"
						value={state.newPassowrdConfirm}
						secureTextEntry={true}
						style={styles.input}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<View style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.PURPLE}
					title={Translation.BUTTON.SAVE_CHANGE}
					disabled={!canSave}
					onPress={handleSave}
				/>
			</View>
		</View>
	);
}

export default MerchantSettingsSecurity;