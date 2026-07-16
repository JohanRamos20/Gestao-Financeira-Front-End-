import { useTheme } from "@/providers/theme-provider"
import { useMemo, useState } from "react"
import { View, Text, Modal, Pressable, ScrollView } from 'react-native'
import { makeLayoutStyles } from "@/styles/layout-styles"
import { TextInput } from "./text-input"
import { X } from 'lucide-react-native'
import { TransactionType, TypeSelector } from "./type-selector"
import { Category } from "@/types/transaction"
import { CategorySelector } from "./category-selector"
import { Button } from "../button"
import { ModalError } from "./modal-error"
import { SanitizeNumericInput } from "@/handler/sanitize-numeric-input"

export type NewTransactionData = {
    name: string,
    value: number,
    category: Category,
    type: TransactionType,
}

type NewTransactionProps = {
    visible: boolean,
    onClose: () => void,
    onSubmit: (transaction: NewTransactionData) => void,
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

    function handleSubmit() {
        const numericValue = Number(value.replace(',', '.'))

        if(name.length < 3){
            setErrorMessage('O nome deve possuir pelo menos 3 caracteres.')
            return
        }

        onSubmit({
            name: name.trim(),
            value: numericValue,
            category,
            type,
        })

        resetForm()
        onClose()
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
                        <ScrollView contentContainerStyle={{ gap: 20, flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={styles.title}>
                                    New Transaction
                                </Text>
                                <Pressable onPress={handleCancel} style={{ width: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30, backgroundColor: theme.surfaceSoft }}>
                                    <X color={theme.textSecondary} />
                                </Pressable>
                            </View>
                            <TextInput font={{color:theme.textSecondary}} label="Nome" placeholder="Ex.: Steam" value={name} onChangeText={setName}></TextInput>
                            <TextInput font={{color:theme.textSecondary}} label="Valor" prefix='R$' placeholder="0,00" value={value} onChangeText={(text) => setValue(SanitizeNumericInput(text))} keyboardType="decimal-pad"></TextInput>
                            <TypeSelector label="Tipo" value={type} onChange={setType}></TypeSelector>
                            <CategorySelector label='Categoria' value={category} onChange={setCategory} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' }}>
                                <Button label="Cancelar" onPress={handleCancel} style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.border }} contentStyle={{ color: theme.textSecondary }} />
                                <Button label="Salvar Transacao" onPress={handleSubmit} style={{ backgroundColor: theme.primary }} contentStyle={{ color: "#FFF" }} />
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
