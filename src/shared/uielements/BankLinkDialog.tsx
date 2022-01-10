import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import Translation from "src/translation/en.json";
import { BUTTON_TYPES } from "src/constants";
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
  dialog: {
    height: 320
  },
  dialogWrap: {
    paddingHorizontal: 10,
    flex: 1
  },
  dialogHeader: {
    fontSize: 30,
    lineHeight: 32,
    marginTop: 20,
    marginBottom: 10,
    color: colors.darkGreen
  },
  dialogDetail: {
    paddingTop: 12,
    color: colors.darkGreen
  },
  dialogBottom: {
    paddingTop: 20
  }
});

type BankLinkDialogProps = {
  title: string;
  visible: boolean;
  description: string;
  buttonTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const BankLinkDialog = ({
  visible = false,
  title = Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
  description = Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL,
  buttonTitle = Translation.BUTTON.LINK_PERSONAL_BANK,
  onConfirm,
  onCancel
}: BankLinkDialogProps) => {
  return (
    <Dialog visible={visible} onClose={() => onCancel()} style={styles.dialog}>
      <View style={dialogViewBase}>
        <View style={styles.dialogWrap}>
          <Text style={styles.dialogHeader}>{title}</Text>
          <Text style={styles.dialogDetail}>{description}</Text>
        </View>
        <View style={styles.dialogBottom}>
          <Button
            type={BUTTON_TYPES.DARK_GREEN}
            title={buttonTitle}
            onPress={onConfirm}
          />
        </View>
      </View>
    </Dialog>
  );
};

export default BankLinkDialog;
