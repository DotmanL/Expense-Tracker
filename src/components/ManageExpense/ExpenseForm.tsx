import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "components/shared/Button";
import { IExpense } from "interfaces/IExpenses";
import { getFormattedDate } from "util/date";
import { GlobalStyles } from "constants/styles";

type Props = {
  onCancel: () => void;
  onSubmit: (expenseData: IExpense) => void;
  submitButtonLabel: string;
  currentExpense?: IExpense;
};

function ExpenseForm(props: Props) {
  const { onCancel, onSubmit, submitButtonLabel, currentExpense } = props;
  const [inputs, setInputs] = useState({
    amount: {
      value: currentExpense ? currentExpense.amount.toString() : "",
      isValid: true
    },
    date: {
      value: currentExpense ? getFormattedDate(currentExpense.date) : "",
      isValid: true
    },
    description: {
      value: currentExpense ? currentExpense.description.toString() : "",
      isValid: true
    }
  });

  function inputChangeHandler(inputIdentifier: string, enteredValue: string) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value, // the + sign converts a string to number
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setInputs((currInput) => {
        return {
          amount: { value: currInput.amount.value, isValid: isAmountValid },
          date: { value: currInput.date.value, isValid: isDateValid },
          description: {
            value: currInput.description.value,
            isValid: isDescriptionValid
          }
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const isInvalidForm =
    !inputs.amount.isValid ||
    !inputs.description.isValid ||
    !inputs.date.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => inputChangeHandler("amount", text),
            value: inputs.amount.value
            // clearButtonMode: "while-editing"
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (text) => inputChangeHandler("date", text),
            value: inputs.date.value
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (text) => inputChangeHandler("description", text),
          value: inputs.description.value
        }}
      />
      {isInvalidForm && (
        <Text style={styles.errorText}>
          Invalid Inputs, please check your entered data
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center"
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowInput: {
    flex: 1
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});
