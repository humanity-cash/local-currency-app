import { AntDesign, Entypo } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Dimensions
} from "react-native";
import { Text } from "react-native-elements";
import { BUTTON_TYPES } from "src/constants";
import { UserContext, WalletContext } from "src/contexts";
import { useCustomerWallet } from "src/hooks";
import * as Routes from "src/navigation/constants";
import { LoadingPage } from "src/views";
import { Button, Dialog, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  baseHeader,
  dialogViewBase,
  viewBase,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { DwollaDialog } from "src/views";
import { BarCodeScanner } from "expo-barcode-scanner";
import SettingDialog from "src/shared/uielements/SettingDialog";
import { EventsContext } from "src/contexts/events";
import EventItem from "src/shared/uielements/EventItem";
import { CustomerScanQrCodeStyle } from "src/style";
import { styles } from "./style";
import { FeedItemProps } from "src/api/types";
import { getFeedContent } from "src/api/content";

const CustomerDashboard = (): JSX.Element => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [feedData, setFeedData] = useState<FeedItemProps[]>([]);
  const [isSetting, setIsSetting] = useState(false);
  const { customerDwollaId, user } = useContext(UserContext);
  const { customerWalletData, updateCustomerWalletData } =
    useContext(WalletContext);
  const { events, getEvents, deleteEvent, updateEvents } =
    useContext(EventsContext);
  const { isLoading: isWalletLoading } = useCustomerWallet();
  const personalFundingSource = customerWalletData?.availableFundingSource;
  const availableBalance = customerWalletData?.availableBalance;
  const [showEvents, setShowEvents] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    updateEvents([]);
    fetchFeedData();
  }, []);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (customerDwollaId) {
        updateCustomerWalletData(customerDwollaId);
        await getEvents(customerDwollaId);
        setShowEvents(true);
      }
    }, 5000);

    return () => clearInterval(timerId);
  }, [customerDwollaId]);

  const onClose = () => {
    setIsVisible(false);
  };

  const fetchFeedData = async () => {
    const data = await getFeedContent();
    setFeedData(data);
  };

  const onPressScan = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      if (availableBalance && availableBalance > 0) {
        navigation.navigate(Routes.QRCODE_SCAN, {
          senderId: customerDwollaId,
          walletData: customerWalletData,
          username: user?.customer?.tag,
          styles: CustomerScanQrCodeStyle,
          recieveRoute: Routes.PAYMENT_REQUEST,
          cancelRoute: Routes.DASHBOARD,
        });
      } else {
        navigation.navigate(Routes.RECEIVE_PAYMENT);
      }
    } else {
      setIsSetting(true);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (customerDwollaId) {
      updateCustomerWalletData(customerDwollaId);
      await getEvents(customerDwollaId);
      await fetchFeedData();
      setShowEvents(true);
    }
    setRefreshing(false);
  }, [customerDwollaId]);

  return (
    <View style={viewBase}>
      <LoadingPage visible={isWalletLoading} isData={true} />
      <Header
        leftComponent={
          <TouchableWithoutFeedback
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <View style={styles.inlineView}>
              <Entypo name="menu" size={25} color={colors.darkGreen} />
              <Text>Menu</Text>
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
          <Text style={styles.text}>
            B$ {availableBalance ? availableBalance.toFixed(2) : "-"}
          </Text>
          <TouchableOpacity
            style={styles.topupButton}
            onPress={() => {
              personalFundingSource?.visible
                ? navigation.navigate(Routes.LOAD_UP, {
                    userId: customerDwollaId,
                  })
                : setIsVisible(true);
            }}
          >
            <Text style={styles.topupText}>{Translation.LOAD_UP.TITLE}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.content}>
            {personalFundingSource?.visible === false && !isWalletLoading && (
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
                    onPress={() => setIsVisible(true)}
                  >
                    {`${Translation.BANK_ACCOUNT.LINK_PERSONAL_BANK_ACCOUNT} `}
                    &gt;
                  </Text>
                </Text>
              </View>
            )}
            {personalFundingSource?.needMicroDeposit && !isWalletLoading && (
              <View style={styles.alertView}>
                <AntDesign
                  name="exclamationcircleo"
                  size={18}
                  style={styles.alertIcon}
                />
                <Text style={styles.alertText}>
                  {Translation.BANK_ACCOUNT.MICRO_DEPOSIT_DETAIL} &nbsp;
                  <Text
                    style={styles.alertIcon}
                    onPress={() => setIsVisible(true)}
                  >
                    {`${Translation.BANK_ACCOUNT.VERIFY_PERSONAL_BANK_ACCOUNT} `}
                    &gt;
                  </Text>
                </Text>
              </View>
            )}
            {showEvents && events.length > 0 && (
              <EventItem
                event={events[events.length - 1]}
                onDelete={() => {
                  deleteEvent(customerDwollaId, events[events.length - 1].dbId);
                }}
              />
            )}
            {feedData.map((f, i) => (
              <FeedItem key={i} {...f} />
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={onPressScan} style={styles.scanButton}>
        <Image
          source={require("../../../../assets/images/qr_code_consumer.png")}
          style={styles.qrIcon}
        />
        <Text style={styles.scanBtnText}>{Translation.BUTTON.SCAN}</Text>
      </TouchableOpacity>
      {isVisible && (
        <DwollaDialog
          title={Translation.BANK_ACCOUNT.USE_DWOLLA_PERSONAL}
          visible={isVisible}
          onClose={onClose}
        />
      )}

      <SettingDialog
        visible={isSetting}
        onCancel={() => setIsSetting(false)}
        description={Translation.OTHER.NO_CAMERA_PERMISSION_DETAIL}
      />
    </View>
  );
};

const FeedItem = (props: FeedItemProps) => {
  const { text, textTitle, image, contentType } = props;
  const [ height, setHeight ] = useState(0)

  const widthRate = contentType === "Values" ? 5
                    : contentType === "DidYouKnow" ? 3
                    : 1
  const mainW = (Dimensions.get('window').width - 40) / widthRate

  return (
    <View style={styles.feedView}>
      <Text h2>{textTitle}</Text>
      <Text style={styles.bodyText}>{text}</Text>
      { image?.length && 
        <Image
          source={{uri: image}}
          style={{width: mainW, height: height, alignSelf: 'center'}}
          width={mainW}
          height={height}
          resizeMode={'contain'}
          onLayout={(e) => {
            Image.getSize(image, (width, height) => {
              setHeight(mainW*height/width)
            })
          }}
      />}
    </View>
  );
};

export default CustomerDashboard;
