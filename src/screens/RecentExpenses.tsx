import ExpensesOutput from "components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "store/context/expensesContext";
import { getDateMinusDays } from "util/date";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const sevenDaysAgoDate = getDateMinusDays(today, 7);
    return expense.date >= sevenDaysAgoDate && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
