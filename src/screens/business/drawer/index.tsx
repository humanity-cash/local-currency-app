import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Drawer } from "react-native-paper";
import { UserType } from "src/auth/types";
import { BUTTON_TYPES } from "src/constants";
import {
  AuthContext,
  NavigationViewContext,
  UserContext,
  WalletContext,
} from "src/contexts";
import { ViewState } from "src/contexts/navigation";
import { useBusinessWallet } from "src/hooks";
import * as Routes from "src/navigation/constants";
import Report from "src/screens/report/Report";
import { Button, Dialog } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  baseHeader,
  dialogViewBase,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import MerchantRequest from "src/screens/business/payment/MerchantRequest";
import MerchantReturnQRCodeScan from "src/screens/business/payment/MerchantReturnQRCodeScan";
import MerchantDashboard from "../dashboard";
import BankLinkDialog from "src/shared/uielements/BankLinkDialog";
import { BarCodeScanner } from "expo-barcode-scanner";
import SettingDialog from "src/shared/uielements/SettingDialog";
import { PaymentsModule } from "src/modules";
import { BusinessScanQrCodeStyle } from "src/style";
import { prefixCustomerName } from "src/utils/common";
import MerchantSettings from "../drawer/settings/MerchantSettings";
import MerchantSettingsHelpAndContact from "../drawer/settings/MerchantSettingsHelpAndContact";
import { styles } from "./style";
import MerchantPayoutToPersonal from 'src/screens/business/drawer/sendToSomeone/MerchantPayoutToPersonal';

type ReturnPaymentDialogProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ReturnPaymentDialog = (props: ReturnPaymentDialogProps) => {
  return (
    <Dialog
      visible={props.visible}
      onClose={() => props.onCancel()}
      backgroundStyle={styles.dialogBg}
    >
      <View style={dialogViewBase}>
        <View style={styles.dialogWrap}>
          <View style={baseHeader}>
            <Text style={styles.headerText}>
              {Translation.PAYMENT.SCAN_RECIPIENTS_QR}
            </Text>
          </View>
          <Text style={styles.detailText}>
            {Translation.PAYMENT.SCAN_RECIPIENTS_QR_DETAIL}
          </Text>
        </View>
        <View>
          <Button
            type={BUTTON_TYPES.PURPLE}
            title="Scan"
            onPress={() => props.onConfirm()}
          />
        </View>
      </View>
    </Dialog>
  );
};

type CashierViewDialogProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const CashierViewDialogDialog = (props: CashierViewDialogProps) => {
  return (
    <Dialog
      visible={props.visible}
      onClose={() => props.onCancel()}
      backgroundStyle={styles.dialogBg}
    >
      <View style={dialogViewBase}>
        <View style={styles.dialogWrap}>
          <View style={baseHeader}>
            <Text style={styles.headerText}>
              {Translation.CASHIER.CASHIER_VIEW_SWITCH}
            </Text>
          </View>
          <Text style={styles.detailText}>
            {Translation.CASHIER.CASHIER_VIEW_SWITCH_DETAIL}
          </Text>
        </View>
        <View>
          <Button
            type={BUTTON_TYPES.PURPLE}
            title={Translation.BUTTON.SWITCH_VIEW}
            onPress={() => props.onConfirm()}
          />
        </View>
      </View>
    </Dialog>
  );
};

type BankLinkDialogStateProps = {
  visible: boolean;
  title: string;
  description: string;
  buttonTitle: string;
  confirmAction?: () => void;
  cancelAction?: () => void;
};

const initBankDialogState: BankLinkDialogStateProps = {
  visible: false,
  title: "",
  description: "",
  buttonTitle: "",
};

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { signOut, userEmail } = useContext(AuthContext);
  const { user, updateUserType, businessDwollaId } = useContext(UserContext);
  const { updateSelectedView } = useContext(NavigationViewContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isCashierView, setIsCashierView] = useState<boolean>(false);
  const [bankDialogState, setBankDialogState] =
    useState<BankLinkDialogStateProps>(initBankDialogState);
  const [isSetting, setIsSetting] = useState(false);
  const { businessWalletData } = useContext(WalletContext);
  const businessFundingSource = businessWalletData?.availableFundingSource;
  const availableBalance = businessWalletData?.availableBalance;
  useBusinessWallet();

  const onScanConfirm = () => {
    setIsVisible(false);
    props.navigation.navigate(Routes.MERCHANT_RETURN_QRCODE_SCAN);
  };

  const onScanCancel = () => {
    setIsVisible(false);
  };

  const onCashierViewConfirm = () => {
    setIsCashierView(false);
    updateUserType(UserType.Cashier, userEmail);
    updateSelectedView(ViewState.Cashier);
  };

  const onCashierViewCancel = () => {
    setIsCashierView(false);
  };

  const onBankDialogConfirm = () => {
    setBankDialogState(initBankDialogState);
    if(businessFundingSource?.needMicroDeposit) {
      props.navigation.navigate(Routes.MICRO_DEPOSIT_BANK);
    } else {
      props.navigation.navigate(Routes.MERCHANT_BANK_ACCOUNT);
    }
  };

  const onBankDialogCancel = () => {
    setBankDialogState(initBankDialogState);
  };

  const onLoadupDialogConfirm = () => {
    setBankDialogState(initBankDialogState);
    props.navigation.navigate(Routes.MERCHANT_LOADUP, {
      userId: businessDwollaId,
      styles: "business"
    });
  };

  const onLoadupDialogCancel = () => {
    setBankDialogState(initBankDialogState);
  };

  const onPersonal = () => {
    updateUserType(UserType.Customer, userEmail);
    updateSelectedView(ViewState.Customer);
  };

  const onPressScanToPay = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      if (availableBalance && availableBalance > 0) {
        props.navigation.navigate(Routes.MERCHANT_QRCODE_SCAN, {
          senderId: businessDwollaId,
          walletData: businessWalletData,
          username: user?.business?.tag,
          styles: BusinessScanQrCodeStyle,
          recieveRoute: Routes.MERCHANT_REQUEST,
          cancelRoute: Routes.MERCHANT_DASHBOARD,
        });
      } else {
        if (businessFundingSource?.visible) {
          setBankDialogState({
            visible: true,
            title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
            description: Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL,
            buttonTitle: Translation.BUTTON.LOAD_UP_BERKSHARES,
            confirmAction: onLoadupDialogConfirm,
            cancelAction: onLoadupDialogCancel,
          });
        } else {
          setBankDialogState({
            visible: true,
            title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
            description: Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL,
            buttonTitle: Translation.BUTTON.LINK_BUSINESS_BANK,
            confirmAction: onBankDialogConfirm,
            cancelAction: onBankDialogCancel,
          });
        }
      }
    } else {
      setIsSetting(true);
    }
  };

  const onPressMakeReturn = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      if (availableBalance && availableBalance > 0) {
        setIsVisible(true);
      } else {
        if (businessFundingSource?.visible) {
          setBankDialogState({
            visible: true,
            title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
            description: Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL,
            buttonTitle: Translation.BUTTON.LOAD_UP_BERKSHARES,
            confirmAction: onLoadupDialogConfirm,
            cancelAction: onLoadupDialogCancel,
          });
        } else {
          setBankDialogState({
            visible: true,
            title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
            description: Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL,
            buttonTitle: Translation.BUTTON.LINK_BUSINESS_BANK,
            confirmAction: onBankDialogConfirm,
            cancelAction: onBankDialogCancel,
          });
        }
      }
    } else {
      setIsSetting(true);
    }
  };

  const onPressLoadup = async () => {
    if (businessWalletData?.address && businessFundingSource?.visible) {
      props.navigation.navigate(Routes.LOAD_UP, {
        userId: businessDwollaId,
        styles: "business",
      });
    } else {
      setBankDialogState({
        visible: true,
        title: Translation.LOAD_UP.LOAD_UP_NO_BANK_TITLE,
        description: Translation.LOAD_UP.LOAD_UP_NO_BANK_DETAIL,
        buttonTitle: Translation.BUTTON.LINK_BUSINESS_BANK,
        confirmAction: onBankDialogConfirm,
        cancelAction: onBankDialogCancel,
      });
    }
  };

  const onPressSendToSomeone = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      if (availableBalance && availableBalance > 0) {
        props.navigation.navigate(Routes.MERCHANT_PAYOUT_SELECTION);
      } else {
        if (businessFundingSource?.visible) {
          setBankDialogState({
            visible: true,
            title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
            description: Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL,
            buttonTitle: Translation.BUTTON.LOAD_UP_BERKSHARES,
            confirmAction: onLoadupDialogConfirm,
            cancelAction: onLoadupDialogCancel,
          });
        } else {
          setBankDialogState({
            visible: true,
            title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
            description: Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL,
            buttonTitle: Translation.BUTTON.LINK_BUSINESS_BANK,
            confirmAction: onBankDialogConfirm,
            cancelAction: onBankDialogCancel,
          });
        }
      }
    } else {
      setIsSetting(true);
    }
  };

  const onPressCashout = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      if (!businessFundingSource?.visible) {
        setBankDialogState({
          visible: true,
          title: Translation.CASH_OUT.CASH_OUT_NO_BANK_TITLE,
          description: Translation.CASH_OUT.CASH_OUT_NO_BANK_DETAIL,
          buttonTitle: Translation.BUTTON.LINK_BUSINESS_BANK,
          confirmAction: onBankDialogConfirm,
          cancelAction: onBankDialogCancel,
        });
      } else {
        if (availableBalance && availableBalance > 0) {
          props.navigation.navigate(Routes.MERCHANT_CASHOUT_AMOUNT, {
            userId: businessDwollaId,
            walletData: businessWalletData,
          });
        } else {
          setBankDialogState({
            visible: true,
            title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
            description: Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL,
            buttonTitle: Translation.BUTTON.LOAD_UP_BERKSHARES,
            confirmAction: onLoadupDialogConfirm,
            cancelAction: onLoadupDialogCancel,
          });
        }
      }
    } else {
      setIsSetting(true);
    }
  };

  const userTag = user?.customer?.tag || undefined;
  const businessTag = user?.business?.tag || undefined;
  const verifiedBusiness = user?.verifiedBusiness;
  const verifiedCustomer = user?.verifiedCustomer;

  return (
    <View style={styles.drawerWrap}>
      <DrawerContentScrollView {...props}>
        <View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
          >
            <View style={styles.closeBtnView}>
              <AntDesign name="close" size={24} color={colors.bodyText} />
              <Text style={styles.closeBtnText}>Menu</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.infoView}>
            <TouchableWithoutFeedback
              onPress={() => setIsExpanded(!isExpanded)}
            >
              <View style={styles.userInfo}>
                <View style={styles.imageView}>
                  <Image
                    source={require("../../../../assets/images/placeholder5.png")}
                    style={styles.image}
                  />
                </View>
                <View style={styles.usernameView}>
                  <Text>{businessTag}</Text>
                  {(verifiedCustomer || verifiedBusiness) && (
                    <View style={styles.inlineView}>
                      <Text style={styles.fadeText}>Switch account</Text>
                      <EvilIcons
                        name="chevron-down"
                        size={26}
                        color={colors.purple}
                      />
                    </View>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
            {isExpanded && (
              <View>
                {verifiedCustomer && userTag ? (
                  <TouchableWithoutFeedback onPress={onPersonal}>
                    <View style={styles.userInfo}>
                      <View style={styles.imageView}>
                        <Image
                          source={require("../../../../assets/images/placeholder5.png")}
                          style={styles.image}
                        />
                      </View>
                      <View style={styles.usernameView}>
                        <Text>{prefixCustomerName(userTag)}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ) : null}
                {verifiedBusiness ? (
                  <TouchableWithoutFeedback
                    onPress={() => setIsCashierView(true)}
                  >
                    <View style={styles.userInfo}>
                      <View style={styles.imageView}>
                        <Image
                          source={require("../../../../assets/images/placeholder5.png")}
                          style={styles.image}
                        />
                      </View>
                      <View style={styles.usernameView}>
                        <Text>Cashier</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ) : null}
              </View>
            )}
          </View>
          <Text style={styles.berkAmount}>
            B$ {businessWalletData?.availableBalance?.toFixed(2)}
          </Text>
          <Drawer.Section>
            <DrawerItem
              label={Translation.TABS.RECEIVE_PAYMENT}
              onPress={() => props.navigation.navigate(Routes.MERCHANT_REQUEST)}
            />
            <DrawerItem
              label={Translation.TABS.SCAN_TO_PAY}
              onPress={onPressScanToPay}
            />
            <DrawerItem
              label={Translation.TABS.MAKE_RETURN}
              onPress={onPressMakeReturn}
            />
            <DrawerItem
              label={Translation.TABS.LOADUP}
              onPress={onPressLoadup}
            />
            <DrawerItem
              label={Translation.TABS.SEND_TO_PERSONAL_ACCOUNT}
              onPress={onPressSendToSomeone}
            />
            <DrawerItem
              label={Translation.TABS.CASHOUT}
              onPress={onPressCashout}
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              label={Translation.TABS.REPORT}
              onPress={() => {
                props.navigation.navigate(Routes.REPORT);
              }}
            />
            <DrawerItem
              label={Translation.TABS.SETTINGS}
              onPress={() => {
                props.navigation.navigate(Routes.MERCHANT_SETTINGS);
              }}
            />
            <DrawerItem
              label={Translation.TABS.HELP_AND_CONTACT}
              onPress={() => {
                props.navigation.navigate(Routes.MERCHANT_HELP_AND_CONTACT);
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomSection}>
        <DrawerItem
          icon={() => (
            <Feather name="log-out" size={24} color={colors.purple} />
          )}
          label={Translation.TABS.SIGN_OUT}
          onPress={signOut}
        />
      </Drawer.Section>
      {isVisible && (
        <ReturnPaymentDialog
          visible={isVisible}
          onConfirm={onScanConfirm}
          onCancel={onScanCancel}
        />
      )}
      {isCashierView && (
        <CashierViewDialogDialog
          visible={isCashierView}
          onConfirm={onCashierViewConfirm}
          onCancel={onCashierViewCancel}
        />
      )}
      <BankLinkDialog
        visible={bankDialogState.visible}
        title={bankDialogState.title}
        description={bankDialogState.description}
        buttonTitle={bankDialogState.buttonTitle}
        onConfirm={() => {
          bankDialogState.confirmAction && bankDialogState.confirmAction();
        }}
        onCancel={() => {
          bankDialogState.cancelAction && bankDialogState.cancelAction();
        }}
      />
      <SettingDialog
        visible={isSetting}
        onCancel={() => setIsSetting(false)}
        description={Translation.OTHER.NO_CAMERA_PERMISSION_DETAIL}
      />
    </View>
  );
};

const DrawerNav = createDrawerNavigator();

const MerchantTabs: React.FC = () => {
  return (
    <DrawerNav.Navigator
      initialRouteName={Routes.MERCHANT_DASHBOARD}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <DrawerNav.Screen
        name={Routes.MERCHANT_DASHBOARD}
        component={MerchantDashboard}
      />
      <DrawerNav.Screen
        name={Routes.MERCHANT_REQUEST}
        component={MerchantRequest}
      />
      <DrawerNav.Screen
        name={Routes.MERCHANT_QRCODE_SCAN}
        component={PaymentsModule.Send}
      />
      <DrawerNav.Screen
        name={Routes.MERCHANT_RETURN_QRCODE_SCAN}
        component={MerchantReturnQRCodeScan}
      />
      <DrawerNav.Screen
        name={Routes.MERCHANT_CASHOUT_AMOUNT}
        component={PaymentsModule.Cashout}
      />
      <DrawerNav.Screen
        name={Routes.MERCHANT_LOADUP}
        component={PaymentsModule.Loadup}
      />
      <DrawerNav.Screen
        name={Routes.MERCHANT_PAYOUT_SELECTION}
        component={MerchantPayoutToPersonal}
        // remove the "Pay out in B$" screen because it actually doesn't do anything (until we have the addressbook).
        // component={MerchantPayoutSelection}
      />
      <DrawerNav.Screen name={Routes.REPORT} component={Report} />
      <DrawerNav.Screen
        name={Routes.MERCHANT_SETTINGS}
        component={MerchantSettings}
      />
      <DrawerNav.Screen
        name={Routes.MERCHANT_HELP_AND_CONTACT}
        component={MerchantSettingsHelpAndContact}
      />
    </DrawerNav.Navigator>
  );
};

export default MerchantTabs;
