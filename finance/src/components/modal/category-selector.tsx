import { CATEGORIES, Category } from "@/types/transaction"
import { View, Text } from "react-native"
import { CategoryCard } from "./category-card"
import { useTheme } from "@/providers/theme-provider"
import { useMemo } from "react"
import { makeSharedStyles } from "@/styles/shared-styles"

type CategorySelectorProps = {
    label: string,
    value: Category,
    onChange: (category: Category) => void,
}

export function CategorySelector(props : CategorySelectorProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeSharedStyles(theme), [theme])
    return (
        <View>
            <Text style = {[styles.label,]}>
                {props.label}
            </Text>
            <View style={styles.categoryList}>
                {CATEGORIES.map((category) => (
                    <CategoryCard
                        key={category}
                        category={category}
                        selected={category === props.value}
                        onPress={() => props.onChange(category)}
                    />
                ))}
            </View>
        </View>
    )
}
