import { LucideIcon } from 'lucide-react-native';
import { ShoppingCart, Utensils, TreePalm, BanknoteArrowUp, BanknoteArrowDown, ShoppingBasket, CircleQuestionMark } from 'lucide-react-native'

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