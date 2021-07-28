import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform, ScrollView, StyleSheet, View
} from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { usePaymentDetails } from "src/hooks";
import { BackBtn, BorderedInput, Button, Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
    underlineHeader,
    viewBase,
    wrappingContainerBase
} from "src/theme/elements";
import { IMap } from "src/utils/types";

interface TopUpState extends IMap {
  amount: string;
}

type TopUpProps = {
  navigation?: any;
  route?: any;
};

const styles = StyleSheet.create({
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

const TopUpView = (props: TopUpProps) => {
  const { update } = usePaymentDetails();
  const [state, setState] = useState<TopUpState>({
    amount: "1000",
    costs: "1000"
  });
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    update({ amount: state.amount });
  }, []);

  useEffect(() => {
    setGoNext(Object.keys(state).every((key) => state[key] !== ""));
  }, [state]);

  const onValueChange = (name: any, change: any) => {
    const costs = change;
    setState({
      ...state,
      [name]: change,
      costs: costs,
    } as any);
    update({ [name]: change });
  };

  return (
    <View style={viewBase}>
      <Header
        leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
        rightComponent={
          <CancelBtn
            text="Close"
            onClick={() =>
              props.navigation.navigate("Dashboard")
            }
          />
        }
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={{ paddingBottom: 40 }}>
          <View style={underlineHeader}>
            <Text style={styles.headerText}>Top Up B$</Text>
          </View>
          <View style={styles.view}>
            <Text>Specify the amount of BerkShares </Text>
            <Text>(B$1 = USD$1) you would like to top up.</Text>

            <Text style={{ ...styles.text, marginTop: 30 }}>AMOUNT</Text>
            <View style={styles.defaultAmountView}>
              <TouchableOpacity 
                style={state.amount=='50' ? styles.selectedAmountItem : styles.defaultAmountItem} 
                onPress={()=>onValueChange('amount', "50")}
              >
                <Text>B$ 50</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={state.amount=='100' ? styles.selectedAmountItem : styles.defaultAmountItem}  
                onPress={()=>onValueChange('amount', "100")}
              >
                <Text>B$ 100</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={state.amount=='200' ? styles.selectedAmountItem : styles.defaultAmountItem} 
                onPress={()=>onValueChange('amount', "200")}
              >
                <Text>B$ 200</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.maxBView}>
              <Text style={styles.text}>AMOUNT</Text>
              <Text style={styles.text}>MAX. B$ 2.000</Text>
            </View>
            <BorderedInput
              label="Amount"
              name="amount"
              keyboardType="number-pad"
              placeholder="Amount"
              prefix="B$"
              value={state.amount}
              onChange={onValueChange}
            />

            <View style={styles.totalView}>
              <Text h2 style={{color: colors.text}}>Total costs</Text>
              <Text h2 style={{color: colors.text}}>USD$ {state.amount==="" ? "-" : state.costs}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.bottomView}>
          <Button
            type="darkGreen"
            title="Top Up"
            disabled={!goNext}
            onPress={() => {
              if (parseFloat(state.amount) > 2000) {
                return;
              }
              props.navigation.navigate("TopUpSuccess");
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const TopUp = (props: TopUpProps) => {
  const navigation = useNavigation();
  return <TopUpView {...props} navigation={navigation} />;
};
export default TopUp;
