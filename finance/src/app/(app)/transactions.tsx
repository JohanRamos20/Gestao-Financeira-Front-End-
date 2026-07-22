import { View, Text } from "react-native"
import { SummaryCard } from "@/components/dashboard/summary-card"

export default function TransactionsScreen() {
  
  return(
    <View style={{padding:100}}>
      <View>
        <Text>
          Movimentações
        </Text>
        <Text>
          Transações
        </Text>
      </View>
      <View style={{flexDirection:'row', gap: 40}}>
        <SummaryCard label={'Receitas'} value={1}/>
        <SummaryCard label={'Gastos'} value={1}/>
        <SummaryCard label={'Saldo no período'} value={1}/>
      </View>
    </View>
)
}
