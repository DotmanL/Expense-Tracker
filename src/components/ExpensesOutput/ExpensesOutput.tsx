import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { IExpense } from "interfaces/IExpenses";
import { GlobalStyles } from "constants/styles";

type Props = {
  expenses: IExpense[];
  expensesPeriod: string;
  fallbackText: string;
};

function ExpensesOutput(props: Props) {
  const { expenses, expensesPeriod, fallbackText } = props;

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32
  }
});
