import { createElement } from 'react';
import { type ComponentProps } from 'react';
import { type LucideIcon, ShoppingCart, Utensils, TreePalm, BanknoteArrowUp, BanknoteArrowDown, ShoppingBasket, CircleQuestionMark } from 'lucide-react-native'
import { Category } from '@/types/transaction';

const iconsForCategory: Record<Category, LucideIcon> = {
  [Category.Leisure] : TreePalm,
  [Category.Groceries] : ShoppingBasket,
  [Category.Expenses] : BanknoteArrowDown,
  [Category.Shopping] : ShoppingCart,
  [Category.Food] : Utensils,
  [Category.Salary] : BanknoteArrowUp
}

export function getIconForCategory(category: Category): LucideIcon {
    return iconsForCategory[category] ?? CircleQuestionMark
}

export function renderIconForCategory(category: Category, props: ComponentProps<LucideIcon>) {
    return createElement(getIconForCategory(category), props)
}
