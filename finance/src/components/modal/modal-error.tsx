import { useTheme } from "@/providers/theme-provider"
import { useMemo, ReactNode } from "react"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react-native"

type ModalVariant = "error" | "success" | "warning" | "info"

type ModalErrorProps = {
    visible: boolean,
    title: string,
    message?: string,
    variant?: ModalVariant,
    buttonLabel?: string,
    children?: ReactNode,
    onClose: () => void,
}

export function ModalError({
    visible,
    title,
    message,
    variant = "info",
    buttonLabel = "OK",
    children,
    onClose,
}: ModalErrorProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeStyles(theme), [theme])
    const variantStyle = getVariantStyle(variant, theme)
    const Icon = variantStyle.icon

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.container} onPress={(event) => event.stopPropagation()}>
                    <View style={styles.header}>
                        <View style={[styles.iconContainer, { backgroundColor: variantStyle.background }]}>
                            <Icon color={variantStyle.color} size={26} />
                        </View>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <X color={theme.textSecondary} size={20} />
                        </Pressable>
                    </View>

                    <Text style={styles.title}>{title}</Text>

                    {message ? (
                        <Text style={styles.message}>{message}</Text>
                    ) : null}

                    {children ? (
                        <View style={styles.content}>
                            {children}
                        </View>
                    ) : null}

                    <Pressable
                        onPress={onClose}
                        style={[styles.button, { backgroundColor: variantStyle.color }]}
                    >
                        <Text style={styles.buttonText}>{buttonLabel}</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

function getVariantStyle(variant: ModalVariant, theme: ReturnType<typeof useTheme>) {
    const variants = {
        error: {
            color: theme.red,
            background: theme.redOption,
            icon: CircleAlert,
        },
        success: {
            color: theme.green,
            background: theme.greenSoft,
            icon: CircleCheck,
        },
        warning: {
            color: theme.yellow,
            background: theme.yellowSoft,
            icon: TriangleAlert,
        },
        info: {
            color: theme.primary,
            background: theme.primarySoft,
            icon: Info,
        },
    }

    return variants[variant]
}

function makeStyles(theme: ReturnType<typeof useTheme>) {
    return StyleSheet.create({
        overlay: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            backgroundColor: theme.shadow,
        },
        container: {
            width: "100%",
            maxWidth: 380,
            padding: 24,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.surface,
            boxShadow: theme.shadow,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
        },
        iconContainer: {
            width: 48,
            height: 48,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
        },
        closeButton: {
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.surfaceSoft,
        },
        title: {
            color: theme.text,
            fontSize: 22,
            fontWeight: "700",
        },
        message: {
            marginTop: 10,
            color: theme.textSecondary,
            fontSize: 16,
            lineHeight: 24,
        },
        content: {
            marginTop: 16,
        },
        button: {
            minHeight: 48,
            marginTop: 24,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 18,
            paddingVertical: 12,
        },
        buttonText: {
            color: "#FFF",
            fontSize: 16,
            fontWeight: "700",
        },
    })
}
