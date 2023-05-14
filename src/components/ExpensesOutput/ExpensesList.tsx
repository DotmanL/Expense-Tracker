import { IExpenses } from "interfaces/IExpenses";
import { FlatList, Text } from "react-native";

type Props = {
  expenses: IExpenses[];
};

type ExpensesItemData = {
  item: IExpenses;
};

function renderExpenseItem(itemData: ExpensesItemData) {
  return <Text>{itemData.item.description}</Text>;
}
function ExpensesList(props: Props) {
  const { expenses } = props;
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
