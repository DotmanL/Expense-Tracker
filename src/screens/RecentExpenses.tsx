import ExpensesOutput from "components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/expensesData";

function RecentExpenses() {
  return (
    <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod="Last 7 Days" />
  );
}

export default RecentExpenses;
