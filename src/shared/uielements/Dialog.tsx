import React, { ReactElement, useContext } from "react";
import { Dimensions, View, StyleSheet, SafeAreaView } from "react-native";
import { Overlay } from "react-native-elements";
import { CancelBtn } from "src/shared/uielements/header";
import { colors } from "src/theme/colors";
import { IMap } from "src/utils/types";
import { UserType } from "src/auth/types";
import { UserContext } from "src/contexts";

type DialogProps = {
  visible: boolean;
  children: ReactElement;
  backgroundStyle?: IMap;
  style?: IMap;
  hiddenCloseBtn?: boolean;
  onShow?: () => void;
  onClose?: () => void;
};

export const DIALOG_SCREEN_OFFSET = Dimensions.get("screen").height * 0.06;

const styles = StyleSheet.create({
  dialogBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dialogWrap: {
    width: "90%",
    borderRadius: 20,
    backgroundColor: colors.background,
    shadowColor: colors.black,
    borderColor: colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    padding: 0,
  },
  dialogView: {
    borderRadius: 20,
  },
});

const Dialog = ({
  visible = false,
  onClose,
  backgroundStyle = {},
  style = {},
  children,
  hiddenCloseBtn = false,
  onShow,
}: DialogProps): JSX.Element => {
  const { userType } = useContext(UserContext);
  const isCustomer = userType === UserType.Customer;

  return (
    <Overlay
      isVisible={visible}
      overlayStyle={{
        ...styles.dialogBg,
        ...backgroundStyle,
        backgroundColor: isCustomer ? colors.pDialogBg : colors.bDialogBg,
      }}
      backdropStyle={{
        backgroundColor: "transparent",
      }}
      animationType="slide"
      onShow={() => onShow && onShow()}
    >
      <View style={styles.container}>
        {!hiddenCloseBtn && (
          <SafeAreaView style={styles.closeBtn}>
            <CancelBtn
              text="Close"
              color={colors.white}
              onClick={() => onClose && onClose()}
            />
          </SafeAreaView>
        )}
        <View
          style={{
            ...styles.dialogWrap,
            ...style,
          }}
        >
          {children}
        </View>
      </View>
    </Overlay>
  );
};

export default Dialog;
