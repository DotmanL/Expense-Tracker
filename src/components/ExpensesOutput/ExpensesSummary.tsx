import { GlobalStyles } from "constants/styles";
import { IExpense } from "interfaces/IExpenses";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  expenses: IExpense[];
  expensesPeriod: string;
};

function ExpensesSummary(props: Props) {
  const { expenses, expensesPeriod } = props;

  const expensesSum = expenses.reduce((sum: number, expense: IExpense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}> {expensesPeriod}</Text>
      <Text style={styles.sum}>£{expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400
  },
  sum: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500
  }
});
