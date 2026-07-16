import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native"
import { useTheme } from "@/providers/theme-provider";
import { useMemo } from "react";
import { makeSharedStyles } from "@/styles/shared-styles";

type ButtonProps = {
    label : string,
    onPress : () => void,
    style? : StyleProp<ViewStyle>,
    contentStyle? : StyleProp<TextStyle>
}

export function Button(props : ButtonProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeSharedStyles(theme),[theme])
    return(
        <Pressable onPress={props.onPress} style={[styles.button, props.style]}>
            <Text style={[styles.buttonText, props.contentStyle]}>
                {props.label}
            </Text>
        </Pressable>
    )
}
