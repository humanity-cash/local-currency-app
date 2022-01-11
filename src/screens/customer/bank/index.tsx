import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView
} from "react-native";
import { WebView } from "react-native-webview";
import { DwollaAPI } from "src/api";
import { UserContext } from "src/contexts";
import { NavigationViewContext, ViewState } from "src/contexts/navigation";
import * as Routes from "src/navigation/constants";
import { CancelBtn, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseWhite, wrappingContainerBase } from "src/theme/elements";

export const WEBVIEW_SCREEN = Dimensions.get("screen").height - 150;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    lineHeight: 32
  },
  bankView: {
    flex: 1,
    height: WEBVIEW_SCREEN,
    paddingBottom: 10
  },
  bottomView: {
    marginBottom: 20
  }
});

const SelectBank = (): JSX.Element => {
  const navigation = useNavigation();
  const { customerDwollaId } = useContext(UserContext);
  const [iavToken, setIAVToken] = useState<string>("");
  const { updateSelectedView } = useContext(NavigationViewContext);
  let webview: WebView<{
    ref: unknown;
    style: { flex: number; height: number; paddingBottom: number };
    source: { uri: string };
  }> | null = null;

  useEffect(() => {
    if (customerDwollaId) {
      const handler = async () => {
        const response: any = await DwollaAPI.iavToken(customerDwollaId);
        if (response?.data) {
          setIAVToken(response?.data?.iavToken);
          webview?.reload();
        }
      };
      handler();
    }
  }, [customerDwollaId]);

  const onClose = () => {
    updateSelectedView(ViewState.Customer);
    setTimeout(() => navigation.navigate(Routes.TABS), 2000);
  };

  return (
    <View style={viewBaseWhite}>
      <Header rightComponent={<CancelBtn text="Close" onClick={onClose} />} />

      <ScrollView style={wrappingContainerBase}>
        {iavToken !== "" && (
          <WebView
            ref={ref => (webview = ref)}
            style={styles.bankView}
            source={{
              uri: `https://baklava.api.humanity.cash/iav/?iavToken=${iavToken}`
            }}
          />
        )}
      </ScrollView>
      {iavToken === "" && (
        <SafeAreaView style={styles.bottomView}>
          <ActivityIndicator size="large" color={colors.darkGreen} />
        </SafeAreaView>
      )}
    </View>
  );
};

export default SelectBank;
