import { getColorsForCategory } from "@/constants/colors-for-category"
import { useTheme } from "@/providers/theme-provider"
import { makeSharedStyles } from "@/styles/shared-styles"
import { Category } from "@/types/transaction"
import { useMemo } from "react"
import { View, Text, Pressable } from "react-native"

type CategoryCardProps = {
    category : Category,
    onPress?: () => void,
    selected?: boolean,
}

export function CategoryCard(props : CategoryCardProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeSharedStyles(theme), [theme])

    const colorCategory = getColorsForCategory(props.category, theme)

    return(
        <Pressable
            onPress={props.onPress}
            style = {[styles.categoryContainer, props.selected && { borderColor: theme.primary, backgroundColor: theme.primarySoft }]}
        >
            <View style = {[styles.categoryColor, {backgroundColor : colorCategory}]}>
            </View>
            <Text style = {[styles.categoryText, props.selected && {color: theme.primary}]}>
                {props.category}
            </Text>
        </Pressable>
    )

}
