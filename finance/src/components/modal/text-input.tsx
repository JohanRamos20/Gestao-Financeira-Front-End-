import { useTheme } from "@/providers/theme-provider"
import { makeSharedStyles } from "@/styles/shared-styles"
import { useMemo } from "react"
import { TextInput as GiftedTextInput } from "react-native-gesture-handler"
import { KeyboardTypeOptions, View, Text } from "react-native"

export type TextInputProps = {
    label : string,
    placeholder : string,
    prefix? : string,
    value : string,
    onChangeText : (value: string) => void,
    keyboardType? : KeyboardTypeOptions,
}

export function TextInput(props : TextInputProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeSharedStyles(theme), [theme])
    return (
        <View>
            <Text style = {styles.label}>
                {props.label}
            </Text>
            <View style = {styles.inputWrapper}>
                {props.prefix ? (
                    <Text style = {styles.prefix}>
                        {props.prefix}
                    </Text>
                ) : null}
                <GiftedTextInput
                    style = {[styles.input, { outlineStyle: 'none', outlineColor: 'transparent' } as any]}
                    placeholder={props.placeholder}
                    placeholderTextColor={theme.textSecondary}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    keyboardType={props.keyboardType}
                ></GiftedTextInput>
            </View>
        </View>
    )

}

