import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from 'src/auth';
import { BorderedInput, Button, Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from "src/constants";
import { UserAPI } from 'src/api';
import { showToast } from 'src/utils/common';
import { ToastType, LoadingScreenTypes } from 'src/utils/types';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { loadBusinessWallet } from 'src/store/wallet/wallet.actions';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  headerText: {
    paddingBottom: 10,
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
    color: colors.purple
	},
  container: {
    paddingBottom: 40
  },
  content: {
    marginTop: 10,
  },
  bodyView: {
    marginBottom: 30
  },
  bodyText: {
    color: colors.bodyText,
    fontSize: 16
  },
  text: {
    color: colors.bodyText, 
    fontSize: 12
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
    borderColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedAmountItem: {
    width: 100,
    height: 40,
    backgroundColor: colors.purple,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  amountText: {
    color: colors.purple
  },
  selectedAmountText: {
    color: colors.white
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
  input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
  bottomView: {
		padding: 20,
    paddingBottom: 45
	},
});

const MAX_AMOUNT = 2000;

const MerchantLoadup = (): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { businessDwollaId } = useContext(AuthContext);
  const [amount, setAmount] = useState<string>("");
  const [goNext, setGoNext] = useState<boolean>(false);

  useEffect(() => {
    setGoNext(Number(amount) > 0 && Number(amount) <= MAX_AMOUNT);
  }, [amount]);

  const onValueChange = (name: string, change: string) => {
    setAmount(change.replace(',', '.'));
  };

  const onLoadUp = async () => {
    if (!businessDwollaId) {
      showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
      return;
    }

    dispatch(updateLoadingStatus({
			isLoading: true,
			screen: LoadingScreenTypes.PAYMENT_PENDING
		}));
    const response = await UserAPI.deposit(
      businessDwollaId,
      {amount: amount}
    );
    
    if (response.data) {
      await dispatch(loadBusinessWallet(businessDwollaId));
      navigation.navigate(Routes.MERCHANT_LOADUP_SUCCESS);
    } else {
      showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
      navigation.navigate(Routes.MERCHANT_DASHBOARD);
    }
    dispatch(updateLoadingStatus({
			isLoading: false,
			screen: LoadingScreenTypes.PAYMENT_PENDING
		}));
  }

  return (
    <View style={viewBaseB}>
      <Header
        rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.CLOSE} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)}/>}
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={styles.container}>
          <View style={underlineHeaderB}>
            <Text style={styles.headerText}>{Translation.LOAD_UP.TITLE}</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.bodyView}>
              <Text style={styles.bodyText}>{Translation.LOAD_UP.LOAD_UP_DETAIL}</Text>
            </View>

            <Text style={styles.text}>{Translation.LABEL.AMOUNT}</Text>
            <View style={styles.defaultAmountView}>
              <TouchableOpacity 
                style={amount=='50' ? styles.selectedAmountItem : styles.defaultAmountItem} 
                onPress={()=>onValueChange('amount', "50")}
              >
                <Text style={amount=='50' ? styles.selectedAmountText : styles.amountText}>B$ 50</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={amount=='100' ? styles.selectedAmountItem : styles.defaultAmountItem}  
                onPress={()=>onValueChange('amount', "100")}
              >
                <Text style={amount=='100' ? styles.selectedAmountText : styles.amountText}>B$ 100</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={amount=='200' ? styles.selectedAmountItem : styles.defaultAmountItem} 
                onPress={()=>onValueChange('amount', "200")}
              >
                <Text style={amount=='200' ? styles.selectedAmountText : styles.amountText}>B$ 200</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.maxBView}>
              <Text style={styles.text}>{Translation.LABEL.AMOUNT}</Text>
              <Text style={styles.text}>{Translation.LABEL.MAX_LOADUP_BERKSHARES}</Text>
            </View>
            <BorderedInput
              label="Amount"
              name="amount"
              keyboardType="decimal-pad"
              placeholder="Amount"
              placeholderTextColor={colors.greyedPurple}
              prefix="B$"
              style={styles.input}
						  textStyle={styles.amountText}
              value={amount}
              onChange={onValueChange}
            />

            <View style={styles.totalView}>
              <Text h2 style={styles.amountText}>{Translation.LOAD_UP.TOTAL_COSTS}</Text>
              <Text h2 style={styles.amountText}>$ {amount==="" ? "-" : amount}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.bottomView}>
          <Button
            type={BUTTON_TYPES.PURPLE}
            title={Translation.BUTTON.LOAD_UP}
            disabled={!goNext}
            onPress={onLoadUp}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MerchantLoadup;
