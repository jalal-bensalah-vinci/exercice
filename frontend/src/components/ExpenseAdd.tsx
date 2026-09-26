import type { NewExpense } from "../types/Expense";

interface ExpenseAddProps {
  addExpense: (expense: NewExpense) => void;
}

function generateRandomExpense(): NewExpense {
  return {
    date: "2026-09-18",
    description: "New random Expense",
    payer: "New random Payer",
    amount: Math.random() * 100
  };
}

function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  return <div>
    <h2>Add a new random Expense</h2>
    <button onClick={() => addExpense(generateRandomExpense())}>Add</button>
  </div>;
}

export default ExpenseAdd;
