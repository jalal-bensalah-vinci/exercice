import fs from "fs";
import type { Expense, NewExpense } from "../types/expense.ts";
import { db } from "../src/prisma/db.ts";

export class ExpensesService {

  private static dataPath = "./data/expenses.json";
  private static resetPath = "./data/expenses.init.json";
  
  public static async getExpenses(): Promise<Expense[]> {
    const expenses: Expense[] = [];

    for await (const expense of db.orm.public.Expense.all()) {
      expenses.push(expense);
    }

    return expenses;
  }
  
  public static async addExpense(newExpense: NewExpense): Promise<Expense[]> {
    const expenses = await this.getExpenses();
    const expense: Expense = {
      ...newExpense,
      id: expenses.length + 1
    };
    db.orm.public.Expense.create(expense);
    return await this.getExpenses();
  }
  
  public static resetExpenses(): Expense[] {
    this._resetExpenses();
    return this.readExpenses();
  }
  
  private static readExpenses(): Expense[] {
    try {
      const data = JSON.parse(fs.readFileSync(this.dataPath, "utf-8"));
      return data;
    } catch (error) {
      console.error("Error reading expenses file:", error);
      throw error;
    }
  }
  
  private static saveExpenses(expenses: Expense[]): void {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(expenses, null, 2));
    } catch (error) {
      console.error("Error saving expenses file:", error);
      throw error;
    }
  }

  private static _resetExpenses(): void {
    try {
      const defaultExpenses: Expense[] = JSON.parse(fs.readFileSync(this.resetPath, "utf-8"));
      fs.writeFileSync(this.dataPath, JSON.stringify(defaultExpenses, null, 2));
    } catch (error) {
      console.error("Error resetting expenses file:", error);
      throw error;
    }
  }
  
}