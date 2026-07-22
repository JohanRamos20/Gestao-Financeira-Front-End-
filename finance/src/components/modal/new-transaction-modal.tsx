import { useTheme } from "@/providers/theme-provider"
import { useMemo, useState } from "react"
import { View, Text, Modal, Pressable, ScrollView } from 'react-native'
import { makeLayoutStyles } from "@/styles/layout-styles"
import { TextInput } from "./text-input"
import { X } from 'lucide-react-native'
import { TypeSelector } from "./type-selector"
import { Category, type TransactionType } from "@/types/transaction"
import { CategorySelector } from "./category-selector"
import { Button } from "../button"
import { ModalError } from "./modal-error"
import { SanitizeNumericInput } from "@/handler/sanitize-numeric-input"
import { getErrorMessage } from "@/utils/get-error-message"
import {
    newTransactionSchema,
    type NewTransactionData,
} from "@/features/transactions/validators/new-transaction-validator"

type NewTransactionProps = {
    visible: boolean,
    onClose: () => void,
    onSubmit: (transaction: NewTransactionData) => Promise<void> | void,
}

export function NewTransactionModal({ visible, onClose, onSubmit }: NewTransactionProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeLayoutStyles(theme), [theme])
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [type, setType] = useState<TransactionType>('debit')
    const [category, setCategory] = useState<Category>(Category.Expenses)
    const [errorMessage, setErrorMessage] = useState('')

    function resetForm() {
        setName('')
        setValue('')
        setType('debit')
        setCategory(Category.Expenses)
    }

    async function handleSubmit() {
        const numericValue = Number(value.replace(',', '.'))
        const transaction = newTransactionSchema.safeParse({
            name,
            value: numericValue,
            category,
            type,
        })

        if (!transaction.success) {
            setErrorMessage(transaction.error.issues[0]?.message ?? 'Dados invalidos.')
            return
        }

        try {
            await onSubmit(transaction.data)
            resetForm()
            onClose()
        } catch (error) {
            setErrorMessage(getErrorMessage(error))
        }
    }

    function handleCancel() {
        resetForm()
        onClose()
    }

    return (
        <>
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={handleCancel}
            >
                <Pressable style={[styles.overlay, { cursor: 'auto' } as any]} onPress={handleCancel}>
                    <Pressable onPress={(e) => e.stopPropagation()} style={[styles.modalContainer, { cursor: 'auto' }]}>
                        <ScrollView contentContainerStyle={styles.modalScrollContent} showsVerticalScrollIndicator={false}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.title}>
                                    New Transaction
                                </Text>
                                <Pressable onPress={handleCancel} style={styles.modalCloseButton}>
                                    <X color={theme.textSecondary} />
                                </Pressable>
                            </View>
                            <TextInput font={{color:theme.textSecondary}} label="Nome" placeholder="Ex.: Steam" value={name} onChangeText={setName}></TextInput>
                            <TextInput font={{color:theme.textSecondary}} label="Valor" prefix='R$' placeholder="0,00" value={value} onChangeText={(text) => setValue(SanitizeNumericInput(text))} keyboardType="decimal-pad"></TextInput>
                            <TypeSelector label="Tipo" value={type} onChange={setType}></TypeSelector>
                            <CategorySelector label='Categoria' value={category} onChange={setCategory} />
                            <View style={styles.modalActions}>
                                <Button label="Cancelar" onPress={handleCancel} style={styles.secondaryButton} contentStyle={styles.secondaryButtonText} />
                                <Button label="Salvar Transacao" onPress={handleSubmit} style={styles.primaryButton} contentStyle={styles.primaryButtonText} />
                            </View>
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>

            <ModalError
                visible={!!errorMessage}
                title="Dados invalidos"
                message={errorMessage}
                variant="error"
                buttonLabel="Entendi"
                onClose={() => setErrorMessage('')}
            />
        </>
    )
}
