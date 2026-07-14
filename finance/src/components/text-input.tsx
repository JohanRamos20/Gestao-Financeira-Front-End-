import { useTheme } from "@/providers/theme-provider"
import { makeSharedStyles } from "@/styles/shared-styles"
import { useMemo, useState } from "react"
import { TextInput as GiftedTextInput } from "react-native-gesture-handler"
import { View, Text } from "react-native"

export type TextInputProps = {
    label : string,
    placeholder : string,
    prefix? : string,
}

export function TextInput(props : TextInputProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeSharedStyles(theme), [theme])
    const [value, setValue] = useState('')
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
                    value={value}
                    onChangeText={setValue}
                ></GiftedTextInput>
            </View>
        </View>
    )

}

//AJEITAR A BORDA QUANDO O TEXT INPUT ESTÁ SELECIONADO