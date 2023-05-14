import { View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { IExpenses } from "interfaces/IExpenses";

type Props = {
  expenses: IExpenses[];
  expensesPeriod: string;
};

function ExpensesOutput(props: Props) {
  const { expenses, expensesPeriod } = props;
  return (
    <View>
      <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

export default ExpensesOutput;
