import ExpensesOutput from "components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "components/shared/ErrorOverlay";
import LoadingOverlay from "components/shared/LoadingOverlay";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "store/context/expensesContext";
import { getDateMinusDays } from "util/date";
import { fetchExpenses } from "util/httpClient";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expense");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError("");
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

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
