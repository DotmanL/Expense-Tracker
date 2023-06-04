import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "components/shared/Button";

type Props = {
  onCancel: () => void;
  onSubmit: () => void;
  submitButtonLabel: string;
};

function ExpenseForm(props: Props) {
  const { onCancel, onSubmit, submitButtonLabel } = props;
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: ""
  });

  function inputChangeHandler(inputIdentifier: string, enteredValue: string) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue
      };
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => inputChangeHandler("amount", text),
            value: inputValues.amount
            // clearButtonMode: "while-editing"
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (text) => inputChangeHandler("date", text),
            value: inputValues.date
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: (text) => inputChangeHandler("description", text),
          value: inputValues.description
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={onSubmit}>
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
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});
