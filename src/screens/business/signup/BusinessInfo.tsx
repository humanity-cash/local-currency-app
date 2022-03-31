import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, {
  createRef,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { AuthContext, UserContext } from "src/contexts";
import * as Routes from "src/navigation/constants";
import {
  BackBtn,
  BlockInput,
  Button,
  CancelBtn,
  Header,
  RadioBox
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  underlineHeaderB,
  viewBaseB,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { Industry } from "src/utils/types";
import MaskInput from "src/shared/uielements/MaskInput";

const Industries = [
  Industry.SHOPPING,
  Industry.FOOD_DRINK,
  Industry.ARTS_ENTERTAINMENT,
  Industry.HEALTH_WELLNESS,
  Industry.COMMUNITY_EDUCATION,
  Industry.SERVICES,
  Industry.FARMS,
  Industry.LODGING,
];

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    lineHeight: 32,
    color: colors.purple,
  },
  bodyText: {
    color: colors.bodyText,
  },
  labelView: {
    flexDirection: "row", 
    justifyContent: 'space-between'
  },
  label: {
    color: colors.bodyText,
    fontSize: 10
  },
  input: {
    color: colors.purple,
    backgroundColor: colors.white,
  },
  picker: {
    height: 55,
    justifyContent: "center",
    borderRadius: 3,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  pickerText: {
    color: colors.purple,
  },
  selectItem: {
    width: "100%",
    height: 55,
    backgroundColor: colors.white,
  },
  dropdownContainer: { marginTop: -22 },
  formView: {
    paddingBottom: 40,
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  switch: {
    borderColor: colors.purple,
  },
  switchText: {
    color: colors.purple,
  },
  toggleBg: {
    backgroundColor: colors.overlayPurple,
  },
});

const BusinessInfo = (): ReactElement => {
  const [goNext, setGoNext] = useState<boolean>(false);
  const [isEIN, setIsEIN] = useState<boolean>(true)

  const navigation = useNavigation();
  const { user, updateBusinessData } = useContext(UserContext);
  const { signOut } = useContext(AuthContext);
  const business = user?.business;

  const industryRef = createRef<SelectDropdown>();

  useEffect(() => {
    onValueChange("industry", Industries[0]);
  }, []);

  useEffect(() => {
    setGoNext(
      Boolean(business?.rbn) &&
        Boolean(business?.industry)
    );
  }, [business?.rbn, business?.industry, business?.ein]);

  const onValueChange = (name: string, change: string) => {
    updateBusinessData({
      [name]: change,
    });
  };

  const onPressEIN = () => {
    setIsEIN(true)
    updateBusinessData({
      ssn: ""
    })
  }

  const onPressSSN = () => {
    setIsEIN(false)
    updateBusinessData({
      ein: ""
    })
  }

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" && { behavior: "padding" })}
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
      <View style={wrappingContainerBase}>
        <View style={underlineHeaderB}>
          <Text style={styles.headerText}>
            {Translation.PROFILE.BUSINESS_INFORMATION}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.formView}>
            <Text style={styles.label}>
              {`${Translation.LABEL.REGISTERD_NAME}*`}
            </Text>
            <BlockInput
              name="rbn"
              placeholder="Registered business name"
              placeholderTextColor={colors.greyedPurple}
              value={business?.rbn}
              onChange={onValueChange}
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                industryRef.current?.openDropdown();
              }}
            />

            <Text style={styles.label}>{Translation.LABEL.INDUSTRY}*</Text>
            <View style={styles.picker}>
              <SelectDropdown
                ref={industryRef}
                data={Industries}
                defaultValueByIndex={0}
                onSelect={(selectedItem) => {
                  onValueChange("industry", selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  return item;
                }}
                buttonStyle={styles.selectItem}
                buttonTextStyle={styles.pickerText}
                rowStyle={styles.selectItem}
                dropdownStyle={styles.dropdownContainer}
                renderCustomizedRowChild={(item) => (
                  <Text style={styles.pickerText}>{item}</Text>
                )}
                renderDropdownIcon={() => (
                  <AntDesign name="down" size={18} color={colors.purple} />
                )}
              />
            </View>
            <View style={[styles.labelView, {marginTop: 10}]}>
              <Text style={styles.label}>{`${Translation.LABEL.EIN}`}</Text>
              <RadioBox
                selected={isEIN}
                onPress={onPressEIN}
              />
            </View>
            <MaskInput
              value={business?.ein}
              mask={[/\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              name="ein"
              placeholder="XX-XXXXXXX"
              placeholderTextColor={colors.greyedPurple}
              keyboardType="number-pad"
              onChange={onValueChange}
              style={styles.input}
              editable={isEIN}
            />
            <View style={styles.labelView}>
              <Text style={styles.label}>{`${Translation.LABEL.SSN}`}</Text>
              <RadioBox
                selected={!isEIN}
                onPress={onPressSSN}
              />
            </View>
            <MaskInput
              value={business?.ssn}
              mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
              name="ssn"
              placeholder="XXX-XX-XXXX"
              placeholderTextColor={colors.greyedPurple}
              keyboardType="number-pad"
              onChange={onValueChange}
              style={styles.input}
              editable={!isEIN}
            />
          </View>
        </ScrollView>
      </View>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type="purple"
          title={Translation.BUTTON.NEXT}
          disabled={!goNext}
          onPress={() => navigation.navigate(Routes.BUSINESS_ADDRESS)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default BusinessInfo;
