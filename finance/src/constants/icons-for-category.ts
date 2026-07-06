import { createElement } from 'react';
import { type ComponentProps } from 'react';
import { type LucideIcon, ShoppingCart, Utensils, TreePalm, BanknoteArrowUp, BanknoteArrowDown, ShoppingBasket, CircleQuestionMark } from 'lucide-react-native'

const iconsForCategory: Record <string, LucideIcon> = {
  'Leisure' : TreePalm,
  'Groceries' : ShoppingBasket,
  'Expenses' : BanknoteArrowDown,
  'Shopping' : ShoppingCart,
  'Food' : Utensils,
  'Salary' : BanknoteArrowUp
}

export function getIconForCategory(category: string): LucideIcon {
    return iconsForCategory[category] ?? CircleQuestionMark
}

export function renderIconForCategory(category: string, props: ComponentProps<LucideIcon>) {
    return createElement(getIconForCategory(category), props)
}
