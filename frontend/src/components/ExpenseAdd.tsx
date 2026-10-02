import { useState, type SyntheticEvent } from "react";
import type { NewExpense } from "../types/Expense";

interface ExpenseAddProps {
  addExpense: (expense: NewExpense) => void;
}


function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const [payer, setPayer] = useState<string>("Bob");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);


  const handleSubmit = (e : SyntheticEvent) => {
    e.preventDefault()
    addExpense({date, description, payer, amount})
    setDate("");
    setPayer("");
    setDescription("");
    setAmount(0);
  }

  return <div>
    <h2>Add a new random Expense</h2>
    <form onSubmit={handleSubmit}>
            <div>
                <label>Payer : </label>
                <select value={payer} onChange={(e) => setPayer(e.target.value)}>
                  <option value="Bob">Bob</option>
                  <option value="Alice">Alice</option>
                </select>
            </div>
            <div>
                <label>Date : </label>
                <input
                    type="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description : </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Amount : </label>
                <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    required
                />
            </div>
            <button type="submit">Add</button>
        </form>
  </div>;
}

export default ExpenseAdd;
