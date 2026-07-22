import { useTheme } from "@/providers/theme-provider"
import { makeSharedStyles } from "@/styles/shared-styles"
import { useEffect, useMemo, useState } from "react"
import { Animated, Pressable, Text, View } from "react-native"
import type { TransactionType } from "@/types/transaction"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type TypeSelectorProps = {
    value : TransactionType
    onChange : (value : TransactionType) => void
    label : string
}

export function TypeSelector(props : TypeSelectorProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeSharedStyles(theme), [theme])
    const [animatedValue] = useState(() => new Animated.Value(props.value === 'credit' ? 1 : 0))

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: props.value === 'credit' ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start()
    }, [props.value, animatedValue])

    const debitBackground = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.redOption, theme.background],
    })

    const creditBackground = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.background, theme.greenOption],
    })

    return(
        <View>
            <Text style = {styles.label}>
                {props.label}
            </Text>
            <View style = {styles.container}>
                <AnimatedPressable 
                    style = {[styles.option, { backgroundColor: debitBackground }]}
                    onPress={() => props.onChange('debit')}
                >
                    <Text style = {props.value === 'debit' ? styles.optionDebit : styles.optionText}>
                        Debit
                    </Text>
                </AnimatedPressable>
                <AnimatedPressable
                    style = {[styles.option, { backgroundColor: creditBackground }]}
                    onPress={() => props.onChange('credit')}
                >
                    <Text style = {props.value === 'credit' ? styles.optionCredit : styles.optionText}>
                        Credit
                    </Text>
                </AnimatedPressable>
            </View>
        </View>
    )

}

//AJEITAR AS CORES DO PRESSABLE
