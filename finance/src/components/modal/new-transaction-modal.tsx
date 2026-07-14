import { useTheme } from "@/providers/theme-provider"
import { useMemo, useState } from "react"
import { View, Text, Modal, Pressable, ScrollView } from 'react-native'
import { makeLayoutStyles } from "@/styles/layout-styles"
import { TextInput } from "../text-input"
import { X } from 'lucide-react-native' 
import { TransactionType, TypeSelector } from "../type-selector"
import { Category } from "@/types/transaction"
import { CategorySelector } from "./category-selector"
import { Button } from "../button"

type NewTransactionProps = {
    visible : boolean,
    onClose : () => void
}

export function NewTransactionModal({visible, onClose} : NewTransactionProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeLayoutStyles(theme), [theme])
    const [type, setType] = useState<TransactionType>('debit')
    const [category, setCategory] = useState<Category>(Category.Expenses,)
    return (
        <Modal 
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style = {[styles.overlay, {cursor:'auto'} as any]} onPress={onClose}>
                <Pressable onPress={(e) => e.stopPropagation()} style={[styles.modalContainer, {cursor:'auto'}]}>
                    <ScrollView contentContainerStyle={{ gap: 20, flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <View style = {{justifyContent : 'space-between', flexDirection: 'row'}}>
                        <Text style = {styles.title}>
                            New Transaction
                        </Text>
                        <Pressable onPress={onClose} style={{width: 30,alignItems: 'center', justifyContent:'center',borderRadius:30 ,backgroundColor:theme.surfaceSoft}}>
                            <X color={theme.textSecondary}/>
                        </Pressable>
                    </View>
                    <TextInput label="Nome" placeholder="Ex.: Steam"></TextInput>
                    <TextInput label="Valor" prefix='R$'placeholder="0,00"></TextInput>
                    <TypeSelector label="Tipo"value={type} onChange={setType}></TypeSelector>
                    <CategorySelector label='Categoria' value={category} onChange={setCategory}/>
                    <View style = {{flexDirection:'row', justifyContent:'space-between', marginTop: 'auto'}}>
                        <Button label="Cancelar" onPress={() => {}} style={{ backgroundColor: 'transparent', borderWidth:1, borderColor:theme.border }} contentStyle={{ color: theme.textSecondary }}/>
                        <Button label="Salvar Transação" onPress={() => {}} style={{ backgroundColor: theme.primary }} contentStyle={{ color: "#FFF" }}/>
                    </View>
                    </ScrollView>
                </Pressable>
            </Pressable>
        </Modal>
    )
}
