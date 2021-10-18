import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from 'react-redux';
import {
    KeyboardAvoidingView,
    Platform, ScrollView,
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native";
import { Text } from "react-native-elements";
import { useLoadingModal } from "src/hooks";
import { AuthContext } from 'src/auth';
import { BackBtn, BorderedInput, Button, Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
    underlineHeader,
    viewBase,
    wrappingContainerBase
} from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import { UserAPI } from 'src/api';
import { showToast } from 'src/utils/common';
import { ToastType, LoadingScreenTypes } from 'src/utils/types';
import { loadPersonalWallet } from 'src/store/wallet/wallet.actions';

const styles = StyleSheet.create({
  container: { 
    paddingBottom: 40 
  },
  headerText: {
    paddingBottom: 10,
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
  view: {
    marginTop: 10,
  },
  text: {
    color: colors.text, 
    fontSize: 12
  },
  amountText: {
    marginTop: 30
  },
  defaultAmountView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
  },
  defaultAmountItem: {
    width: 100,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedAmountItem: {
    width: 100,
    height: 40,
    backgroundColor: colors.lightGreen,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  maxBView: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 15
  },
  totalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    padding: 10
  },
  bottomView: {
		padding: 20,
    paddingBottom: 45
	},
});

const MAX_AMOUNT = 2000;
const MIN_AMOUNT = 1;

const LoadUp = (): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { customerDwollaId } = useContext(AuthContext);
  const { updateLoadingStatus } = useLoadingModal();
  const [amount, setAmount] = useState<string>("");
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    setGoNext(Number(amount) >= MIN_AMOUNT && Number(amount) <= MAX_AMOUNT);
  }, [amount]);

  const onValueChange = (name: string, change: string) => {
    setAmount(change);
  };

  const onLoadUp = async () => {
    if (!customerDwollaId) {
      showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
      return;
    }

    updateLoadingStatus({
      isLoading: true,
      screen: LoadingScreenTypes.PAYMENT_PENDING
    });
    const response = await UserAPI.deposit(
      customerDwollaId,
      {amount: amount}
    );

    if (response.data) {
      await dispatch(loadPersonalWallet(customerDwollaId));
      updateLoadingStatus({
        isLoading: false,
        screen: LoadingScreenTypes.PAYMENT_PENDING
      });
      navigation.navigate(Routes.LOADUP_SUCCESS);
    } else {
      updateLoadingStatus({
        isLoading: false,
        screen: LoadingScreenTypes.PAYMENT_PENDING
      });
      showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
      navigation.navigate(Routes.DASHBOARD);
    }
  }

  return (
    <View style={viewBase}>
      <Header
        leftComponent={<BackBtn text="Home" onClick={() => navigation.goBack()} />}
        rightComponent={
          <CancelBtn
            text={Translation.BUTTON.CLOSE}
            onClick={() =>
              navigation.navigate(Routes.DASHBOARD)
            }
          />
        }
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={styles.container}>
          <View style={underlineHeader}>
            <Text style={styles.headerText}>{Translation.BUTTON.LOAD_UP}</Text>
          </View>
          <View style={styles.view}>
            <Text>{Translation.LOAD_UP.LOAD_UP_DETAIL}</Text>

            <Text style={{...styles.text, ...styles.amountText}}>{Translation.LABEL.AMOUNT}</Text>
            <View style={styles.defaultAmountView}>
              <TouchableOpacity 
                style={amount=='50' ? styles.selectedAmountItem : styles.defaultAmountItem} 
                onPress={()=>onValueChange('amount', "50")}
              >
                <Text>B$ 50</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={amount=='100' ? styles.selectedAmountItem : styles.defaultAmountItem}  
                onPress={()=>onValueChange('amount', "100")}
              >
                <Text>B$ 100</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={amount=='200' ? styles.selectedAmountItem : styles.defaultAmountItem} 
                onPress={()=>onValueChange('amount', "200")}
              >
                <Text>B$ 200</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.maxBView}>
              <Text style={styles.text}>{Translation.LABEL.AMOUNT}</Text>
              <Text style={styles.text}>MAX. B$ 2.000</Text>
            </View>
            <BorderedInput
              label="Amount"
              name="amount"
              keyboardType="number-pad"
              placeholder="Amount"
              prefix="B$"
              value={amount}
              onChange={onValueChange}
            />

            <View style={styles.totalView}>
              <Text h2 style={{color: colors.text}}>{Translation.LOAD_UP.TOTAL_COSTS}</Text>
              <Text h2 style={{color: colors.text}}>{Translation.COMMON.USD} {amount==="" ? "-" : amount}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.bottomView}>
          <Button
            type={BUTTON_TYPES.DARK_GREEN}
            title={Translation.BUTTON.LOAD_UP}
            disabled={!goNext}
            onPress={onLoadUp}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoadUp;
