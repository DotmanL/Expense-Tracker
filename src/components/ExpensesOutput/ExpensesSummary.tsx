import { IExpenses } from "interfaces/IExpenses";
import { Text, View } from "react-native";

type Props = {
  expenses: IExpenses[];
  expensesPeriod: string;
};

function ExpensesSummary(props: Props) {
  const { expenses, expensesPeriod } = props;

  const expensesSum = expenses.reduce((sum: number, expense: IExpenses) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View>
      <Text> {expensesPeriod}</Text>
      <Text>£{expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;
