import { useLayoutEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import { StyleSheet, View } from "react-native";
import IconButton from "components/shared/IconButton";
import { GlobalStyles } from "constants/styles";
import { useContext } from "react";
import { ExpensesContext } from "store/context/expensesContext";
import ExpenseForm from "components/ManageExpense/ExpenseForm";
import { IExpense } from "interfaces/IExpenses";
import { storeExpense, updateExpense, deleteExpense } from "util/httpClient";
import LoadingOverlay from "components/shared/LoadingOverlay";
import ErrorOverlay from "components/shared/ErrorOverlay";

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function handleDeleteExpense() {
    setIsSubmitting(true);

    try {
      await deleteExpense(editedExpenseId);
      expensesContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - Please try again later");
      setIsSubmitting(false);
    }
  }

  async function confirmHandler(expenseData: IExpense) {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        expensesContext.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData); //instead of triggering a refetch, we just update our context state with the data added
        expensesContext.addExpense({ ...expenseData, id: id }); // and use the Id we return from the post to juts update the local state with the id from firebase
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - Please try again later");
      setIsSubmitting(false);
    }
  }
  function errorHandler() {
    setError("");
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        currentExpense={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconName="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={handleDeleteExpense}
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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
});
