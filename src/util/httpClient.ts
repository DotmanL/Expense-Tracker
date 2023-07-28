import { IExpense } from "interfaces/IExpenses";
import axios from "axios";

const firebaseUrl = "https://expense-tracker-4d9ff-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData: IExpense) {
  const response = await axios.post(
    `${firebaseUrl}/expenses.json`,
    expenseData
  );
  const id = response.data.name; // this is how firebase stores Id
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${firebaseUrl}/expenses.json`);
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export async function updateExpense(id: string, expenseData: IExpense) {
  return await axios.put(`${firebaseUrl}/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id: string) {
  return await axios.delete(`${firebaseUrl}/expenses/${id}.json`);
}
