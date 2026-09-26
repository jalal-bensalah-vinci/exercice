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
    await db.orm.public.Expense.create(newExpense);
    return await this.getExpenses();
  }

  public static resetExpenses(): Expense[] {
    try {
      const defaultExpenses: Expense[] = JSON.parse(fs.readFileSync(this.resetPath, "utf-8"));
      fs.writeFileSync(this.dataPath, JSON.stringify(defaultExpenses, null, 2));
      return defaultExpenses;
    } catch (error) {
      console.error("Error resetting expenses file:", error);
      throw error;
    }
  }
}