import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { WebView } from "react-native-webview";
import { useUserDetails } from "src/hooks";
import { Button, CancelBtn, Header, Modal, ModalHeader } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
    baseHeader,
    viewBase,
    wrappingContainerBase
} from "src/theme/elements";
import { IMap, Terms as TermsType } from "src/utils/types";

interface TermsState extends TermsType, IMap {}

type TermsProps = {
  navigation?: any;
  route: any;
};

const styles = StyleSheet.create({
  termsView: {},
  termsItem: {
    height: 60,
    backgroundColor: colors.white,
    marginBottom: 20,
    flexDirection: "row",
    textAlignVertical: "center",
  },
  termsTextWrap: {
    flex: 1,
    marginRight: 45,
    justifyContent: "center",
  },
  termsText: {
    lineHeight: 16,
    textAlignVertical: "center",
    marginLeft: 15,
  },
  circle: {
    height: 30,
    width: 30,
    borderColor: colors.text,
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 15,
    marginRight: 10,
  },
  circleSelected: {
    backgroundColor: colors.textSuccess,
    borderColor: colors.textSuccess,
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
  icon: {
    fontSize: 20,
    color: colors.white,
    marginLeft: 3,
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
};

const TermsView = (props: TermsProps) => {
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState({ name: "", header: "" });
  const { terms, updateStatus, updateTerms } = useUserDetails();
  const [termsState, setTermsState] = useState<TermsState>({
    terms: false,
    privacy: false,
    banking: false,
  });
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    setGoNext(Object.keys(termsState).every((key) => termsState[key] === true));
  }, [termsState]);

  const onAccept = () => {
    setTermsState({
      ...termsState,
      [viewType.name]: true,
    });
    setVisible(false);
    updateTerms({ [viewType.name]: true });
  };

  const onNextPress = () => {
    updateStatus({ terms: true });
    props.navigation.navigate("OnboardingSteps", { step: 4 });
  };

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

  return (
    <View style={{ ...viewBase }}>
      <Header />

      <View style={wrappingContainerBase}>
        <View style={baseHeader}>
          <Text h1>Accept our terms and conditions</Text>
        </View>
        <View style={styles.termsView}>
          <TouchableWithoutFeedback
            onPress={() => {
              setVisible(true);
              setViewType(views.terms);
            }}
          >
            <View style={styles.termsItem}>
              <View style={styles.termsTextWrap}>
                <Text style={styles.termsText}>Terms and Conditions</Text>
              </View>
              <View
                style={[
                  styles.circle,
                  termsState.terms ? styles.circleSelected : {},
                ]}
              >
                <MaterialIcons name="done" style={styles.icon} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setVisible(true);
              setViewType(views.privacy);
            }}
          >
            <View style={styles.termsItem}>
              <View style={styles.termsTextWrap}>
                <Text style={styles.termsText}>Privacy Policy</Text>
              </View>
              <View
                style={[
                  styles.circle,
                  termsState.privacy ? styles.circleSelected : {},
                ]}
              >
                <MaterialIcons name="done" style={styles.icon} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setVisible(true);
              setViewType(views.banking);
            }}
          >
            <View style={styles.termsItem}>
              <View style={styles.termsTextWrap}>
                <Text style={styles.termsText}>
                  Liendhardt banking account Terms and Conditions
                </Text>
              </View>
              <View
                style={[
                  styles.circle,
                  termsState.banking ? styles.circleSelected : {},
                ]}
              >
                <MaterialIcons name="done" style={styles.icon} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Button
        type="fluidDark"
        title="NEXT"
        disabled={!goNext}
        onPress={onNextPress}
      />
      {visible && (
        <Modal visible={visible}>
          <View style={{ height: "100%" }}>
            <ModalHeader
              rightComponent={<CancelBtn onClick={() => setVisible(false)} />}
            />
            <View style={styles.modalWrap}>
              <Text style={styles.modalHeader}>{viewType.header}</Text>
              {documents[viewType.name]}
            </View>
            <Button
              type="fluidDark"
              title="ACCEPT AND EMAIL ME A COPY"
              onPress={onAccept}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const Terms = (props: TermsProps) => {
  const navigation = useNavigation();
  return <TermsView {...props} navigation={navigation} />;
};
export default Terms;
