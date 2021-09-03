import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { usePaymentDetails } from "src/hooks";
import { BackBtn, BorderedInput, Button, Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { IMap } from "src/utils/types";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

interface MerchantLoadupState extends IMap {
  amount: string;
  costs: string;
}

type MerchantLoadupProps = {
  navigation?: any;
  route?: any;
};

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

const MerchantLoadupView = (props: MerchantLoadupProps) => {
  const { update } = usePaymentDetails();
  const [state, setState] = useState<MerchantLoadupState>({
    amount: "",
    costs: ""
  });
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    setGoNext(Object.keys(state).every((key) => state[key] !== ""));
  }, [state]);

  const onValueChange = (name: string, change: string) => {
    const costs = change;
    setState({
      ...state,
      [name]: change,
      costs: costs,
    } as MerchantLoadupState);
    update({ [name]: change });
  };

  return (
    <View style={viewBaseB}>
      <Header
        leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
        rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.CLOSE} onClick={() => props.navigation.navigate(Routes.MERCHANT_DASHBOARD)}/>}
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
                style={state.amount=='50' ? styles.selectedAmountItem : styles.defaultAmountItem} 
                onPress={()=>onValueChange('amount', "50")}
              >
                <Text style={state.amount=='50' ? styles.selectedAmountText : styles.amountText}>B$ 50</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={state.amount=='100' ? styles.selectedAmountItem : styles.defaultAmountItem}  
                onPress={()=>onValueChange('amount', "100")}
              >
                <Text style={state.amount=='100' ? styles.selectedAmountText : styles.amountText}>B$ 100</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={state.amount=='200' ? styles.selectedAmountItem : styles.defaultAmountItem} 
                onPress={()=>onValueChange('amount', "200")}
              >
                <Text style={state.amount=='200' ? styles.selectedAmountText : styles.amountText}>B$ 200</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.maxBView}>
              <Text style={styles.text}>{Translation.LABEL.AMOUNT}</Text>
              <Text style={styles.text}>{Translation.LABEL.MAX_BERKSHARES}</Text>
            </View>
            <BorderedInput
              label="Amount"
              name="amount"
              keyboardType="number-pad"
              placeholder="Amount"
              placeholderTextColor={colors.greyedPurple}
              prefix="B$"
              style={styles.input}
						  textStyle={styles.amountText}
              value={state.amount}
              onChange={onValueChange}
            />

            <View style={styles.totalView}>
              <Text h2 style={styles.amountText}>{Translation.LOAD_UP.TOTAL_COSTS}</Text>
              <Text h2 style={styles.amountText}>$ {state.amount==="" ? "-" : state.costs}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.bottomView}>
          <Button
            type="purple"
            title={Translation.BUTTON.LOAD_UP}
            disabled={!goNext}
            onPress={() => {
              if (parseFloat(state.amount) > 2000) {
                return;
              }
              props.navigation.navigate(Routes.MERCHANT_LOADUP_PENDING);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const MerchantLoadup = (props: MerchantLoadupProps): ReactElement => {
  const navigation = useNavigation();
  return <MerchantLoadupView {...props} navigation={navigation} />;
};
export default MerchantLoadup;