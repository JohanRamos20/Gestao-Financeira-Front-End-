import { Category } from "@/types/transaction"

type CategoryTheme = {
    leisure: string,
    groceries: string,
    expenses: string,
    shopping: string,
    food: string,
    salary: string,
}

export function getColorsForCategory(category : Category, theme: CategoryTheme) : string {
    const colorsForCategory : Record<Category, string> = {
        [Category.Leisure] : theme.leisure,
        [Category.Groceries] : theme.groceries,
        [Category.Expenses] : theme.expenses,
        [Category.Shopping] : theme.shopping,
        [Category.Food] : theme.food,
        [Category.Salary] : theme.salary
    }

    return colorsForCategory[category] ?? '#FFF'
}

