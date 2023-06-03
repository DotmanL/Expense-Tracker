import { IExpense } from "interfaces/IExpenses";
import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

type Props = {
  expenses: IExpense[];
};

type ExpensesItemData = {
  item: IExpense;
};

function renderExpenseItem(itemData: ExpensesItemData) {
  return (
    <ExpenseItem
      id={itemData.item.id!}
      description={itemData.item.description}
      amount={itemData.item.amount}
      date={itemData.item.date}
    />
  );
}
function ExpensesList(props: Props) {
  const { expenses } = props;
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id!}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
