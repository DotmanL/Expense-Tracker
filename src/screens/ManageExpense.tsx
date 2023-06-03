import { useLayoutEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import { StyleSheet, View } from "react-native";
import IconButton from "components/shared/IconButton";
import { GlobalStyles } from "constants/styles";
import { useContext } from "react";
import Button from "components/shared/Button";
import { ExpensesContext } from "store/context/expensesContext";

type Props = {
  navigation: NativeStackNavigationProp<
    AppNavigationParameterList,
    "ManageExpense"
  >;
  route: RouteProp<AppNavigationParameterList, "ManageExpense">;
};

function ManageExpense(props: Props) {
  const { navigation, route } = props;
  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  function deleteExpense() {
    expensesContext.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesContext.updateExpense(editedExpenseId, {
        description: "Test!!!!",
        amount: 29.99,
        date: new Date("2023-06-01")
      });
    } else {
      expensesContext.addExpense({
        description: "Add New Test",
        amount: 19.99,
        date: new Date("2023-06-03")
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconName="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
});
