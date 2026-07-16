import { useTheme } from "@/providers/theme-provider"
import { makeSharedStyles } from "@/styles/shared-styles"
import { useMemo, useState } from "react"
import { TextInput as GiftedTextInput } from "react-native-gesture-handler"
import { KeyboardTypeOptions, View, Text, ViewStyle, StyleProp, TextStyle, Pressable } from "react-native"
import { Eye, EyeOff } from 'lucide-react-native';


export type TextInputProps = {
    label : string,
    placeholder : string,
    prefix? : string,
    value : string,
    onChangeText : (value: string) => void,
    style? : StyleProp<ViewStyle>,
    font? : StyleProp<TextStyle>,
    secureTextEntry? : boolean,
    keyboardType? : KeyboardTypeOptions,
}

export function TextInput(props : TextInputProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeSharedStyles(theme), [theme])
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const isPasswordInput = Boolean(props.secureTextEntry)

    return (
        <View>
            <Text style = {[styles.label, props.font]}>
                {props.label}
            </Text>
            <View style = {[styles.inputWrapper, props.style]}>
                {props.prefix ? (
                    <Text style = {styles.prefix}>
                        {props.prefix}
                    </Text>
                ) : null}
                <GiftedTextInput
                    style = {[styles.input, { outlineStyle: 'none', outlineColor: 'transparent' } as any, props.font]}
                    placeholder={props.placeholder}
                    placeholderTextColor={theme.textSecondary}
                    value={props.value}
                    secureTextEntry={isPasswordInput && !isPasswordVisible}
                    onChangeText={props.onChangeText}
                    keyboardType={props.keyboardType}
                ></GiftedTextInput>
                {isPasswordInput ? (
                    <Pressable
                        onPress={() => setIsPasswordVisible((visible) => !visible)}
                        hitSlop={8}
                    >
                        {isPasswordVisible ? (
                            <Eye size={20} color={theme.primary} strokeWidth={1.8} />
                        ) : (
                            <EyeOff size={20} color={theme.primary} strokeWidth={1.8} />
                        )}
                    </Pressable>
                ) : null}
            </View>
        </View>
    )

}
