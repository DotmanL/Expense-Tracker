import { IExpense } from "interfaces/IExpenses";
import { createContext, useReducer } from "react";
import { DUMMY_EXPENSES } from "data/expensesData";
import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";

type Props = {
  children: React.ReactNode;
};

type ExpensesContextType = {
  expenses: IExpense[];
  addExpense: (expense: IExpense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: IExpense) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {}
});

enum ExpensesActionEnum {
  ADD = 1,
  UPDATE = 2,
  DELETE = 3
}

type ExpensesAction =
  | {
      type: ExpensesActionEnum.ADD;
      payload: { expense: IExpense };
    }
  | {
      type: ExpensesActionEnum.UPDATE;
      payload: { id: string; expense: IExpense };
    }
  | { type: ExpensesActionEnum.DELETE; payload: { id: string } };

function expensesReducer(
  state: IExpense[],
  action: ExpensesAction
): IExpense[] {
  switch (action.type) {
    case ExpensesActionEnum.ADD:
      const id = uuidv4();
      return [{ ...action.payload.expense, id: id }, ...state];
    case ExpensesActionEnum.UPDATE:
      // const expenseToUpdateIndex = state.findIndex(
      //   (expense) => expense.id === action.payload.id
      // );
      // const expenseToUpdate = state[expenseToUpdateIndex];
      // const updatedItem = { ...expenseToUpdate, ...action.payload.expense };
      // const updatedExpenses = [...state];
      // updatedExpenses[expenseToUpdateIndex] = updatedItem;
      // return updatedExpenses;
      return produce(state, (draftState) => {
        const expenseToUpdateIndex = draftState.findIndex(
          (expense) => expense.id === action.payload.id
        );
        if (expenseToUpdateIndex !== -1) {
          const expenseToUpdate = draftState[expenseToUpdateIndex];
          draftState[expenseToUpdateIndex] = {
            ...expenseToUpdate,
            ...action.payload.expense
          };
        }
      });
    case ExpensesActionEnum.DELETE:
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

function ExpensesProvider(props: Props) {
  const { children } = props;
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expense: IExpense) {
    dispatch({ type: ExpensesActionEnum.ADD, payload: { expense } });
  }

  function updateExpense(id: string, expense: IExpense) {
    dispatch({
      type: ExpensesActionEnum.UPDATE,
      payload: { id: id, expense: expense }
    });
  }

  function deleteExpense(id: string) {
    dispatch({ type: ExpensesActionEnum.DELETE, payload: { id } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesProvider;
