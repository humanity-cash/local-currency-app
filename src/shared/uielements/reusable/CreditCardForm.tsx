import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { usePaymentDetails } from "src/hooks";
import { colors } from "src/theme/colors";
import { CreditCardDetailsErrors, IMap } from "src/utils/types";
import { validateCreditCard } from "src/utils/validation";
import BlockInput from "../BlockInput";

interface CreditCardState extends IMap {
  number: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
}

interface CreditCardFormProps {
  isValid: (valid: boolean) => void;
  cardId?: string;
  showValidation?: boolean;
}

const styles = StyleSheet.create({
  dateInput: {
    width: "35%",
    marginRight: 10,
    padding: 0,
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "center",
  },
  cvcInput: {
    width: "60%",
    marginRight: 5,
    textAlign: "center",
  },
});

const CreditCardForm = (props: CreditCardFormProps) => {
  const { cardId, showValidation, isValid } = props;
  const { details, editSelectedCard, clearSelectedCard } = usePaymentDetails();
  const [
    validationErrors,
    setValidationErrors,
  ] = useState<CreditCardDetailsErrors>({});
  const [state, setState] = useState<CreditCardState>({
    number: "",
    expireMonth: "",
    expireYear: "",
    cvc: "",
  });

  useEffect(() => {
    if (!cardId) {
      clearSelectedCard();
    }
  }, []);

  useEffect(() => {
    if (details.selected) {
      const validation = validateCreditCard(details.selected);
      setValidationErrors(validation.errors);
    }
  }, [details.selected]);

  useEffect(() => {
    if (details.selected) {
      setState({
        number: details.selected.number,
        expireMonth: details.selected.expireMonth,
        expireYear: details.selected.expireYear,
        cvc: details.selected.cvc,
      });
    }
    isValid(Object.keys(state).every((key) => state[key] !== ""));
  }, [details]);

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    editSelectedCard({ [name]: change });
    isValid(Object.keys(state).every((key) => state[key] !== ""));
  };

  console.log("rerender CreditCardForm");
  return (
    <View>
      <Text h3>Card number</Text>
      {showValidation && validationErrors.number && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.number}
        </Text>
      )}
      <BlockInput
        name="number"
        placeholder="Card number (e.g. 1234 5678 9876 5432)"
        value={state.number}
        keyboardType="number-pad"
        onChange={onValueChange}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text h3>Expiration date</Text>
          {showValidation && validationErrors.date && (
            <Text h3 style={{ marginTop: 5, color: colors.textError }}>
              {validationErrors.date}
            </Text>
          )}
          <View style={{ flexDirection: "row" }}>
            <BlockInput
              name="expireMonth"
              placeholder="MM"
              maxLength={2}
              keyboardType="number-pad"
              value={state.expireMonth}
              onChange={onValueChange}
              style={styles.dateInput}
            />
            <BlockInput
              name="expireYear"
              placeholder="YY"
              maxLength={2}
              keyboardType="number-pad"
              value={state.expireYear}
              onChange={onValueChange}
              style={styles.dateInput}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text h3>CvC code</Text>
          {showValidation && validationErrors.cvc && (
            <Text h3 style={{ marginTop: 5, color: colors.textError }}>
              {validationErrors.cvc}
            </Text>
          )}
          <BlockInput
            name="cvc"
            placeholder="123"
            keyboardType="number-pad"
            value={state.cvc}
            maxLength={3}
            onChange={onValueChange}
            style={styles.cvcInput}
          />
        </View>
      </View>
    </View>
  );
};

export default CreditCardForm;