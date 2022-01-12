import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useContext, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { Text } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { AuthContext, UserContext } from "src/contexts";
import * as Routes from "src/navigation/constants";
import { BackBtn, Button, CancelBtn, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  underlineHeaderB,
  viewBaseB,
  wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { BusinessType } from "src/utils/types";

const businessTypes = [
  BusinessType.SOLE_PROPRIETORSHIP,
  BusinessType.CORPORATION,
  BusinessType.LLC,
  BusinessType.PARTNERSHIP,
  BusinessType.NON_PROFIT
];

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    lineHeight: 32,
    color: colors.purple
  },
  bodyView: {
    paddingTop: 50,
    paddingHorizontal: 17
  },
  bodyText: {
    color: colors.bodyText
  },
  label: {
    marginTop: 30,
    color: colors.bodyText,
    fontSize: 10
  },
  dropdownView: {
    height: 55,
    justifyContent: "center",
    borderRadius: 3,
    color: colors.purple,
    backgroundColor: colors.white
  },
  pickerText: {
    color: colors.purple,
    textAlign: "center"
  },
  selectItem: {
    width: "100%",
    height: 55,
    backgroundColor: colors.white
  },
  dropdownContainer: { marginTop: -22 },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20
  }
});

const BusinessDetail = (): ReactElement => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const { user, updateBusinessData } = useContext(UserContext);
  const business = user?.business;

  useEffect(() => {
    updateBusinessData({ type: businessTypes[0] });
  }, []);

  const onValueChange = (name: string, change: string) => {
    updateBusinessData({
      [name]: change
    });
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' && { behavior: 'padding' })}
      style={viewBaseB}
    >
      <Header
        leftComponent={
          <BackBtn color={colors.purple} onClick={() => navigation.goBack()} />
        }
        rightComponent={
          <CancelBtn
            color={colors.purple}
            text={Translation.BUTTON.LOGOUT}
            onClick={signOut}
          />
        }
      />
      <ScrollView style={wrappingContainerBase}>
        <View style={underlineHeaderB}>
          <Text style={styles.headerText}>
            {Translation.PROFILE.BUSINESS_DETAIL}
          </Text>
        </View>
        <Text style={styles.bodyText}>
          {Translation.PROFILE.USE_BUSINESS_INFOMATION}
        </Text>

        <Text style={styles.label}>{Translation.LABEL.BUSINESS_TYPE}</Text>
        <View style={styles.dropdownView}>
          <SelectDropdown
            data={businessTypes}
            defaultValue={business ? business.type : businessTypes[0]}
            onSelect={selectedItem => {
              onValueChange("type", selectedItem);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem;
            }}
            rowTextForSelection={item => {
              return item;
            }}
            buttonStyle={styles.selectItem}
            buttonTextStyle={styles.pickerText}
            rowStyle={styles.selectItem}
            dropdownStyle={styles.dropdownContainer}
            renderCustomizedRowChild={item => (
              <Text style={styles.pickerText}>{item}</Text>
            )}
            renderDropdownIcon={() => (
              <AntDesign name="down" size={18} color={colors.purple} />
            )}
            rowTextStyle={{ textAlign: "center" }}
          />
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type="purple"
          disabled={!business?.type}
          title={Translation.BUTTON.NEXT}
          onPress={() => navigation.navigate(Routes.BUSINESS_OWNER_DETAIL)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default BusinessDetail;
