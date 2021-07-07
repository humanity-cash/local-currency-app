import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { WebView } from "react-native-webview";
import { useModalStatusBar, useUserDetails } from "src/hooks";
import { Button, CancelBtn, Header, Modal, ModalHeader, SettingsListItem } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { modalViewBase, viewDashboardBase } from "src/theme/elements";
import { IMap } from "src/utils/types";

const styles = StyleSheet.create({
  headerText: {
    color: colors.white,
    fontFamily: "IBMPlexSansSemiBold",
    fontSize: 16,
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.text,
    zIndex: 100,
    elevation: 10,
  },
  headerView: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
  },
  signOutView: {
    fontSize: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 10,
    color: colors.white,
  },
  signOutButton: {
    fontSize: 20,
    fontFamily: "IBMPlexSansSemiBold",
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 10,
    color: colors.white,
  },
  view: {
    marginTop: 5,
    backgroundColor: colors.white,
    padding: 0,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  header: {
    fontFamily: "IBMPlexSansBold",
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    lineHeight: 60,
    paddingLeft: 10,
    flex: 1,
    fontFamily: "IBMPlexSansSemiBold",
  },
  arrow: {
    marginVertical: 15,
  },
  modalWrap: {
    paddingHorizontal: 10,
    height: "100%",
    flex: 1,
  },
  modalHeader: {
    fontFamily: "IBMPlexSansSemiBold",
    fontSize: 20,
    marginBottom: 10,
  },
});

const views = {
  terms: {
    name: "terms",
    header: "Terms and Conditions",
  },
  privacy: {
    name: "privacy",
    header: "Privacy Policy",
  },
  banking: {
    name: "banking",
    header: "Liendhardt banking account Terms and Conditions",
  },
} as IMap;

export const SettingsTermsAndConditions = () => {
  const navigation = useNavigation();
  const { personalDetails } = useUserDetails();
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState({ name: "", header: "" });
  const { setUseHeader } = useModalStatusBar();

  const documents: { [index: string]: any } = useMemo(
    () => ({
      terms: (
        <WebView
          style={{ backgroundColor: "transparent" }}
          source={require("../../../assets/document.pdf")}
        />
      ),
      privacy: (
        <WebView
          style={{ backgroundColor: "transparent" }}
          source={require("../../../assets/document.pdf")}
        />
      ),
      banking: (
        <WebView
          style={{ backgroundColor: "transparent" }}
          source={require("../../../assets/document.pdf")}
        />
      ),
    }),
    []
  );

  const onModalPress = () => {
    setUseHeader(false);
    setVisible(false);
    setViewType({ name: "", header: "" });
  };

  const onShow = (type: string) => {
    setUseHeader(true);
    setVisible(true);
    setViewType(views[type]);
  };

  return (
    <View style={viewDashboardBase}>
      <Header
        placement="left"
        style={{ backgroundColor: colors.text }}
        barStyle="light-content"
        centerComponent={<Text style={styles.headerText}>Dashboard</Text>}
        leftComponent={
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View>
              <AntDesign
                style={{ paddingTop: 2 }}
                name="arrowleft"
                size={25}
                color={colors.white}
              />
            </View>
          </TouchableWithoutFeedback>
        }
      />
      <View style={{ flex: 1, padding: 10 }}>
        <View style={styles.headerView}>
          <Text h1 style={{ color: colors.white, marginBottom: 0 }}>
            Terms and conditions
          </Text>
        </View>
        <View>
          <SettingsListItem
            onPress={() => onShow("terms")}
            name="Terms and Conditions"
          />
          <SettingsListItem
            onPress={() => onShow("privacy")}
            name="Privacy Policy"
          />
          <SettingsListItem
            onPress={() => onShow("banking")}
            name="Liendhardt banking account..."
          />
        </View>
        {visible && (
          <Modal visible={visible}>
            <View style={{ ...modalViewBase, height: "100%" }}>
              <ModalHeader
                rightComponent={
                  <CancelBtn
                    onClick={() => {
                      setUseHeader(false);
                      setVisible(false);
                    }}
                  />
                }
              />
              <View style={styles.modalWrap}>
                <Text style={styles.modalHeader}>{viewType.header}</Text>
                {documents[viewType.name]}
              </View>
              <Button
                type="fluidDark"
                title={`SEND TO ${personalDetails.email}`}
                onPress={onModalPress}
              />
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

export default SettingsTermsAndConditions;
