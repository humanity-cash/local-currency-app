import { AntDesign, Entypo } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Image, Text } from "react-native-elements";
import { BUTTON_TYPES } from "src/constants";
import { UserContext, WalletContext } from "src/contexts";
import { useBusinessWallet } from "src/hooks";
import * as Routes from "src/navigation/constants";
import { Button, Dialog, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  baseHeader,
  dialogViewBase,
  viewBaseB,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { DwollaDialog } from "src/views";
import SettingDialog from "src/shared/uielements/SettingDialog";
import { BarCodeScanner } from "expo-barcode-scanner";
import { EventsContext } from "src/contexts/events";
import EventItem from "src/shared/uielements/EventItem";
import { BusinessScanQrCodeStyle } from "src/style";
import { TransactionList } from "src/views";
import { styles } from "./style";

const MerchantDashboard = (): JSX.Element => {
  const navigation = useNavigation();
  const { businessWalletData, updateBusinessWalletData } =
    useContext(WalletContext);
  const { user } = useContext(UserContext);
  const { events, getEvents, deleteEvent } = useContext(EventsContext);
  const completedCustomerVerification = user?.verifiedCustomer;
  const [isDwollaVisible, setIsDwollaVisible] = useState<boolean>(false);
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const { isLoading: isWalletLoading } = useBusinessWallet();
  const { businessDwollaId } = useContext(UserContext);
  const businessFundingSource = businessWalletData?.availableFundingSource?.visible;
  const availableBalance = businessWalletData?.availableBalance;
  const [isSetting, setIsSetting] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (businessDwollaId) {
        updateBusinessWalletData(businessDwollaId);
        await getEvents(businessDwollaId);
        setShowEvents(true);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [businessDwollaId]);

  const onClose = () => {
    setIsDwollaVisible(false);
    setIsPayment(false);
  };

  const selectBank = () => {
    navigation.navigate(Routes.MERCHANT_BANK_ACCOUNT);
    onClose();
  };

  const onPressScan = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      if (businessFundingSource && availableBalance > 0) {
        navigation.navigate(Routes.MERCHANT_QRCODE_SCAN, {
          senderId: businessDwollaId,
          walletData: businessWalletData,
          username: user?.business?.tag,
          styles: BusinessScanQrCodeStyle,
          recieveRoute: Routes.MERCHANT_REQUEST,
          cancelRoute: Routes.MERCHANT_DASHBOARD,
        });
      } else {
        navigation.navigate(Routes.MERCHANT_REQUEST);
      }
    } else {
      setIsSetting(true);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (businessDwollaId) {
      updateBusinessWalletData(businessDwollaId);
    }
    setTimeout(() => setRefreshing(false), 1000);
  }, [businessDwollaId]);

  return (
    <View style={viewBaseB}>
      <Header
        leftComponent={
          <TouchableWithoutFeedback
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <View style={styles.inlineView}>
              <Entypo name="menu" size={25} color={colors.purple} />
              <Text style={styles.mainTextColor}>
                {Translation.BUTTON.MENU}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        }
      />
      <View style={wrappingContainerBase}>
        <View style={baseHeader}>
          <Text style={styles.headerText}>
            {Translation.LANDING_PAGE.TITLE}
          </Text>
        </View>
        <View style={styles.amountView}>
          <Text style={styles.amountTxt}>
            B$ {businessFundingSource ? availableBalance : "-"}
          </Text>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.content}>
            {!completedCustomerVerification && (
              <View style={styles.alertView}>
                <AntDesign
                  name="exclamationcircleo"
                  size={18}
                  style={styles.alertIcon}
                />
                <Text style={styles.alertText}>
                  {Translation.PROFILE.PERSONAL_PROFILE_ALERT} &nbsp;
                  <Text
                    style={styles.alertIcon}
                    onPress={() => navigation.navigate(Routes.PERSONAL_PROFILE)}
                  >
                    {Translation.BUTTON.GOTO_SETUP} &gt;
                  </Text>
                </Text>
              </View>
            )}

            {businessFundingSource === false && !isWalletLoading ? (
              <View style={styles.alertView}>
                <AntDesign
                  name="exclamationcircleo"
                  size={18}
                  style={styles.alertIcon}
                />
                <Text style={styles.alertText}>
                  {Translation.BANK_ACCOUNT.ACCOUNT_ALERT} &nbsp;
                  <Text
                    style={styles.alertIcon}
                    onPress={() => setIsDwollaVisible(true)}
                  >
                    {`${Translation.BANK_ACCOUNT.LINK_BUSINESS_BANK_ACCOUNT} `}
                    &gt;
                  </Text>
                </Text>
              </View>
            ) : null}
            {showEvents && events.length > 0 && (
              <EventItem
                event={events[events.length - 1]}
                onDelete={() => {
                  deleteEvent(businessDwollaId, events[events.length - 1].dbId);
                }}
              />
            )}
            <TransactionList
              refreshing={refreshing}
              userId={businessDwollaId}
            />
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={onPressScan} style={styles.scanButton}>
        <Image
          source={require("../../../../assets/images/qr_code_merchant.png")}
          containerStyle={styles.qrIcon}
        />
        <Text style={styles.scanBtnText}>
          {Translation.BUTTON.RECEIVE_OR_SCAN}
        </Text>
      </TouchableOpacity>
      {isDwollaVisible && (
        <DwollaDialog
          title={Translation.BANK_ACCOUNT.USE_DWOLLA_BUSINESS}
          visible={isDwollaVisible}
          onClose={onClose}
        />
      )}
      {isPayment && (
        <Dialog
          visible={isPayment}
          onClose={onClose}
          backgroundStyle={styles.dialog}
        >
          <View style={dialogViewBase}>
            <View style={styles.dialogWrap}>
              <Text style={styles.dialogHeader}>
                {Translation.PAYMENT.PAYMENT_NO_BANK_TITLE}
              </Text>
              <Text style={styles.mainTextColor}>
                {Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL}
              </Text>
            </View>
            <View style={styles.dialogBottom}>
              <Button
                type={BUTTON_TYPES.PURPLE}
                title={Translation.BUTTON.LINK_BUSINESS_BANK}
                onPress={selectBank}
              />
            </View>
          </View>
        </Dialog>
      )}

      <SettingDialog
        visible={isSetting}
        onCancel={() => setIsSetting(false)}
        description={Translation.OTHER.NO_CAMERA_PERMISSION_DETAIL}
      />
    </View>
  );
};

export default MerchantDashboard;
